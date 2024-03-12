import { setUserSlice, getUserDetailsSlice, setToken } from '../adminSlices/authSlice'
import { fogetPassEmailSent, fogetPassEnterNewPass } from '../api/index'
import { FROGET_PASSWORD_SENT_MAIL, FROGET_PASSWORD_SET_NEW_PASSWORD } from '../type'
import { put, takeEvery, call, delay } from 'redux-saga/effects'
import { getLodderStatus } from '../adminSlices/lodderSlice';
import { toast } from "react-toastify";



export function* fg_emali_sent_Fun(action) {
  try {
    yield put(getLodderStatus(true));
    const redirect = action.initialData.navigate;
    console.log(" " + action.initialData.email);
    var fd = new FormData();
    fd.append("email", action.initialData.email);
    const fgEmailSent = yield fogetPassEmailSent(fd);

    console.log(fgEmailSent.data.result);
    yield delay(2000)
    if (fgEmailSent.data.result.code == 200) {
      console.log(fgEmailSent.data.result.v_code)
      console.log(fgEmailSent.data.result.message)
      toast.success(fgEmailSent.data.result.message + " and otp is" + fgEmailSent.data.result.v_code);
      yield put(getLodderStatus(false));
      yield put(setUserSlice({
        email: "",
        password: "",
        confirmPassword: "",
        otp: '',
        token: "",
      }));
      redirect("/newpass");
    } else {
      toast.error(fgEmailSent.data.result.message);
      console.log(fgEmailSent.data.result.message);
      yield put(getLodderStatus(false));
    }
  }
  catch (error) {
    console.log("Saga-error:", error);
    toast.error(error);
    console.log(error.response.data.message);
  }

}



export function* fg_emali_sen_new_pass(action) {
  try {
    yield put(getLodderStatus(true));
    const redirect = action.initialData.navigate;
    console.log(" " + action.initialData.otp + " " + action.initialData.password + " " + action.initialData.confirmPassword);
    var fd = new FormData();
    fd.append("code", action.initialData.otp);
    fd.append("new_password", action.initialData.password);
    const fgSetPass = yield fogetPassEnterNewPass(fd);

    console.log(fgSetPass);
    yield delay(2000)
    if (fgSetPass.data.result.code == 200) {
      console.log(fgSetPass.data.result.message)
      yield put(getLodderStatus(false));
      yield put(setUserSlice({
        email: "",
        password: "",
        confirmPassword: "",
        otp: '',
        token: "",
      }));
      toast.success(fgSetPass.data.result.message);
      redirect("/login");
    } else {
      console.log(fgSetPass.data.result.message);
      toast.error(fgSetPass.data.result.message);
      yield put(getLodderStatus(false));
    }
  }
  catch (error) {
    console.log("Saga-error:", error);
    toast.error(error);
    console.log(error.response.data.message);
  }

}



export function* ForgetPassActions() {
  yield takeEvery(FROGET_PASSWORD_SENT_MAIL, fg_emali_sent_Fun)
  yield takeEvery(FROGET_PASSWORD_SET_NEW_PASSWORD, fg_emali_sen_new_pass)
}