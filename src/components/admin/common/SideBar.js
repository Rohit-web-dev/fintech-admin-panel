import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  MenuIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from '../../../redux/adminSlices/authSlice'
import { useEffect } from 'react'
import "../../../index.css"
import $ from "jquery";
import OrgTabs from '../pages/manage/organization'
import Dashboard from '../pages/dashboard/Dashboard'
import AllocateBudgets from '../pages/manage/budgetMaster/AllocateBudgets'
import MasterBudgets from '../pages/manage/budgetMaster/MasterBudgets'
import {
  Route,
  Routes
} from "react-router-dom";
import Login from '../auth/Login'
import ForgotPass from '../auth/ForgotPass'
import NewPass from '../auth/NewPass'
import DeptAdd from '../pages/department/DeptAdd'
import DeptList from '../pages/department/DeptList'
import DeptEdit from '../pages/department/DeptEdit'
import DeptView from '../pages/department/DeptView'
import NewEmpCrud from '../pages/employee/NewEmpCrud'
import Approval from '../pages/employee/Approval'
import CardMngList from '../pages/cardManagement/CardMngList'
import CardMngAdd from '../pages/cardManagement/CardMngAdd'
import CardMngView from '../pages/cardManagement/CardMngView'
import CardMngEdit from '../pages/cardManagement/CardMngEdit'
import ExpensePolicy from '../pages/manage/budgetMaster/ExpensePolicy'
import PolicyUserList from '../pages/manage/budgetMaster/PolicyUserList'
import MasterReport from '../pages/reports/MasterReport'
import TransactionView from '../pages/reports/TransactionView'
import ToolBar from './ToolBar'
import NotFound from './NotFound'
import OrganizationSuperAdmin from '../pages/manage/OrganizationSuperAdmin'
import ExpTypeView from '../pages/expType/ExpTypeView'
import ReportDynamicData from '../pages/reports/ReportDynamicData'
import ReportDynamicList from '../pages/ReportDynamiFields/ReportDynamicList'
import ReportDynamicView from '../pages/ReportDynamiFields/ReportDynamicView'
import UserDashboard from '../UserPanel/dashboard/UserDashboard'
import MasterApprovalRules from '../UserPanel/ApprovalRules/MasterApprovalRules'
import UserMasterReport from '../UserPanel/reports/UserMasterReport'
import UserTransactionView from '../UserPanel/reports/UserTransactionView'
import SuperAdminWeekSet from '../WeekDaySet/SuperAdminWeekSet'
import AdminWeekSet from '../WeekDaySet/AdminWeekSet'

