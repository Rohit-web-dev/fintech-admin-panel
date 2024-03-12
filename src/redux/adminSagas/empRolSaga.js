import { postEmpRolApi, getEmpRolApi, empRolDelApi } from '../api/index'
import { EMP_ROL_SUBMIT, GET_EMP_ROL_DATA, DELETE_EMP_ROL_BY_ID } from '../type'
import { put, takeEvery, call, delay } from 'redux-saga/effects'
import { getLodderStatus } from '../adminSlices/lodderSlice';
import { toast } from 'react-toastify';
import { getAllEmpRolData, deleteEmpRolSlice } from '../adminSlices/empRolSlice';


export function* empRolAdd(action) {
  try {
    // console.log("rohit");
    var fd = new FormData();
    fd.append("name", action.initialData.name);
    fd.append("desc", action.initialData.desc);
    const postData = yield postEmpRolApi(fd);

    if (postData.data.result.code == 200) {
      toast.success(postData.data.result.message)
      action.initialData.navigate("/emprollist")
    } else {
      toast.error(postData.data.result.message)
    }
  }
  catch (error) {
    console.log("Saga-error:", error);
  }
}



export function* getEmpRolData(action) {
  try {
    yield put(getLodderStatus(true));
    // console.log("rohit Kum ar");
    const getData = yield getEmpRolApi();
    // console.log(getData);

    if (getData.data.result.code == 200) {
      //toast.success(getData.data.result.message)
      yield put(getAllEmpRolData(getData.data.result.data))
    } else {
      toast.error(getData.data.result.message)
    }
    yield put(getLodderStatus(false));
  }
  catch (error) {
    console.log("Saga-error:", error);
  }
}



export function* deleteEmpRolByIdData(action) {
  try {
    console.log(action.id)
    yield put(getLodderStatus(true));
    var fd = new FormData();
    fd.append("role_id", action.id);
    const delDept = yield empRolDelApi(fd);

    yield delay(1000)
    if (delDept.data.result.code == 200) {
      toast.success(delDept.data.result.message);
      console.log(delDept.data.result.message)
      yield put(getLodderStatus(false));
      yield put(deleteEmpRolSlice(action.id));

    }
    else {
      toast.error("SomeThing went wrong");
      console.log(delDept.data.result);
      yield put(getLodderStatus(false));
    }

  }
  catch (error) {
    yield put(getLodderStatus(false));
    console.log("Saga-error:", error);
    console.log(error.response.data.message);

  }
}



export function* empRolAction() {
  yield takeEvery(EMP_ROL_SUBMIT, empRolAdd)
  yield takeEvery(GET_EMP_ROL_DATA, getEmpRolData)
  yield takeEvery(DELETE_EMP_ROL_BY_ID, deleteEmpRolByIdData)
}