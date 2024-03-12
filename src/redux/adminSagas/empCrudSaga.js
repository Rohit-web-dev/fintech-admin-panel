import { deptMapParentsChildsApi, getAllRoles, getDeptLevels } from '../api/index'
import { GET_ALL_EMP_ROLE, DEPT_GET_CLONE, GET_ALL_DEPENDENT_DEPT_LEVEL } from '../type'
import { put, takeEvery, call, delay } from 'redux-saga/effects'
import { toast } from 'react-toastify';
import { setAllDeptForCrud, setempRolSliceForCrud, setLevelSliceForCrud } from '../adminSlices/empCrudSlice';



export function* deptGetFun(action) {
  try {
    const getDept = yield deptMapParentsChildsApi();
    if (getDept.data.result.code == 200) {
      // toast.success(getDept.data.result.message)
      // action.initialData.navigate("/deptmaplist")
      yield put(setAllDeptForCrud(getDept.data.result.data))
    } else {
      console.log(getDept.data.result.message)
    }
  }
  catch (error) {
    console.log("Saga-error:", error);
  }
}


export function* RoleGetFun(action) {
  try {
    const getDept = yield getAllRoles();
    if (getDept.data.result.code == 200) {
      // toast.success(getDept.data.result.message)
      // action.initialData.navigate("/deptmaplist")
      yield put(setempRolSliceForCrud(getDept.data.result.data))
    } else {
      console.log(getDept.data.result.message)
    }
  }
  catch (error) {
    console.log("Saga-error:", error);
  }
}



export function* getLevelfun(action) {
  try {
    //console.log(111)
    var fd = new FormData;
    fd.append('dept_id', action.dept_id);
    const getDeptLevel = yield getDeptLevels(fd);
    if (getDeptLevel.data.result.code == 200) {
      // toast.success(getDeptLevel.data.result.message)
      // action.initialData.navigate("/deptmaplist")
      yield put(setLevelSliceForCrud(getDeptLevel.data.result.data))
    } else {
      console.log(getDeptLevel.data.result.message)
    }
  }
  catch (error) {
    console.log("Saga-error:", error);
  }
}



export function* empCrud() {
  yield takeEvery(DEPT_GET_CLONE, deptGetFun)
  yield takeEvery(GET_ALL_EMP_ROLE, RoleGetFun)
  yield takeEvery(GET_ALL_DEPENDENT_DEPT_LEVEL, getLevelfun)
}