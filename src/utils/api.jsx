import axios from "axios";
import { URL } from "../API/urlApi";

const appAxios = axios.create({
  baseURL: URL,
  withCredentials: true, // Bật để cookie được gửi và nhận tự động
})
// Thêm một bộ đón chặn request
appAxios.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')))
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    } else {
      delete config.headers['Authorization']
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


let isRefreshing = false; // Trạng thái làm mới token
let refreshSubscribers = []; // Danh sách các API đang chờ token mới sẵn sàng

// Callback khi token đã được làm mới
const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token)); // Cập nhật token mới cho các API đang chờ
  refreshSubscribers = []; // Xoá danh sách các API chờ
}

// Thêm API vào danh sách đang chờ
const addRefreshSubscribers = (callback) => {
  refreshSubscribers.push(callback); // Thêm callback vào danh sách
}

appAxios.interceptors.response.use(
  (response) => response.data, // Trả về dữ liệu nếu không có lỗi
  async (error) => {
    const originalRequest = error.config; // API đầu tiên gây lỗi

    // Xử lý lỗi 401 (unauthorized)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu là đã thử lại request

      // Kiểm tra xem có token không, nếu không thì người dùng đã đăng xuất
      if (!localStorage.getItem('token')) {
        return Promise.reject(error);
      }

      // Nếu đang làm mới token, đợi cho đến khi có token mới
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscribers((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(appAxios(originalRequest)); // Gửi lại yêu cầu sau khi có token mới
          });
        });
      }

      isRefreshing = true; // Bắt đầu quá trình làm mới token

      try {
        // Yêu cầu làm mới token
        const res = await appAxios({
          method: 'post',
          url: '/refreshtoken', // API lấy refresh token
          withCredentials: true,
        });


        const { accessToken } = res;
        if (accessToken) {

          // Lưu token mới vào localStorage
          localStorage.setItem("token", accessToken);
          appAxios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; // Cập nhật header của axios
        }

        isRefreshing = false; // Đặt lại trạng thái làm mới token
        onRefreshed(accessToken); // Cập nhật các API đang chờ

        return appAxios(originalRequest); // Gửi lại yêu cầu ban đầu với token mới

      } catch (refreshError) {
        isRefreshing = false;

        if (refreshError.response?.status === 403) {
          // Xử lý khi refresh token thất bại
          localStorage.removeItem('token');
          document.cookie = "refreshToken=; Max-Age=0; path=/;"; // Xoá refresh token trong cookies
          window.location.href = "/login"; // Đưa người dùng về trang đăng nhập
        }

        return Promise.reject(refreshError); // Trả về lỗi nếu làm mới token thất bại
      }
    }

    return Promise.reject(error); // Trả về lỗi nếu không phải lỗi 401
  }
);

export default appAxios;