const userNavigation = [
  { name: 'Your Profile', href: '' },
  { name: 'Settings', href: '' },
  { name: 'Sign out', href: '' },
] 

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function SideBar() {


  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false)
  //assigning location variable
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  // console.log(splitLocation[1]);


  const navigation = [
    //{ name: 'Dashboard', href: 'dashboard', icon: FolderIcon, current: splitLocation[1] === "/dashboard" ? true : false, },
    { name: 'Organization', href: 'management', icon: CalendarIcon, current: false },
    { name: 'Budgets', href: 'budgets', icon: InboxIcon, current: false },
  ]


  const dispatch = useDispatch();

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    dispatch(setToken({
      email: '',
      password: '',
      token: ''
    }))
    navigate("/");
    //console.log(pathname)
    //window.location.href="/";
  }

  //side bar toggle btn
  function websidebarhide(id) {
    // console.log($("#weblogo").is(":visible"));
    if ($("#weblogo").is(":visible") === true) {
      console.log(111)
      $(".nav-menu-name").hide(200)
      $("#weblogo").hide(200)
      $("#user-dtl").hide(200)
      $('#webhamburgurmenu').addClass('md:ml-3');
    }
    else {
      // console.log(222)
      $(".nav-menu-name").show(200)
      $("#weblogo").show(200)
      $("#user-dtl").show(200)
    }
  }


  // -- sidebar menu dropdown -- 
  function manage() {
    // console.log($("#dropdown-menu-mg").is(":visible"));
    // -- for desktop --  
    if ($("#dropdown-menu-mg").is(":visible") === true) {
      $("#dropdown-menu-mg").hide()
    }
    else {
      $("#dropdown-menu-mg").show()
    }
    // -- for mobile -- 
    if ($("#dropdown-menu-mg-mobile").is(":visible") === true) {
      $("#dropdown-menu-mg-mobile").hide()
    }
    else {
      $("#dropdown-menu-mg-mobile").show()
    }
  }


  function budget() {
    // console.log($("#dropdown-menu-mg-2").is(":visible"));
    // -- for desktop --  
    if ($("#dropdown-menu-mg-2").is(":visible") === true) {
      $("#dropdown-menu-mg-2").hide()
    }
    else {
      $("#dropdown-menu-mg-2").show()
    }
    // -- for mobile -- 
    if ($("#dropdown-menu-mg-2-mobile").is(":visible") === true) {
      $("#dropdown-menu-mg-2-mobile").hide()
    }
    else {
      $("#dropdown-menu-mg-2-mobile").show()
    }
  }


  return (
    <>
      {
        !localStorage.getItem('token') ? (
          <>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route exact path="/forgotpass" element={<ForgotPass />} />
              <Route exact path="/newpass" element={<NewPass />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </>
        ) : (
          <>



            <div className='flex main-sidebar-div'>
              <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                  </Transition.Child>

                  <div className="fixed inset-0 flex z-40">
                    <Transition.Child
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="-translate-x-full"
                      enterTo="translate-x-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-x-0"
                      leaveTo="-translate-x-full"
                    >
                      <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-teal-700">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-in-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in-out duration-300"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                              type="button"
                              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                              onClick={() => setSidebarOpen(false)}
                            >
                              <span className="sr-only">Close sidebar</span>
                              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                          </div>
                        </Transition.Child>
                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                          <div className="flex-shrink-0 flex items-center px-4">
                            <img
                              className="h-8 w-auto"
                              src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                              alt="Workflow"
                            />
                          </div>







                          {/* Mobile nav part start */}

                          {localStorage.getItem('userType') == "A" ?
                            (<>
                              <nav className="mt-5 px-2 space-y-1">
                                <div className="menu-nav-bg overflow-y-auto py-4 px-3 bg-gray-50 rounded">
                                  <ul className="space-y-2">
                                    <li>
                                      <Link to="/dashboard" className={classNames(
                                        splitLocation[1] === "dashboard" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                        'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                      )}>
                                        <svg aria-hidden="true" className="w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-75 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                        <span className="ml-3 nav-menu-name-mobile" >Dashboard</span>
                                      </Link>
                                    </li>

                                    <li>
                                      <button onClick={manage} type="button" className="flex items-center text-teal-100 p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-teal-600 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-teal-100 hover:text-teal-100 transition duration-150 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap nav-menu-name" >Manage</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                      </button>
                                      <ul id="dropdown-menu-mg-mobile" className="hidden py-2 space-y-2 ml-3">
                                        {/* Manage tab */}
                                        <Link
                                          to='/management#tab_employees'
                                          className={classNames(
                                            splitLocation[1] === "management" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                            'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                          )}
                                        >
                                          <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                          <span className='nav-menu-name-mobile'>Organization</span>
                                        </Link>

                                        
                                        <Link
                                            to='/weekday-set'
                                            className={classNames(
                                              splitLocation[1] === "weekday-set" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                              'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                            )}
                                          >
                                            <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                            <span className='nav-menu-name-mobile'>Week Day Set</span>
                                          </Link>



                                        {/* budget dropdown */}
                                        <li>
                                          <button onClick={budget} type="button" className="flex items-center text-teal-100 p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-teal-600 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-teal-100 hover:text-teal-100 transition duration-75 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                            <span className="flex-1 ml-3 text-left whitespace-nowrap nav-menu-name-mobile" >Budgets</span>
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                          </button>
                                          <ul id="dropdown-menu-mg-2-mobile" className="hidden py-2 space-y-2 ml-3">
                                            {/* allocate-budgets tab */}
                                            <Link
                                              to='budgets/allocate-budgets'
                                              className={classNames(
                                                splitLocation[2] === "allocate-budgets" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                                'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                              )}
                                            >
                                              <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                              <span className='nav-menu-name-mobile'>Allocate Budgets</span>
                                            </Link>
                                            {/* Expense Policy tab */}
                                            <Link
                                              to='budgets/expense-policy/manage'
                                              className={classNames(
                                                splitLocation[2] === "expense-policy" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                                'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                              )}
                                            >
                                              <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                              <span className='nav-menu-name-mobile'>Expense Policy</span>
                                            </Link>
                                          </ul>
                                        </li>
                                      </ul>
                                    </li>

                                    <li>
                                      <Link to={"/report/dynamic-fields"} className={classNames(
                                        splitLocation[1] === "report" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                        'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                      )}>
                                        <ChartBarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                        <span className="nav-menu-name" >Report Dynamic Fileds </span>
                                      </Link>
                                    </li>

                                    <li>
                                      <a onClick={() => logOut()}
                                        href="" className="flex items-center p-2 text-base font-normal text-teal-100 rounded-lg dark:text-white hover:bg-teal-600 dark:hover:bg-gray-700">
                                        <UsersIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                        <span className="nav-menu-name-mobile">logout</span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </nav>


                            </>)

                            : localStorage.getItem('userType') == "U" ?
                              (<>

                                <nav className="mt-5 px-2 space-y-1">
                                  <div className="menu-nav-bg overflow-y-auto py-4 px-3 bg-gray-50 rounded">
                                    <ul className="space-y-2">
                                      <li>
                                        <Link to="/dashboard" className={classNames(
                                          splitLocation[1] === "dashboard" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                          'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}>
                                          <svg aria-hidden="true" className="w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-75 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                          <span className="ml-3 nav-menu-name-mobile" >User Dashboard</span>
                                        </Link>
                                      </li>


                                      <li>
                                        <Link to="/approval-rules" className={classNames(
                                          splitLocation[1] === "approval-rules" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                          'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}>
                                          <svg aria-hidden="true" className="w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-75 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                          <span className="ml-3 nav-menu-name-mobile" >approval rules</span>
                                        </Link>
                                      </li>



                                      <li>
                                        <Link to="/reports" className={classNames(
                                          splitLocation[1] === "reports" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                          'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}>
                                          <svg aria-hidden="true" className="w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-75 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                          <span className="ml-3 nav-menu-name-mobile" >Reports</span>
                                        </Link>
                                      </li>



                                      <li>
                                        <a onClick={() => logOut()}
                                          href="" className="flex items-center p-2 text-base font-normal text-teal-100 rounded-lg dark:text-white hover:bg-teal-600 dark:hover:bg-gray-700">
                                          <UsersIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                          <span className="nav-menu-name-mobile">logout</span>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </nav>


                              </>)
                              :
                              
                              (<>

                                <nav className="mt-5 px-2 space-y-1">
                                  <div className="menu-nav-bg overflow-y-auto py-4 px-3 bg-gray-50 rounded">
                                    <ul className="space-y-2">
                                      <li>
                                        <Link to="/dashboard" className={classNames(
                                          splitLocation[1] === "dashboard" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                          'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}>
                                          <svg aria-hidden="true" className="w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-75 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                          <span className="ml-3 nav-menu-name-mobile" > SA Dashboard</span>
                                        </Link>
                                      </li>

                                      <li>
                                        <button onClick={manage} type="button" className="flex items-center text-teal-100 p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-teal-600 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-teal-100 hover:text-teal-100 transition duration-150 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                          <span className="flex-1 ml-3 text-left whitespace-nowrap nav-menu-name" >Manage</span>
                                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                        <ul id="dropdown-menu-mg-mobile" className="hidden py-2 space-y-2 ml-3">
                                          {/* Manage tab */}
                                          <Link
                                            to='/management#tab_departments'
                                            className={classNames(
                                              splitLocation[1] === "management" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                              'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                            )}
                                          >
                                            <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                            <span className='nav-menu-name-mobile'>Organization</span>
                                          </Link>


                                          <Link
                                            to='/weekday-set'
                                            className={classNames(
                                              splitLocation[1] === "weekday-set" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                              'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                            )}
                                          >
                                            <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                            <span className='nav-menu-name-mobile'>Week Day Set</span>
                                          </Link>

                                        </ul>
                                      </li>

                                      <li>
                                        <a onClick={() => logOut()}
                                          href="" className="flex items-center p-2 text-base font-normal text-teal-100 rounded-lg dark:text-white hover:bg-teal-600 dark:hover:bg-gray-700">
                                          <UsersIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                          <span className="nav-menu-name-mobile">logout</span>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>

                                </nav>


                              </>)}
                          {/* Mobile nav part end */}






                        </div>

                        {/* Mobile profile part in sidebar buttom start */}
                        <div className="flex-shrink-0 flex border-t border-teal-800 p-4">
                          <a href="#" className="flex-shrink-0 group block">
                            <div className="flex items-center">
                              <div>
                                <img
                                  className="inline-block h-10 w-10 rounded-full"
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-base font-medium text-white">Tom Cook</p>
                                <p className="text-sm font-medium text-teal-200 group-hover:text-white">View profile</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        {/* Mobile profile part in sidebar buttom end */}
                      </Dialog.Panel>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
              {/* 
//
//
//
//
//
//
//
//
//
//
//                    MOBILE  ON TOP
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//                   DESKTOP IN BOTTOM
//
//
//
//
//
//
//
//
//
 */}


              {/* Static sidebar for desktop */}
              <div className="hidden md:w-auto md:flex w-auto md:flex-col md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex-1 flex flex-col min-h-0 bg-teal-700">
                  <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">










                    {/* logo and toggle button part start */}
                    <div className="flex items-center gap-4 flex-shrink-0 px-4">
                      <button
                        type="button"
                        id='webhamburgurmenu'
                        className="ml-3 px-2 py-1 bg:white text-white border-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                        onClick={() => websidebarhide(0)}
                      >
                        <span className="sr-only">Open sidebar</span>
                        <MenuAlt2Icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                      <div>
                        <img
                          className="h-8 w-auto logo-img"
                          src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                          alt="Workflow"
                          id='weblogo'
                        />
                      </div>
                    </div>
                    {/* logo and toggle button part end */}













                    {/* navigation part start*/}
                    {localStorage.getItem('userType') == "A" ?
                      (<>


                        <nav className="mt-5 flex-1 px-2 space-y-1">
                          <div className="menu-nav-bg overflow-y-auto py-4 px-3 bg-gray-50 rounded">
                            <ul className="space-y-2">

                              <li>
                                <Link to="/dashboard" className={classNames(
                                  splitLocation[1] === "dashboard" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                  'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                )}>
                                  <svg aria-hidden="true" className="w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-150 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                  <span className="ml-3 nav-menu-name" >Dashboard</span>
                                </Link>
                              </li>


                              <li>
                                <button onClick={manage} type="button" className="flex items-center text-teal-100 p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-teal-600 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-75 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                  <span className="flex-1 ml-3 text-left whitespace-nowrap nav-menu-name" >Manage</span>
                                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                                <ul id="dropdown-menu-mg" className="hidden py-2 space-y-2 ml-3">
                                  {/* Manage tab */}
                                  <Link
                                    to='/management#tab_employees'
                                    className={classNames(
                                      splitLocation[1] === "management" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                      'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                    )}
                                  >
                                    <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                    <span className='nav-menu-name'>Organization</span>
                                  </Link>


                                    <Link
                                      to='/weekday-set'
                                      className={classNames(
                                        splitLocation[1] === "weekday-set" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                        'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                      )}
                                    >
                                      <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                      <span className='nav-menu-name-mobile'>Week Day Set</span>
                                    </Link>


                                  {/* budget dropdown */}
                                  <li>
                                    <button onClick={budget} type="button" className="flex items-center text-teal-100 p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-teal-600 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                      <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-75 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                      <span className="flex-1 ml-3 text-left whitespace-nowrap nav-menu-name" >Budgets</span>
                                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <ul id="dropdown-menu-mg-2" className="hidden py-2 space-y-2 ml-3">
                                      {/* allocate-budgets tab */}
                                      <Link
                                        to='budgets/allocate-budgets'
                                        className={classNames(
                                          splitLocation[2] === "allocate-budgets" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                          'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                      >
                                        <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                        <span className='nav-menu-name whitespace-pre'>Allocate Budgets</span>
                                      </Link>
                                      {/* Expense Policy tab */}
                                      <Link
                                        to='budgets/expense-policy/manage'
                                        className={classNames(
                                          splitLocation[2] === "expense-policy" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                          'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                      >
                                        <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                        <span className='nav-menu-name whitespace-pre'>Expense Policy</span>
                                      </Link>
                                    </ul>
                                  </li>
                                </ul>
                              </li>

                              <li>
                                <Link to={"/report/dynamic-fields"} className={classNames(
                                  splitLocation[1] === "report" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                  'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                )}>
                                  <ChartBarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                  <span className="nav-menu-name">Report Dynamic Fileds</span>
                                </Link>
                              </li>


                              <li>
                                <a onClick={() => logOut()}
                                  href="" className="flex items-center p-2 text-base font-normal text-teal-100 rounded-lg dark:text-white hover:bg-teal-600 dark:hover:bg-gray-700">
                                  <UsersIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                  <span className="nav-menu-name">logout</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </nav>

                      </>)




                      : localStorage.getItem('userType') == "U" ?


                        (<>

                          <nav className="mt-5 flex-1 px-2 space-y-1">
                            <div className="menu-nav-bg overflow-y-auto py-4 px-3 bg-gray-50 rounded">
                              <ul className="space-y-2">

                                <li>
                                  <Link to="/dashboard" className={classNames(
                                    splitLocation[1] === "dashboard" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                    'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                  )}>
                                    <svg aria-hidden="true" className="w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-150 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                    <span className="ml-3 nav-menu-name" >User Dashboard</span>
                                  </Link>
                                </li>


                                <li>
                                  <Link to="/approval-rules" className={classNames(
                                    splitLocation[1] === "approval-rules" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                    'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                  )}>
                                    <svg aria-hidden="true" className="w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-150 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                    <span className="ml-3 nav-menu-name" >Approval Rules</span>
                                  </Link>
                                </li>



                                <li>
                                  <Link to="/reports" className={classNames(
                                    splitLocation[1] === "reports" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                    'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                  )}>
                                    <svg aria-hidden="true" className="w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-150 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                    <span className="ml-3 nav-menu-name" >Reports</span>
                                  </Link>
                                </li>


                                <li>
                                  <a onClick={() => logOut()}
                                    href="" className="flex items-center p-2 text-base font-normal text-teal-100 rounded-lg dark:text-white hover:bg-teal-600 dark:hover:bg-gray-700">
                                    <UsersIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                    <span className="nav-menu-name">logout</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </nav>


                        </>)

                        :

                       
                        (<>

                          <nav className="mt-5 flex-1 px-2 space-y-1">
                            <div className="menu-nav-bg overflow-y-auto py-4 px-3 bg-gray-50 rounded">
                              <ul className="space-y-2">

                                <li>
                                  <Link to="/dashboard" className={classNames(
                                    splitLocation[1] === "dashboard" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                    'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                  )}>
                                    <svg aria-hidden="true" className="w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-150 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                    <span className="ml-3 nav-menu-name" >Dashboard</span>
                                  </Link>
                                </li>


                                <li>
                                  <button onClick={manage} type="button" className="flex items-center text-teal-100 p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-teal-600 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-teal-300 hover:text-teal-300 transition duration-75 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap nav-menu-name" >Manage</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                  </button>
                                  <ul id="dropdown-menu-mg" className="hidden py-2 space-y-2 ml-3">
                                    {/* Manage tab */}
                                    <Link
                                      to='/management#tab_departments'
                                      className={classNames(
                                        splitLocation[1] === "management" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                        'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                      )}
                                    >
                                      <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                      <span className='nav-menu-name'>Organization</span>
                                    </Link>

                                    <Link
                                      to='/weekday-set'
                                      className={classNames(
                                        splitLocation[1] === "weekday-set" ? true : false ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600',
                                        'text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                      )}
                                    >
                                      <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                      <span className='nav-menu-name'>Week Day Set</span>
                                    </Link>

                                  </ul>
                                </li>

                                <li>
                                  <a onClick={() => logOut()}
                                    href="" className="flex items-center p-2 text-base font-normal text-teal-100 rounded-lg dark:text-white hover:bg-teal-600 dark:hover:bg-gray-700">
                                    <UsersIcon className="mr-3 flex-shrink-0 h-6 w-6 text-teal-300" aria-hidden="true" />
                                    <span className="nav-menu-name">logout</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </nav>

                        </>)}

                    {/* navigation part end */}











                  </div>
                  {/* buttom profile part in sidebar start */}
                  <div className="flex-shrink-0 flex border-t border-teal-800 p-4">
                    <a href="#" className="flex-shrink-0 w-full group block">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-9 w-9 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3 nav-menu-name">
                          <p className="text-sm font-medium text-white">{localStorage.getItem('name')}</p>
                          <p className="text-xs font-medium text-teal-200 group-hover:text-white">
                            {localStorage.getItem('userType') == "A" ? "Admin" : localStorage.getItem('userType') == "U" ? "User" : "Super Admin"}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  {/* buttom profile part in sidebar end */}
                </div>
              </div>














              {/* -- Start right side main content div With route logic --  */}
              <div className="w-full flex flex-col flex-1 divide-y">
                <div className="sticky">
                  <ToolBar></ToolBar>
                </div>

                {/* -- start right content --  */}
                <main className="flex-1 main-sidebar-content items-end">
                  <div className="py-6">

                    <Routes>
                      <>
                        {localStorage.getItem('userType') == "A" ?
                          (<>

                            <Route exact path="/dashboard" element={<Dashboard />} />

                            <Route exact path="/management" element={<OrgTabs />} />
                            <Route exact path="/employee-management" element={<NewEmpCrud />} />
                            <Route exact path="/employee-management/approval" element={<Approval />} />


                            <Route exact path="/card-mng" element={<CardMngList />} />
                            <Route exact path="/card-mng/add" element={<CardMngAdd />} />
                            <Route exact path="/card-mng/view/:id" element={<CardMngView />} />
                            <Route exact path="/card-mng/edit/:id" element={<CardMngEdit />} />


                            <Route exact path="/budgets/allocate-budgets" element={<AllocateBudgets />} />
                            <Route exact path="/budgets/expense-policy" element={<ExpensePolicy />} />
                            <Route exact path="/budgets/expense-policy/manage" element={<MasterBudgets />} />
                            <Route exact path="/budgets/expense-policy/userlist/:id" element={<PolicyUserList />} />


                            <Route exact path="/report" element={<MasterReport />} />
                            <Route exact path="/report/transaction-detail/:id" element={<TransactionView />} />

                            <Route exact path="/exptype/view/:id" element={<ExpTypeView />} />
                            <Route exact path="/report/dynamic-fields" element={<ReportDynamicList />} />
                            <Route exact path="/report/dynamic-fields/view/:id" element={<ReportDynamicView />} />
                             
                            <Route exact path="/weekday-set" element={<AdminWeekSet />} />


                            <Route path="*" element={<NotFound />} />

                          </>)

                          : localStorage.getItem('userType') == "U" ?

                            (<>

                              <Route exact path="/dashboard" element={<UserDashboard />} />
                              <Route exact path="/approval-rules" element={<MasterApprovalRules />} />

                              <Route exact path="/reports" element={<UserMasterReport />} />
                              <Route exact path="/reports/transaction-detail/:id" element={<UserTransactionView />} />


                              <Route path="*" element={<NotFound />} />



                            </>)


                            :

                            (<>

                              <Route exact path="/dashboard" element={<Dashboard />} />

                              <Route exact path="/departments/add" element={<DeptAdd />} />
                              <Route exact path="/departments" element={<DeptList />} />
                              <Route exact path="/departments/edit/:id" element={<DeptEdit />} />
                              <Route exact path="departments/view/:id" element={<DeptView />} />


                              <Route exact path="/management" element={<OrganizationSuperAdmin />} />
                              <Route exact path="/weekday-set" element={<SuperAdminWeekSet />} />

                              <Route path="*" element={<NotFound />} />

                            </>)
                        }
                        {/* <Route exact path="/dashboard" element={<Dashboard />} />
                        <Route exact path="/departments/add" element={<DeptAdd />} />
                        <Route exact path="/departments" element={<DeptList />} />
                        <Route exact path="/departments/edit/:id" element={<DeptEdit />} />
                        <Route exact path="departments/view/:id" element={<DeptView />} />


                        <Route exact path="/management" element={<OrgTabs />} />
                        <Route exact path="/employee-management" element={<NewEmpCrud />} />
                        <Route exact path="/employee-management/approval" element={<Approval />} /> */}
                        {/* 
                        <Route exact path="/card-mng" element={<CardMngList />} />
                        <Route exact path="/card-mng/add" element={<CardMngAdd />} />
                        <Route exact path="/card-mng/view/:id" element={<CardMngView />} />
                        <Route exact path="/card-mng/edit/:id" element={<CardMngEdit />} /> */}
                        {/* 
                        <Route exact path="/budgets/allocate-budgets" element={<AllocateBudgets />} />
                        <Route exact path="/budgets/expense-policy" element={<ExpensePolicy />} />
                        <Route exact path="/budgets/expense-policy/manage" element={<MasterBudgets />} />
                        <Route exact path="/budgets/expense-policy/userlist/:id" element={<PolicyUserList />} /> */}


                        {/* 
                        <Route exact path="/report" element={<MasterReport />} />
                        <Route exact path="/report/transaction-detail/:id" element={<TransactionView />} /> */}

                      </>
                    </Routes>
                    {/* {splitLocation[1]=="dashboard" ?  <Dashboard/> : ''} */}
                    {/* {splitLocation[1]=="management" ? <OrgTabs /> : ''}
                      {splitLocation[2]=="allocate-budgets" ? <AllocateBudgets /> : ''}
                      {splitLocation[2]=="expense-policy" ? <MasterBudgets /> : ''} */}

                  </div>
                </main>
                {/* -- closed right content --  */}


              </div>
              {/* -- closed right side content div  With route logic --  */}

            </div>
          </>
        )
      }
    </>
  )
}
