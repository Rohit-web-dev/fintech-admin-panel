import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.teal.light.compact.css';
import ForgotPass from "./components/admin/auth/ForgotPass";
import Login from "./components/admin/auth/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import SideBar from "./components/admin/common/SideBar";
import Header from "./components/admin/common/Header";
import DeptAdd from "./components/admin/pages/department/DeptAdd";
import DeptList from "./components/admin/pages/department/DeptList";
import DeptEdit from "./components/admin/pages/department/DeptEdit";
import DeptView from "./components/admin/pages/department/DeptView";
import Dashboard from "./components/admin/pages/dashboard/Dashboard";

import NewPass from "./components/admin/auth/NewPass";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADMIN_LOGIN_INITIAL_DATA } from "./redux/type";

import EmpTree from "./components/admin/pages/employee/EmpTree";
import CardMngList from "./components/admin/pages/cardManagement/CardMngList";
import CardMngAdd from "./components/admin/pages/cardManagement/CardMngAdd";
import CardMngView from "./components/admin/pages/cardManagement/CardMngView";
import CardMngEdit from "./components/admin/pages/cardManagement/CardMngEdit";
import LevelChild from "./components/admin/pages/department/LevelChild";
import NewEmpCrud from './components/admin/pages/employee/NewEmpCrud';
import OrgTabs from './components/admin/pages/manage/organization';
import Approval from './components/admin/pages/employee/Approval';
import ExpTypeCrud from './components/admin/pages/expType/ExpTypeCrud';
import AllocateBudgets from './components/admin/pages/manage/budgetMaster/AllocateBudgets';
import ExpensePolicy from './components/admin/pages/manage/budgetMaster/ExpensePolicy';
import MasterBudgets from './components/admin/pages/manage/budgetMaster/MasterBudgets';
import PolicyUserList from './components/admin/pages/manage/budgetMaster/PolicyUserList';


function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
  dispatch({ type: ADMIN_LOGIN_INITIAL_DATA });
  })
  // const url = window.location.href;
  // const url_small = url.split("http://localhost:3000")
  

  return (
    <>
      <BrowserRouter>

       <SideBar />
       
       
         
      </BrowserRouter>
    </>
  );
}

export default App;
