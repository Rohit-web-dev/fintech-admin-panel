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
import { useState, useEffect } from "react";
import { OfficeBuildingIcon, UserIcon } from '@heroicons/react/solid'
import ExpensePolicy from "./ExpensePolicy";
import ExpTypeCrud from "../../expType/ExpTypeCrud";
import $ from "jquery";
import Filters from "./Filters";

const tabs = [
  { name: 'Expense policy', href: '#tab_policy', icon: OfficeBuildingIcon, current: true },
  { name: 'Expense Type', href: '#tab_type', icon: UserIcon, current: false },
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
  //console.log("From tab fn", tabs);
}


//---------------for expence policy page with 2 tab(for policy and type ) ------------------//
export default function MasterBudgets() {

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const url = window.location.href;
    const url_small = url.split("expense-policy/manage")
    //  alert( url_small[1])
     if (url_small[1] == "#tab_type") {
      setActiveTab(1)
    } else {
      setActiveTab(0)
    }
    // console.log(url)
  
    // window.scrollTo(0, 0);
   // xyz();
  setTimeout(() => {
    if (activeTab === 0) {
      //alert(1)
      // $("#ab0").trigger('click')
      // $("#ab0").trigger('click')
     
      $('#ab0').addClass('border-teal-500 text-teal-600');
      $('#icon0').addClass('text-teal-500');
      $('#text0').css('color','#008080');//blue


      $('#ab1').removeClass('border-teal-500 text-teal-600');
      $('#icon1').removeClass('text-teal-500');
      $('#text1').css('color','#a1a6a9');//ash


       tabs[0].current = true;
       tabs[1].current = false;
      // console.log(tabs )
    } else {
      //alert(0)
      $('#ab1').addClass('border-teal-500 text-teal-600');
      $('#icon1').addClass('text-teal-500');
      $('#text1').css('color','#008080');//blue


      $('#ab0').removeClass('border-teal-500 text-teal-600');
      $('#icon0').removeClass('text-teal-500');
      $('#text0').css('color','#a1a6a9');//ash

      tabs[0].current = false;
      tabs[1].current = true;
    }
  }, 10); 
    //tabs[2].current = false;
    // console.log("aaaaa " +1,activeTab )
  })

  // async function xyz(){
  //   var target = $('#abc');
  //   if (target.length) {
  //       $('html,body').animate({
  //           scrollTop: target.offset().top
  //       }, 1000);
  //       return false;
  //   }
  // }




  return (
    <>
      <div className="sm:hidden">
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
      <div id="abc">
      <div className="sm:block px-4" >
        <div className="border-b border-gray-200">
          <ul className="nav nav-tabs -mb-px flex space-x-8" aria-label="Tabs" role="tablist" data-tabs-toggle="#tabContent">
            {tabs.map((tab, idx) => (
              <li className="nav-item" role="presentation" key={tab.name} 
                onClick={() => {
                  setActiveTab(idx)
                  handleTabClick(idx)
                }
                }>
                <a
                  id={"ab"+idx}
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                  role="tab"
                  data-tabs-target={tab.href}
                >
                  <tab.icon
                    id={"icon"+idx}
                    className={classNames(
                      tab.current ? 'text-teal-500' : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-0.5 mr-2 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                  <span id={"text"+idx}>{tab.name}</span>

                </a>

              </li>

            ))}
          </ul>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mt-2 mb-6 shadow-lg rounded">
            <div className="flex-auto">
              <div className="tab-content tab-space h-full">

                <div className={activeTab === 0 ? "block" : "hidden"}  >
                  <ExpensePolicy></ExpensePolicy>
                  {/* <Filters></Filters> */}
                </div>

                <div className={activeTab === 1 ? "block" : "hidden"} id="tab_type">
                  <ExpTypeCrud></ExpTypeCrud>
                </div>

              </div>
            </div>
          </div>



        </div>
      </div>
      </div>
    </>
  )
}



