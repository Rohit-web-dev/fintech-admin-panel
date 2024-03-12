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
import NewEmpCrud from '../employee/NewEmpCrud';
import DeptList from '../department/DeptList';
import CardMngList from '../cardManagement/CardMngList';
import { PlusIcon } from '@heroicons/react/solid'
import CardlistSlice from '../../../../redux/adminSlices/cardlistSlice';
import ToolBar from "../../common/ToolBar"
import $ from "jquery";

const tabs = [
  { name: 'Employees', href: '#tab_employees', icon: UserIcon, current: true },
  { name: 'Cards', href: '#tab_cards', icon: CreditCardIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function handleTabClick(activeTabId) {
  tabs.forEach((tab, idx) => {
    if (idx == activeTabId) {
      tabs[idx].current = true;
    } else {
      tabs[idx].current = false;
    }
  })

  //console.log("From tab fn", tabs, activeTabId);
}


export default function OrgTabs() {

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {

    const url = window.location.href;
    const url_small = url.split("/management")
    // alert( url_small[1])
    // console.log(url)

    if (url_small[1] == "#tab_cards") {
      setActiveTab(1)
    } else {
      setActiveTab(0)
      $(".dx-button-text").show();
      $(".dx-button-text").text('Add Employee')
    }

    // console.log(activeTab)
    setTimeout(() => {
      if (activeTab === 0) {

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
                  setActiveTab(idx)
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
              <div className={activeTab === 0 ? "block" : "hidden"}>

                <NewEmpCrud></NewEmpCrud>

              </div>
              <div className={activeTab === 1 ? "block" : "hidden"}>

                <CardMngList></CardMngList>

              </div>

              {/* just to load modal */}
              <div className={activeTab === 3 ? "hidden" : "hidden"}>
                <DeptList></DeptList>
              </div>


            </div>
            {/* </div> */}
          </div>



        </div>
      </div>




    </>
  )
}


// function TabRender(props) {
//   const tabName = { props };
//   switch (tabName) {

//     case 'Departments':
//       return (<div className="tab-pane fade show active" id="tab_departments" role="tabpanel" aria-labelledby="tabs_departments">
//         <DeptList></DeptList>
//       </div>
//       );
//     case 'Employees':
//       return (<div className="tab-pane fade show active" id="tab_employees" role="tabpanel" aria-labelledby="tabs_employees">
//         <NewEmpCrud></NewEmpCrud>
//       </div>);
//     case 'Cards':
//       return (<div className="tab-pane fade show active" id="tab_cards" role="tabpanel" aria-labelledby="tabs_cards">
//         <CardlistSlice></CardlistSlice>
//       </div>);


//   }
// }
