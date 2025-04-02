import { apiLogin } from "../../service/Auth/apiLogin";
import { loginSuccess, logoutSuccess, registerFailed, registerSuccess } from "../reducers/authReducer";
import { apiRegister } from "../../service/Auth/apiRegister";

export const userLogin = (payload) => async (dispatch) => {
  try {
    const res = await apiLogin(payload);
    const token = res.accessToken
    if (res.err === 0) {
      dispatch(loginSuccess(token))
    } else {
      dispatch(logoutSuccess())
    }
  } catch (error) {
    dispatch(logoutSuccess())
  }
};

export const register = (payload) => async (dispatch) => {
  try {
    const res = await apiRegister(payload)
    const token = res.token
    dispatch(registerSuccess(token))
  } catch (error) {
    dispatch(registerFailed(error))
  }
}

export const logOut = (dispatch) => {
  dispatch(logoutSuccess())
}