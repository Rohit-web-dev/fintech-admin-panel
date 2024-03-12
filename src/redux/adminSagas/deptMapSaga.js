import { deptMapParentsChildsApi, postDeptMapParentsChildsApi, getDeptMapDataApi, updateDeptMap, DeptMapDelApi } from '../api/index'
import { GET_DEPT_PARENTS_CHILD, DEPT_MAP_SUBMIT, GET_DEPT_MAP_DATA, DEPT_MAP_UPDATE, DELETE_DEPTMAP_BY_ID } from '../type'
import { put, takeEvery, call, delay } from 'redux-saga/effects'
import { getLodderStatus } from '../adminSlices/lodderSlice';
import { toast } from 'react-toastify';
import { setDeptMapSlice, getDeptData, setDeptData } from '../adminSlices/deptMapSlice';
import { deleteDeptMapSlice } from '../adminSlices/deptMapSlice';


export function* parentsChildFunc(action) {
  try {
    // console.log("jeet working.");
    const getData = yield deptMapParentsChildsApi();
    // console.log(getData);
    if (getData.data.result.code == 200) {
      yield put(setDeptMapSlice(getData.data.result.data))
    } else {
      toast.error("something wrong")
    }
  }
  catch (error) {
    console.log("Saga-error:", error);
    // console.log(error.response.data.message);
  }
}



export function* deptMapAdd(action) {
  try {
    // console.log(action);
    yield put(getLodderStatus(true));
    var fd = new FormData();
    fd.append("parent_id", action.initialData.parentData);
    fd.append("child_id", action.initialData.childData);
    const postData = yield postDeptMapParentsChildsApi(fd);

    // console.log(postData);

    if (postData.data.result.code == 200) {

      yield put(getLodderStatus(false));
      toast.success(postData.data.result.message)
      action.initialData.navigate("/deptmaplist")
    } else {
      toast.error(postData.data.result.message)
    }
  }
  catch (error) {
    console.log("Saga-error:", error);
    // console.log(error.response.data.message);
  }
}



export function* getMapData(action) {
  try {
    // console.log("rohit Kum ar");
    yield put(getLodderStatus(true));
    const getData = yield getDeptMapDataApi();
    // console.log(getData);

    if (getData.data.result.code == 200) {
      yield put(getLodderStatus(false));
      toast.success(getData.data.result.message)
      yield put(getDeptData(getData.data.result.data))
    } else {
      toast.error(getData.data.result.message)
    }
  }
  catch (error) {
    console.log("Saga-error:", error);
  }
}



export function* updateMapData(action) {
  try {
    // console.log(action.initialData.id);
    //return false
    yield put(getLodderStatus(true));
    var fd = new FormData();
    fd.append("id", action.initialData.id);
    fd.append("prev_id", action.initialData.prev_id);
    fd.append("parent_id", action.initialData.parentData);
    fd.append("child_id", action.initialData.childData);
    const postData = yield updateDeptMap(fd);

    // console.log(postData);

    if (postData.data.result.code == 200) {
      yield put(getLodderStatus(false));
      toast.success(postData.data.result.message)
      action.initialData.navigate("/deptmaplist")
    } else {
      //  window.location="/deptmapedit/"+action.initialData.id;
      toast.error(postData.data.result.message)
    }
  }
  catch (error) {
    console.log("Saga-error:", error);
  }
}



export function* deleteDepeMapData(action) {
  try {
    console.log(action.id)
    // return false;
    yield put(getLodderStatus(true));
    var fd = new FormData();
    fd.append("id", action.id);
    const delDeptMap = yield DeptMapDelApi(fd);  //api call

    // console.log(delDeptMap);
    yield delay(1000)
    if (delDeptMap.data.result.code == 200) {
      toast.success(delDeptMap.data.result.message);
      console.log(delDeptMap.data.result.message)
      yield put(getLodderStatus(false));
      yield put(deleteDeptMapSlice(action.id));

    }
    else {
      toast.error(delDeptMap.data.result.message);
      console.log(delDeptMap.data.result);
      yield put(getLodderStatus(false));
    }

  }
  catch (error) {
    yield put(getLodderStatus(false));
    console.log("Saga-error:", error);
    console.log(error.response.data.message);

  }
}



export function* deptMapAction() {
  yield takeEvery(GET_DEPT_PARENTS_CHILD, parentsChildFunc)
  yield takeEvery(DEPT_MAP_SUBMIT, deptMapAdd)
  yield takeEvery(GET_DEPT_MAP_DATA, getMapData)
  yield takeEvery(DEPT_MAP_UPDATE, updateMapData)
  yield takeEvery(DELETE_DEPTMAP_BY_ID, deleteDepeMapData)

}