
import { getChildReportData, getMasterReportData,getChildReportDataUser,getMasterReportDataUser } from '../api/index'
import {
    CHILD_REPORT_WITH_TRANSACTION_LIST,
    MASTER_REPORT_LIST,
    CHILD_REPORT_WITH_TRANSACTION_LIST_CLONE,
    MASTER_REPORT_LIST_CLONE,
    CHILD_REPORT_WITH_TRANSACTION_LIST_USER,
    MASTER_REPORT_LIST_USER,
    CHILD_REPORT_WITH_TRANSACTION_LIST_CLONE_USER,
    MASTER_REPORT_LIST_CLONE_USER
} from '../type'
import { put, takeEvery, takeLatest, call, delay } from 'redux-saga/effects'
import { getLodderStatus } from '../adminSlices/lodderSlice';
import { toast } from "react-toastify";
import { setChildReportTransaction } from '../adminSlices/reportSlice';
import { setMasterReportList } from '../adminSlices/masterReportSlice';


//for admin panel

export function* child_list() {
    try {
        yield put(getLodderStatus(true));
        const getChildData = yield getChildReportData();  //api call
        // console.log(getChildData);
        if (getChildData.data.result.code == 200) {
            //toast.success(getChildData.data.result.message);
            yield put(getLodderStatus(false));
            yield put(setChildReportTransaction(getChildData.data.result.data))

        } else {
            toast.error("SomeThing went wrong");
            yield put(getLodderStatus(false));
        }
    } catch (error) {
        yield put(getLodderStatus(false));
        toast.error("Token gone");
        console.log("Saga-error:", error);
        console.log(error.response.data.message);
    }
}







export function* master_list() {
    try {
        yield put(getLodderStatus(true));
        const getMasterData = yield getMasterReportData();  //api call
        console.log(getMasterData);
        if (getMasterData.data.result.code == 200) {
            //toast.success(getMasterData.data.result.message);
            yield put(getLodderStatus(false));
            yield put(setMasterReportList(getMasterData.data.result.data))

        } else {
            toast.error("SomeThing went wrong");
            yield put(getLodderStatus(false));
        }
    } catch (error) {
        yield put(getLodderStatus(false));
        toast.error("Token gone");
        console.log("Saga-error:", error);
        console.log(error.response.data.message);
    }
}













export function* child_list_clone() {
    try {
        // yield put(getLodderStatus(true));
        const getChildData = yield getChildReportData();  //api call
        // console.log(getChildData);
        if (getChildData.data.result.code == 200) {
            //toast.success(getChildData.data.result.message);
            // yield put(getLodderStatus(false));
            yield put(setChildReportTransaction(getChildData.data.result.data))

        } else {
            toast.error("SomeThing went wrong");
            // yield put(getLodderStatus(false));
        }
    } catch (error) {
        // yield put(getLodderStatus(false));
        toast.error("Token gone");
        console.log("Saga-error:", error);
        console.log(error.response.data.message);
    }
}







export function* master_list_clone() {
    try {
        // yield put(getLodderStatus(true));
        const getMasterData = yield getMasterReportData();  //api call
        //  console.log(getMasterData);
        if (getMasterData.data.result.code == 200) {
            //toast.success(getMasterData.data.result.message);
            // yield put(getLodderStatus(false));
            yield put(setMasterReportList(getMasterData.data.result.data))

        } else {
            toast.error("SomeThing went wrong");
            // yield put(getLodderStatus(false));
        }
    } catch (error) {
        // yield put(getLodderStatus(false));
        toast.error("Token gone");
        console.log("Saga-error:", error);
        console.log(error.response.data.message);
    }
}












//for User panel


export function* child_list_user() {
    try {
        yield put(getLodderStatus(true));
        const getChildData = yield getChildReportDataUser();  //api call
        // console.log(getChildData);
        if (getChildData.data.result.code == 200) {
            //toast.success(getChildData.data.result.message);
            yield put(getLodderStatus(false));
            yield put(setChildReportTransaction(getChildData.data.result.data))

        } else {
            toast.error("SomeThing went wrong");
            yield put(getLodderStatus(false));
        }
    } catch (error) {
        yield put(getLodderStatus(false));
        toast.error("Token gone");
        console.log("Saga-error:", error);
        console.log(error.response.data.message);
    }
}







export function* master_list_user() {
    try {
        yield put(getLodderStatus(true));
        const getMasterData = yield getMasterReportDataUser();  //api call
        console.log(getMasterData);
        if (getMasterData.data.result.code == 200) {
            //toast.success(getMasterData.data.result.message);
            yield put(getLodderStatus(false));
            yield put(setMasterReportList(getMasterData.data.result.data))

        } else {
            toast.error("SomeThing went wrong");
            yield put(getLodderStatus(false));
        }
    } catch (error) {
        yield put(getLodderStatus(false));
        toast.error("Token gone");
        console.log("Saga-error:", error);
        console.log(error.response.data.message);
    }
}













export function* child_list_clone_user() {
    try {
        // yield put(getLodderStatus(true));
        const getChildData = yield getChildReportDataUser();  //api call
        // console.log(getChildData);
        if (getChildData.data.result.code == 200) {
            //toast.success(getChildData.data.result.message);
            // yield put(getLodderStatus(false));
            yield put(setChildReportTransaction(getChildData.data.result.data))

        } else {
            toast.error("SomeThing went wrong");
            // yield put(getLodderStatus(false));
        }
    } catch (error) {
        // yield put(getLodderStatus(false));
        toast.error("Token gone");
        console.log("Saga-error:", error);
        console.log(error.response.data.message);
    }
}







export function* master_list_clone_user() {
    try {
        // yield put(getLodderStatus(true));
        const getMasterData = yield getMasterReportDataUser();  //api call
        //  console.log(getMasterData);
        if (getMasterData.data.result.code == 200) {
            //toast.success(getMasterData.data.result.message);
            // yield put(getLodderStatus(false));
            yield put(setMasterReportList(getMasterData.data.result.data))

        } else {
            toast.error("SomeThing went wrong");
            // yield put(getLodderStatus(false));
        }
    } catch (error) {
        // yield put(getLodderStatus(false));
        toast.error("Token gone");
        console.log("Saga-error:", error);
        console.log(error.response.data.message);
    }
}








export function* ReportAction() {
    yield takeEvery(CHILD_REPORT_WITH_TRANSACTION_LIST, child_list)
    yield takeEvery(MASTER_REPORT_LIST, master_list)
    yield takeLatest(CHILD_REPORT_WITH_TRANSACTION_LIST_CLONE, child_list_clone)
    yield takeLatest(MASTER_REPORT_LIST_CLONE, master_list_clone)

    yield takeEvery(CHILD_REPORT_WITH_TRANSACTION_LIST_USER, child_list_user)
    yield takeEvery(MASTER_REPORT_LIST_USER, master_list_user)
    yield takeLatest(CHILD_REPORT_WITH_TRANSACTION_LIST_CLONE_USER, child_list_clone_user)
    yield takeLatest(MASTER_REPORT_LIST_CLONE_USER, master_list_clone_user)

}