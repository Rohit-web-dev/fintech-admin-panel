import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './redux/adminSagas';
import authSlice from './redux/adminSlices/authSlice';
import lodderSlice from './redux/adminSlices/lodderSlice';
import deptAddSlice from './redux/adminSlices/deptAddSlice';
import keyValSlice from './redux/adminSlices/keyValSlice';
import deptMapSlice from './redux/adminSlices/deptMapSlice';
import empRolSlice from './redux/adminSlices/empRolSlice';
import empCrudSlice from './redux/adminSlices/empCrudSlice';
import cardSlice from './redux/adminSlices/cardSlice';
import cardlistSlice from './redux/adminSlices/cardlistSlice';
import DeptLevelFund from './redux/adminSlices/DeptLevelFund';
import deptLevelList from './redux/adminSlices/deptLevelList';
import modalSlice from './redux/adminSlices/modalSlice';
import reportSlice from './redux/adminSlices/reportSlice';
import masterReportSlice from './redux/adminSlices/masterReportSlice';
import reportModelSlice from './redux/adminSlices/reportModelSlice';
import AdminDeptsSlice from './redux/adminSlices/AdminDeptsSlice';
import AdminUpdateSlice from './redux/adminSlices/AdminUpdateSlice';
import expTypeIdSlice from './redux/adminSlices/expTypeIdSlice';
import ReportDynamicDeptIdSlice from './redux/adminSlices/ReportDynamicDeptIdSlice';
import ExpencePolisyListSlice from './redux/adminSlices/ExpencePolisyListSlice';


const sagaMiddleware = createSagaMiddleware()
//all slice files
export default configureStore({
    reducer: {
      authSlice,
      lodderSlice,
      deptAddSlice,
      keyValSlice,
      deptMapSlice,
      empRolSlice,
      empCrudSlice,
      cardSlice,
      cardlistSlice,
      DeptLevelFund,
      deptLevelList,
      modalSlice,
      reportSlice,
      masterReportSlice,
      reportModelSlice,
      AdminDeptsSlice,
      AdminUpdateSlice,
      expTypeIdSlice,
      ReportDynamicDeptIdSlice,
      ExpencePolisyListSlice,
    
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck:false, }).concat(sagaMiddleware)
  })
  sagaMiddleware.run(rootSaga)

