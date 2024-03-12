import { setUserSlice, getUserDetailsSlice, setToken } from '../adminSlices/authSlice'
import { DeptAddApi, DeptGetApi, DeptDelApi, DeptEditApi, GetSingleDept } from '../api/index'
import { DEPT_SUBMIT, DEPT_GET, DELETE_DEPT_BY_ID, DEPT_EDIT, DEPT_GET_SINGLE, DEPT_GET_CLONE } from '../type'
import { put, takeEvery, call, delay } from 'redux-saga/effects'
import { getLodderStatus } from '../adminSlices/lodderSlice';
import { toast } from "react-toastify";
import { setDeptSlice, getDeptSlice, deleteDeptSlice } from '../adminSlices/deptAddSlice';
import { keyValset } from '../adminSlices/keyValSlice';
import { getModalStatus } from '../adminSlices/modalSlice';



export function* dept_add(action) {
  try {
    yield put(getLodderStatus(true));
    const redirect = action.initialData.navigate;
    //console.log(" " + action.initialData.is_top+ " " + action.initialData.name+ " " + action.initialData.sdesc+ " " + action.initialData.ldesc);
    console.log(action.initialData.dynamicData);
    //return false;

    var fd = new FormData();
    fd.append("name", action.initialData.name);
    fd.append("is_top", action.initialData.is_top);
    fd.append("short_desc", action.initialData.sdesc);
    fd.append("longdesc", action.initialData.ldesc);
    fd.append("limit", action.initialData.limit);
    fd.append("dynamicDatas", JSON.stringify(action.initialData.dynamicData))
    // console.log(Object.fromEntries(fd));
    //return false;
    const deptAdd = yield DeptAddApi(fd);  //api call

    console.log(deptAdd);
    yield delay(1000)
    if (deptAdd.data.result.code == 200) {
      toast.success(deptAdd.data.result.message);
      console.log(deptAdd.data.result.message)
      yield put(getLodderStatus(false));
      yield put(setDeptSlice({
        name: "",
        is_top: "",
        sdesc: "",
        ldesc: "",
        limit: "",
      }))
      //console.log(action.initialData)
      //yield put(getDeptSlice(action.initialData))
      const deptGet = yield DeptGetApi();
      yield put(getDeptSlice(deptGet.data.result.data))
      //yield delay(2000)
      yield put(getModalStatus(false))

      redirect("/management#tab_departments");
    } else {
      toast.error("enter all field");
      console.log(deptAdd.data.result);
      yield put(getLodderStatus(false));
    }
  }
  catch (error) {
    yield put(getLodderStatus(false));
    console.log("Saga-error:", error);
    console.log(error.response.data.message);
  }

}



export function* deptGetFun() {
  try {
    yield put(getLodderStatus(true));
    const deptGet = yield DeptGetApi();  //api call
    //console.log(deptGet);
    if (deptGet.data.result.code == 200) {
      // /toast.success(deptGet.data.result.message);
      yield put(getLodderStatus(false));
      yield put(getDeptSlice(deptGet.data.result.data))

    } else {
      toast.error("SomeThing went wrong");
      console.log(deptGet.data.result);
      yield put(getLodderStatus(false));
    }
  } catch (error) {
    yield put(getLodderStatus(false));
    toast.error("Token gone");
    console.log("Saga-error:", error);
    console.log(error.response.data.message);
  }
}



export function* deptGetCloneFun() {
  try {
    yield put(getLodderStatus(true));
    const deptGet = yield DeptGetApi();  //api call
    //console.log(deptGet);
    if (deptGet.data.result.code == 200) {
      // /toast.success(deptGet.data.result.message);
      yield put(getLodderStatus(false));
      yield put(getDeptSlice(deptGet.data.result.data))

    } else {
      toast.error("SomeThing went wrong");
      console.log(deptGet.data.result);
      yield put(getLodderStatus(false));
    }
  } catch (error) {
    yield put(getLodderStatus(false));
    toast.error("Token gone");
    console.log("Saga-error:", error);
    console.log(error.response.data.message);
  }
}



