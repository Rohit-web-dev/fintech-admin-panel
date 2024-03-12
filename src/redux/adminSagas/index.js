import { all } from "redux-saga/effects";
import { loginActions } from "./loginSaga";
import { ForgetPassActions } from "./forgetPassSaga";
import { DeptActions } from "./deptSaga";
import { deptMapAction } from "./deptMapSaga";
import { empRolAction } from "./empRolSaga";
import { empCrud } from "./empCrudSaga";
import { ReportAction } from "./reportSaga";
import { AdminAndDeptSagaAction } from "./AdminAndDeptSaga";

export function* rootSaga() {
  yield all([
    loginActions(),
    ForgetPassActions(),
    DeptActions(),
    deptMapAction(),
    empRolAction(),
    empCrud(),
    ReportAction(),
    AdminAndDeptSagaAction(),
  ])
}