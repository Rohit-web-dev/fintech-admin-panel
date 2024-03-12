
import { getAdmiNWithDept } from '../api/index'
import { ALL_ADMINS_WITH_REPORT } from '../type'
import { put, takeEvery,takeLatest, call, delay } from 'redux-saga/effects'
import { getLodderStatus } from '../adminSlices/lodderSlice';
import { toast } from "react-toastify";
import { setAdminDept,setAdmins } from '../adminSlices/AdminDeptsSlice';



export function* admin_dept_list() {
    try {
        yield put(getLodderStatus(true));
        const getChildData = yield getAdmiNWithDept();  //api call
         console.log(getChildData);
        if (getChildData.data.result.code == 200) {
            //toast.success(getChildData.data.result.message);
           
            yield put(setAdmins(getChildData.data.result.data))
            yield put(setAdminDept(getChildData.data.result.all_dept_with_admins))
            yield put(getLodderStatus(false));

        } else {
            toast.error("SomeThing went wrong");
            yield put(getLodderStatus(false));
        }
    } catch (error) {
        yield put(getLodderStatus(false));
        toast.error("Authentication error");
        console.log("Saga-error:", error);
        console.log(error.response.data.message);
    }
}








export function* AdminAndDeptSagaAction() {
    yield takeEvery(ALL_ADMINS_WITH_REPORT, admin_dept_list)

}