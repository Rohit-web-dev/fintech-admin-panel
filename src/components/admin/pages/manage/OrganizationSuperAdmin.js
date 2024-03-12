/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useEffect, useState } from "react";
import { CreditCardIcon, OfficeBuildingIcon, UserIcon, UsersIcon } from '@heroicons/react/solid'
import AdminList from "../admin/AdminList";
import DeptList from '../department/DeptList';
import { PlusIcon } from '@heroicons/react/solid'
import CardlistSlice from '../../../../redux/adminSlices/cardlistSlice';
import ToolBar from "../../common/ToolBar"
import $ from "jquery";

const tabs = [
    { name: 'Departments', href: '#tab_departments', icon: OfficeBuildingIcon, current: true },
    { name: 'Admins', href: '#tab_admin', icon: UserIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function handleTabClick(activeTabForSuperAdminId) {
    tabs.forEach((tab, idx) => {
        if (idx == activeTabForSuperAdminId) {
            tabs[idx].current = true;
        } else {
            tabs[idx].current = false;
        }
    })

    //console.log("From tab fn", tabs, activeTabForSuperAdminId);
}


export default function OrganizationSuperAdmin() {

    const [activeTabForSuperAdmin, setActiveTabForSuperAdmin] = useState(0);

    useEffect(() => {

        const url = window.location.href;
        const url_small = url.split("/management")
        // alert( url_small[1])
        // console.log(url)

        if (url_small[1] == "#tab_admin") {
            setActiveTabForSuperAdmin(1)
        } else {
            setActiveTabForSuperAdmin(0)
        }

        // console.log(activeTabForSuperAdmin)
        setTimeout(() => {
            if (activeTabForSuperAdmin === 0) {

                $('#ab0').addClass('border-teal-500 text-teal-600');
                $('#icon0').addClass('text-teal-500');
                $('#text0').css('color', '#008080');//blue


                $('#ab1').removeClass('border-teal-500 text-teal-600');
                $('#ab1').removeClass('border-b-2');
                $('#icon1').removeClass('text-teal-500');
                $('#text1').css('color', '#a1a6a9');//ash



                tabs[0].current = true;
                tabs[1].current = false;
                // console.log(tabs )
            } else {
                $('#ab1').addClass('border-teal-500 text-teal-600');
                $('#icon1').addClass('text-teal-500');
                $('#text1').css('color', '#008080');//blue


                $('#ab0').removeClass('border-teal-500 text-teal-600');
                $('#ab0').removeClass('border-b-2');
                $('#icon0').removeClass('text-teal-500');
                $('#text0').css('color', '#a1a6a9');//ash

                tabs[0].current = false;
                tabs[1].current = true;

            }
        }, 10);

    })


    return (
        <>
            <div className="sm:hidden ">

                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                    defaultValue={tabs.find((tab) => tab.current).name}
                >
                    {tabs.map((tab, idx) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>


            {/* <ToolBar /> */}
            <div className=" sm:block px-1 mt-1">
                <div className="border-b border-gray-200">



                    <ul className="nav nav-tabs flex space-x-4" aria-label="Tabs" role="tablist" data-tabs-toggle="#tabContent">
                        {tabs.map((tab, idx) => (
                            <li className="nav-item" role="presentation" key={tab.name}
                                onClick={() => {
                                    setActiveTabForSuperAdmin(idx)
                                    handleTabClick(idx)
                                }
                                }>
                                <a
                                    id={"ab" + idx}
                                    key={tab.name}
                                    href={tab.href}
                                    className={classNames(
                                        tab.current
                                            ? 'border-teal-500 text-teal-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                        'group inline-flex items-center py-1 px-1 border-b-2 font-medium text-sm'
                                    )}
                                    aria-current={tab.current ? 'page' : undefined}
                                    role="tab"
                                    data-tabs-target={tab.href}
                                >
                                    <tab.icon
                                        id={"icon" + idx}
                                        className={classNames(
                                            tab.current ? 'text-teal-500' : 'text-gray-400 group-hover:text-gray-500',
                                            '-ml-0.5 mr-2 h-5 w-5'
                                        )}
                                        aria-hidden="true"
                                    />
                                    <span id={"text" + idx}>{tab.name}</span>

                                </a>

                            </li>

                        ))}
                    </ul>











                    <div className="flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded items-end justify-end mt-auto">
                        {/* <div className="flex-auto"> */}
                        <div className="tab-content tab-space items-end">
                            <div className={activeTabForSuperAdmin === 0 ? "block" : "hidden"}>

                                <DeptList></DeptList>
                            </div>
                            <div className={activeTabForSuperAdmin === 1 ? "block" : "hidden"}>

                                <AdminList></AdminList>

                            </div>




                        </div>
                        {/* </div> */}
                    </div>



                </div>
            </div>




        </>
    )
}


