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

// not reqired
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import ExpensePolicy from './ExpensePolicy'
import CardListExpensePolicy from "./CardListExpensePolicy"
import { PlusIcon as PlusIconMini } from '@heroicons/react/solid'
import { PlusIcon as PlusIconOutline } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { getLodderStatus } from '../../../../../redux/adminSlices/lodderSlice';
import { toast } from "react-toastify";
import { SetPolicyList } from '../../../../../redux/adminSlices/ExpencePolisyListSlice'





const actionOptions = [
  { name: 'Add New', href: '#', current: true },
  { name: 'Delete', href: '#', current: true },
]


// const filters = [
//   {
//     id: 'department',
//     name: 'Department',
//     options: [
//       { value: 'it', label: 'IT', checked: false },
//       { value: 'marketing', label: 'Marketing', checked: false },
//       { value: 'operations', label: 'Operations', checked: true },
//     ],
//   },
//   {
//     id: 'expenseType',
//     name: 'Expense Type',
//     options: [
//       { value: 'flight', label: 'Flight', checked: false },
//       { value: 'cab', label: 'Cab', checked: false },
//       { value: 'hotel', label: 'Hotel', checked: false },
//     ],
//   },
// ]

// const activeFilters = [
//                         { value: 'flight', label: 'Flight' },
//                         { value: 'it', label: 'IT' },
//                         { value: 'it', label: 'IT' }]




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}







