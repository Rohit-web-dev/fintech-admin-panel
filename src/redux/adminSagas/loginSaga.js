import { setUserSlice, getUserDetailsSlice, setToken } from '../adminSlices/authSlice'
import { LoginApi, CheckUserAPI } from '../api/index'
import { ADMIN_LOGIN, ADMIN_LOGIN_INITIAL_DATA } from '../type'
import { put, takeEvery, call, delay } from 'redux-saga/effects'
import { useNavigate } from 'react-router-dom';
import { getLodderStatus } from '../adminSlices/lodderSlice';
import { toast } from 'react-toastify';


export function* loginFun(action) {
  try {
    yield put(getLodderStatus(true));
    const redirect = action.initialData.navi;
    console.log(" " + action.initialData.email + " " + action.initialData.password);
    var fd = new FormData();
    fd.append("email", action.initialData.email);
    fd.append("password", action.initialData.password);
    // fd.append("type", "A");
    const abc = yield LoginApi(fd);

    console.log(abc.data);
    // return false;
    yield delay(2000)
    if (abc.data.success == true) {
      localStorage.setItem("token", abc.data.token);
      localStorage.setItem("userType", abc.data.user.type);
      localStorage.setItem("name", abc.data.user.name);
      yield put(setToken(abc.data.token));
      console.log(abc.data.token);
      // redirect("/dashboard")
      yield put(getLodderStatus(false));
      window.location.href = "/dashboard";
    } else {
      toast.error("Invalid Login");
      
      yield put(getLodderStatus(false));
    }

    //redirect to dashboard if loging success then redirect to dashbord else stay on login page with tooster and spinner..

  }
  catch (error) {
    console.log("Saga-error:", error);
    console.log(error.response.data.message);
    toast.error(error.response.data.message)
    yield put(getLodderStatus(false));
  }

}



export function* CheckToken(action) {
  try {
    console.log("Token working.");
    const check = yield CheckUserAPI();
    if (check.data.status == "Token is Expired") {
      console.log(11)
      localStorage.clear();
      yield put(setToken({
        email: '',
        password: '',
        token: ''
      }))
      window.location.href = "/";
    }
  }
  catch (error) {
    console.log("Saga-error:", error);
    console.log(error.response.data.message);
  }
}



export function* loginActions() {
  yield takeEvery(ADMIN_LOGIN, loginFun)
  yield takeEvery(ADMIN_LOGIN_INITIAL_DATA, CheckToken)
}