export function* deptDelFun(action) {
  try {
    // console.log(action.id)
    yield put(getLodderStatus(true));
    var fd = new FormData();
    fd.append("dept_id", action.id);
    const delDept = yield DeptDelApi(fd);  //api call

    // console.log(delDept);
    yield delay(1000)
    if (delDept.data.result.code == 200) {
      toast.success(delDept.data.result.message);
      console.log(delDept.data.result.message)
      yield put(getLodderStatus(false));
      yield put(deleteDeptSlice(action.id));

    }
    else {
      toast.error(delDept.data.result.message);
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



export function* deptEditFun(action) {
  try {
    yield put(getLodderStatus(true));
    const redirect = action.initialData.navigate;
   // console.log(" " + action.initialData.is_top + " " + action.initialData.name + " " + action.initialData.sdesc + " " + action.initialData.ldesc);
    //return false;

    var fd = new FormData();
    fd.append("id", action.initialData.id); //dept_id
    fd.append("name", action.initialData.name);
    fd.append("is_top", action.initialData.is_top);
    fd.append("short_desc", action.initialData.sdesc);
    fd.append("longdesc", action.initialData.ldesc);
    fd.append("limit", action.initialData.limit);
    fd.append("dynamicDatas", JSON.stringify(action.initialData.dynamicData))
    //console.log(Object.fromEntries(fd));
    //return false;
    const deptAdd = yield DeptEditApi(fd);  //api call

   // console.log(deptAdd);
    //yield delay(1000)
    if (deptAdd.data.result.code == 200) {
      toast.success(deptAdd.data.result.message);
     // console.log(deptAdd.data.result.message)

      yield put(setDeptSlice({
        name: "",
        is_top: "",
        sdesc: "",
        ldesc: "",
        limit: "",
      }))
      //console.log(action.initialData)
      //yield put(getDeptSlice(action.initialData))
      const deptGet = yield DeptGetApi();
      yield put(getDeptSlice(deptGet.data.result.data))
      yield put(getLodderStatus(false));
      //yield delay(2000)
      yield put(getModalStatus(false))

      redirect("/management#tab_departments");
    } else {
      toast.error("enter all field");
      console.log(deptAdd.data.result);
      yield put(getLodderStatus(false));
    }
  }
  catch (error) {
    yield put(getLodderStatus(false));
    console.log("Saga-error:", error);
    console.log(error.response.data.message);
  }
}



export function* getSingleDeptFun(action) {
  try {
    // toast.success(action.initialData.id)
    yield put(getLodderStatus(true));
    var fd = new FormData();
    fd.append("id", action.initialData.id);
    const getSingleVal = yield GetSingleDept(fd);  //api call


    if (getSingleVal.data.result.code == 200) {
      // /toast.success(getSingleVal.data.result.message);
      //yield put(keyValset(getSingleVal.data.result.data.dept_attrs))
      // yield put(getLodderStatus(true));
      yield put(setDeptSlice({
        id: getSingleVal.data.result.data.id,
        name: getSingleVal.data.result.data.identifier,
        is_top: getSingleVal.data.result.data.is_top,
        sdesc: getSingleVal.data.result.data.dept_desc.desc,
        ldesc: getSingleVal.data.result.data.dept_desc.longdesc,
        limit: getSingleVal.data.result.data.dept_desc.limits,
        allData: [],
      }))
      const deptGet = yield DeptGetApi();
      yield put(getDeptSlice(deptGet.data.result.data))
      yield put(getLodderStatus(false));
      //console.log(222222222222222222222)


    } else {
      toast.error("SomeThing went wrong");
      console.log(getSingleVal.data.result);
      yield put(getLodderStatus(false));
    }
  }
  catch (error) {
    yield put(getLodderStatus(false));
    console.log("Saga-error:", error);
    console.log(error.response.data.message);
  }
}



export function* DeptActions() {
  yield takeEvery(DEPT_SUBMIT, dept_add)
  yield takeEvery(DEPT_GET, deptGetFun)
  yield takeEvery(DEPT_GET_CLONE, deptGetCloneFun)
  yield takeEvery(DELETE_DEPT_BY_ID, deptDelFun)
  yield takeEvery(DEPT_EDIT, deptEditFun)
  yield takeEvery(DEPT_GET_SINGLE, getSingleDeptFun)
}