export default function Filters() {

  const [open, setOpen] = useState(false)

  const baseUrl = useSelector(state => state.keyValSlice.url);
  const [dynmicdata, SetDynamicData] = useState([]);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([
    // {
    //   id: 'department',
    //   name: 'Department',
    //   options: [
    //     { value: 'it', label: 'IT', checked: true },
    //     { value: 'marketing', label: 'Marketing', checked: true },
    //     { value: 'operations', label: 'Operations', checked: true },
    //   ],
    //   numChecked: 3,
    // },


    // {
    //   id: 'expenseType',
    //   name: 'Expense Type',
    //   options: [
    //     { value: 'flight', label: 'Flight', checked: false },
    //     { value: 'cab', label: 'Cab', checked: true },
    //     { value: 'hotel', label: 'Hotel', checked: true },
    //   ],
    //   numChecked: 3,
    // },


  ])












  const [srch, setSearch] = useState('');//nt req
  const [arr1, setArr1] = useState(dynmicdata);
  const [arr2, setArr2] = useState([]); //for list
  const [status, setStatus] = useState("1");//nrq
  const [val, setVal] = useState([]); //for check and unchk 

  useEffect(() => {
    getData();
    getAllExpencePolicy();
  }, []);

  //part 1
  async function getData() {
    var res = await fetch(`${baseUrl}/get-dept-list-with-exp-list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json()
    console.log(data);
    setFilters(data.result.data)

  }



  //---MAIN LISTIN OF THAT PAGE------//
  async function getAllExpencePolicy() {
    //alert(id);
    dispatch(getLodderStatus(true))
    await axios.get(`${baseUrl}/expence-policy-list`, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res)
      if (res.data.result.code == "200") {
        if (res.data.result.data == "none") {
          SetDynamicData([...dynmicdata, {
            unique_id: '', dept_id: '', exp_type_id: '', from_date: '', to_date: '', level_name: '', amount_per_user: '', amount_per_transaction: '', periodicity: ''
          }]);

        } else {
          SetDynamicData(res.data.result.data)
          setArr1(res.data.result.data)
          dispatch(SetPolicyList(res.data.result.data))
          // setArr2(res.data.result.data)
          // SetTotalIndex(res.data.result.count)
        }
      } else {
        toast.error(res.data.result.message);
      }
    })
      .catch((err) => {
        console.log(err);
        //toast.error(err.data.result.message);
      });
    dispatch(getLodderStatus(false))
  }







  //part-2
  const [activeFilters, setActiveFilters] = useState([]);


















  // part-3
  function handleFilterChange(sectionID, optionIDx, optionValue) {
    console.log(sectionID);
    console.log(optionIDx)
    console.log(optionValue)//imp
    // if(status==="1"){
    //   setStatus("2")
    //   setArr2([]);
    //   // return false;
    // }




    // Set Active Filters
    var filterData = activeFilters.filter(item => item.value.includes(optionValue));
    if (filterData.length === 0) {
      setActiveFilters(prev => [...prev, {
        "value": optionValue,
        "label": optionValue == "it" ? optionValue.toUpperCase() : optionValue.charAt(0).toUpperCase() + optionValue.slice(1)
      }])
    } else {
      setActiveFilters((prev) => activeFilters.filter((item) => item.value !== optionValue))
    }
    //  console.log(filterData);

    var tempFilters = filters;
    for (const [key, value] of Object.entries(tempFilters)) {

      if (filters[key].id === sectionID) {
        console.log(tempFilters[key].id)
        tempFilters[key]["options"][optionIDx].checked
          = !tempFilters[key]["options"][optionIDx].checked;
      }
      tempFilters[key].numChecked = tempFilters[key]["options"].filter(item => item.checked === true).length;
      setFilters(tempFilters);
      //  console.log("Checked", filters[key].numChecked)      
    }









    //------------------------FILTER Coding PART Start -----------------------------------//





    // if tf=ture then opposite of filter and remove datas from arr2  -----------   if false then  filter that data
    var tf = val.includes(optionValue);
    
    if (tf) {  //opposite of filter function if true
      const index = val.indexOf(optionValue);
      if (index > -1) { // only splice array when item is found
        val.splice(index, 1); // 2nd parameter means remove one item only
      }

      //filter code
      const lowerCaseValue2 = optionValue.toLowerCase().trim();

      console.log(lowerCaseValue2)
      if (!lowerCaseValue2) {
        setArr1(dynmicdata);

      }
      else {

        console.log(activeFilters.length)
        if (parseInt(activeFilters.length) - 1 === 0) {
          setArr2([]);
          dispatch(SetPolicyList(arr1))
          // alert("1") arr1
          console.log("111111111111")

        } else {
          console.log("0000000000000")
          const filterData2 = arr2.filter(item => {
            return !Object.keys(item).some(key => {
              // console.log(item[key])
              var xyz = item[key].toString().toLowerCase().includes(lowerCaseValue2)
              return xyz
            })
          });
          console.log(filterData2)
          setArr2(filterData2);
          dispatch(SetPolicyList(filterData2))
        }

      }
    }












    else { ///------main filter function
      setVal(current => [...current, optionValue]);

      //filter code
      // const lowerCaseValue=activeFilters[0].label.toLowerCase().trim();
      const lowerCaseValue = optionValue.toLowerCase().trim();

      console.log(activeFilters.length)
      if (!lowerCaseValue) {
        setArr1(dynmicdata);
      }
      else {
        const filterData = arr1.filter(item => {
          return Object.keys(item).some(key => {
            // console.log(item[key])
            return item[key].toString().toLowerCase().includes(lowerCaseValue)
          })
        });


        var newArr = [...arr2, ...filterData];
        //dublicate if exists then remove all the object and keep only the dublicate
        const uniqueIds = [];
        const uniqueArray = newArr.filter(element => {
          const isDuplicate = uniqueIds.includes(element.id);
          if (!isDuplicate) {
            uniqueIds.push(element.id);
            return true;
          }
          return false;
        });
        console.log(uniqueArray.length);
        setArr2(uniqueArray);
        dispatch(SetPolicyList(uniqueArray))

      }
    }
    console.log(tf)
    console.log(val, optionValue)

  }
















// part 4
  const [sortOptions,SetSortOptions] =useState( [
    { name: 'Newest', href: '#', current: false },
    { name: 'Departments', href: '#', current: false },
    { name: 'Expense Type', href: '#', current: false },
  ]);

const [order,setOrder]=useState('ASC')
const lists= useSelector(state => state.ExpencePolisyListSlice.list);

function sortFunction(name){
  console.log(name)
  var nm="";
  if(name==="Departments"){
   nm="dept_name";
  }
  else if(name==="Expense Type"){
   nm="exp_type_name";
  }else{
    nm="updated_at"
  }


  // dept_name  exp_type_name  updated_at
  if(order==="ASC"){
    const sorted=[...lists].sort((a,b)=>
    a[nm].toLowerCase() > b[nm].toLowerCase() ? 1 : -1
    );
    dispatch(SetPolicyList(sorted))
    setOrder('DSC')
  }else{
    const sorted=[...lists].sort((a,b)=>
    a[nm].toLowerCase() < b[nm].toLowerCase() ? 1 : -1
    );
    dispatch(SetPolicyList(sorted))
    setOrder('ASC')
  }

  //change the text color of sort..
  if(name==="Departments"){
    SetSortOptions([
      { name: 'Newest', href: '#', current: false },
      { name: 'Departments', href: '#', current: true },
      { name: 'Expense Type', href: '#', current: false },
    ])
   }
   else if(name==="Expense Type"){
    SetSortOptions([
      { name: 'Newest', href: '#', current: false },
      { name: 'Departments', href: '#', current: false },
      { name: 'Expense Type', href: '#', current: true },
    ])
   }else{
    SetSortOptions([
      { name: 'Newest', href: '#', current: true },
      { name: 'Departments', href: '#', current: false },
      { name: 'Expense Type', href: '#', current: false },
    ])
   }
}





























  return (
    <div className="bg-white mt-1">

      {/* Mobile filter dialog start */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure as="div" key={section.name} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value + optionIdx} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    // onChange={console.log(option.checked)}
                                    onChange={() => handleFilterChange(section.id, optionIdx, option.value)}
                                    className="h-4 w-4 border-gray-300 rounded text-teal-600 focus:ring-teal-500 cursor-pointer ring-inset ring-teal-500 md:ring-teal-500 lg:ring-teal-500 focus:ring-0 focus:ring-offset-0"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.label}/mobile
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Mobile filter part end */}




















      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>


        <div className="relative z-10 bg-white border-b border-gray-200 pb-4">
          <div className="max-w-7xl mx-auto px-2 flex items-center justify-between sm:px-4 lg:px-6">
            {/* <input
              id="expPolicy-actions-selectAll"
              aria-describedby="expPolicy-actions-selectAll"
              name="expPolicy-actions-selectAll"
              type="checkbox"
              className=" hover:bg-teal-500 h-4 w-4 text-teal-600 border-gray-400 rounded cursor-pointer ring-inset ring-teal-500 md:ring-teal-500 lg:ring-teal-500 focus:ring-0 focus:ring-offset-0"
            /> */}








            {/* menu for sort */}
            <Menu as="div" className="relative inline-block text-left items-left justify-left">
              <div className="flex flex-row space-x-1">
                {/* <Menu.Button className="group inline-flex justify-left text-sm font-medium text-gray-700 hover:text-gray-900">
                  Actions
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button> */}

                <Menu.Button className="group inline-flex justify-left text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >

                <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">

                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            onClick={() => {
                              // console.log("clicked", option.name)
                              sortFunction(option.name)
                            }}
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}/web
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>










            {/* menu for actions */}
            <Menu as="div" className="relative inline-block text-left items-left justify-left">
              <div className="flex flex-row space-x-1">
                <Menu.Button className="group inline-flex justify-left text-sm font-medium text-gray-700 hover:text-gray-900">
                  Actions
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>

              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >

                <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">

                    {actionOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            onClick={() => {
                              console.log("clicked actions", option.name)
                            }}
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>






















            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filtersssss
            </button>






            {/* Start of filter section for desktop check part*/}

            <div className="hidden sm:block">
              <div className="flow-root">
                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                  {filters.map((section, sectionIdx) => (

                    <Popover key={section.name} className="px-4 relative inline-block text-left">
                      <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>{section.name}</span>
                        {sectionIdx === 0 ? (
                          <span className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                            {/* 1 */}
                            {/* Rohan */}
                            {/* {filters.filter((obj) => obj.id === sectionIdx)["numChecked"]} */}
                            {filters[sectionIdx]["numChecked"]}
                          </span>
                        ) :
                          <span className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                            {/* 1 */}
                            {/* Rohan */}
                            {/* {filters.filter((obj) => obj.id === sectionIdx)["numChecked"]} */}
                            {filters[sectionIdx]["numChecked"]}
                          </span>
                        }
                        <ChevronDownIcon
                          className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Popover.Button>





















                      {/* this is for click event on dept and exp filter for web  start*/}
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <form className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value + optionIdx} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={() => handleFilterChange(section.id, optionIdx, option.value)}
                                  className="h-4 w-4 border-gray-300 rounded text-teal-600 focus:ring-teal-500 ring-teal-500 cursor-pointer hover:bg-teal-600 ring-inset md:ring-teal-500 lg:ring-teal-500 focus:ring-0 focus:ring-offset-0"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                >
                                  {option.label}/web
                                </label>
                              </div>
                            ))}
                          </form>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}
                  {/* <button
                    type="button"
                    className="inline-flex items-center rounded-full border border-transparent bg-teal-500 p-1 text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-offset-2"
                  >
                    <PlusIconMini className="h-5 w-5" aria-hidden="true" />
                  </button> */}
                </Popover.Group>
                {/* this is for click event on dept and exp filter for web end*/}
              </div>
            </div>
          </div>
        </div>














        {/* Active filters after check a checkbox. it will show below ..start */}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">

            <h3 className="text-sm font-medium text-gray-500">
              Filtersmm
              <span className="sr-only">, active</span>
            </h3>

            <div aria-hidden="true" className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4" />

            <div className="mt-2 sm:mt-0 sm:ml-4">
              <div className="-m-1 flex flex-wrap items-center">
                {activeFilters.map((activeFilter) => (
                  <span
                    key={activeFilter.value}
                    className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
                  >
                    <span>{activeFilter.label}/mm</span>
                    <button
                      type="button"
                      className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    >
                      <span className="sr-only">Remove filter for {activeFilter.label}</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* <ExpensePolicy dataone={arr1} datatwo={arr2} /> */}
      <CardListExpensePolicy></CardListExpensePolicy>







      {/* <table>
        <tr>
          <th>name</th>
          <th>Dept</th>
          <th>Exp</th>
          <th>level</th>

        </tr>
        {arr1.map((data, index) => (
          <tr key={index}>


            <td>{data.unique_id}</td>
            <td>{data.dept_name}</td>
            <td>{data.exp_type_name}</td>
            <td>{data.level_name}</td>


          </tr>
        ))}
      </table> */}



      <br></br>
      <table>
        <tr>
          <th>name</th>
          <th>Dept</th>
          <th>Exp</th>
          <th>level</th>

        </tr>
        {arr2.map((data, index) => (
          <tr key={index}>


            <td>{data.unique_id}</td>
            <td>{data.dept_name}</td>
            <td>{data.exp_type_name}</td>
            <td>{data.level_name}</td>


          </tr>
        ))}
      </table>
    </div>
  )
}
