import React, { useEffect, useState } from "react";
import Table from "../TableManagement/Table";
import { useSelector } from "react-redux";
import { checkDateTime } from "../../utils/checkExpireTime";

const table = [
  { value: 'Mã tin' },
  { value: 'Ảnh đại diện' },
  { value: 'Tiêu đề' },
  { value: 'Giá' },
  { value: 'Ngày tạo tin' },
  { value: 'Ngày hết hạn' },
  { value: 'Trạng thái' },
  { value: 'Tuỳ chọn' }
]
const Management = () => {
  const postAdminData = useSelector(state => state.post.postAdmin.response?.data?.rows)
  const [post, setPost] = useState([])
  useEffect(() => {
    setPost(postAdminData)
  }, [postAdminData])
  const handleStatus = (status) => {
    if (status === 1) {
      const activePost = postAdminData?.filter(item => checkDateTime((item?.overviews?.expired?.split(",")[2])))
      setPost(activePost)
    } else if (status === 2) {
      const activeExprirePost = postAdminData?.filter(item => !checkDateTime((item?.overviews?.expired?.split(",")[2])))
      setPost(activeExprirePost)
    } else if (status === 0) {
      setPost(postAdminData)
    }
  }
  return (
    <div className="overflow-x-hidden">
      <div className="flex justify-between md:flex-col md:w-fit md:gap-2">
        <h3>Quản lý bài đăng</h3>
        <select onChange={(e) => handleStatus(+e.target.value)} className="border-2 border-slate-950 cursor-pointer md:p-1">
          <option value="0">lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="2">Đã hết hạn</option>
        </select>
      </div>
      <div className="mt-3 p-[1px] bg-slate-600 border-2 w-full"> </div>
      <Table post={post} table={table} />
    </div >
  )
};

export default Management;
