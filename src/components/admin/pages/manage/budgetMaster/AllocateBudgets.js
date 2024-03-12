import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { setDeptSlice } from '../../../../redux/adminSlices/deptAddSlice'
// import { DEPT_SUBMIT, DEPT_GET_CLONE } from '../../../../redux/type';
import { css } from "@emotion/react";
import $ from "jquery";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLodderStatus } from '../../../../../redux/adminSlices/lodderSlice';
import validate from 'jquery-validation'
import { BsEyeFill, BsEyeSlashFill, BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';
import { PlusIcon as PlusIconMini } from '@heroicons/react/solid'






//filter import part for import
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import CardListExpensePolicy from "./CardListExpensePolicy"
import { PlusIcon as PlusIconOutline } from '@heroicons/react/outline'
import PolicyUserList from './PolicyUserList';

const actionOptions = [
  { name: 'Add New', href: '#', current: true },
  { name: 'Delete', href: '#', current: true },
]








const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}











// function starts 
const AllocateBudgets = () => {
  const [dynmicdata, SetDynamicData] = useState([]);






  //-------------------------Filter part states start-----------------------------
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState([]);

  const [srch, setSearch] = useState('');//nt req
  const [arr1, setArr1] = useState(dynmicdata);
  const [arr2, setArr2] = useState([]); //for list
  const [status, setStatus] = useState("1");////to set array in filter
  const [val, setVal] = useState([]); //for check and unchk 


  // part-1
  useEffect(() => {
    getData();
  }, []);


  //part-2
  const [activeFilters, setActiveFilters] = useState([]);

  // part 4
  const [sortOptions, SetSortOptions] = useState([
    { name: 'Newest', href: '#', current: false },
    { name: 'Departments', href: '#', current: false },
    { name: 'Expense Type', href: '#', current: false },
  ]);

  const [order, setOrder] = useState('ASC')

  //------------------------filter part states end----------------------------------












  //assigning location variable
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");
  // console.log(splitLocation[2]);

  const navigate = useNavigate();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url);
  const dispatch = useDispatch();

  //for dynamic form
  // const [dynmicdata, SetDynamicData] = useState([]);
  const [depts, SetDepts] = useState([]);
  const [exp_type, SetExp_type] = useState([]);
  const [totalIndex, SetTotalIndex] = useState('');


  //for selet box of a perticular index
  const [singleIndex, SetSingleIndex] = useState("1000000000");
  const [filterExp, SetFilterExp] = useState([]);



  useEffect(() => {
    get_dept();
    get_all_expence_type();
    getAllAllocateBudgateData();
  }, []);





  //==================================  ALL  PAGE RELOAD FUNCTIONS START==============================================//

  async function get_dept() {
    var res = await fetch(`${baseUrl}/allocate-budget-dept-list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json()
    //console.log(data);
    SetDepts(data.result.data);
  }






  async function get_all_expence_type() {   //for get all added values to be selected in select box
    var res = await fetch(`${baseUrl}/allocate-budget-exp-type-list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json()
    // console.log(data);
    SetExp_type(data.result.data);
  }





  //----------MAIN LIST OF THAT PAGE-----------//
  async function getAllAllocateBudgateData() {
    //alert(id);
    dispatch(getLodderStatus(true))
    var res = await fetch(`${baseUrl}/allocate-budget-list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json()
    // console.log(data)
    if (data.result.data == "none") {
      SetDynamicData([...arr2, {
        unique_id: '', dept_id: '', exp_type_id: '', from_date: '', to_date: '', amount: '', periodicity: ''
      }]);
      setTimeout(loadDisableFun, 1000);
      function loadDisableFun() {
        $(".disable-class").prop('disabled', false);
      }
    } else {
      SetDynamicData(data.result.data)
      setArr1(data.result.data)
      setArr2(data.result.data)
      setStatus("0")
      SetTotalIndex(data.result.count)
    }
    dispatch(getLodderStatus(false))
  }

  //==================================  ALL  PAGE RELOAD FUNCTIONS END==============================================//
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
  // 
  // 
  // 
  //
  //********************************************* FORM ONCHANGE APIS START ************************************************ */



  //--------DEPT onchange Function For Add--------//
  async function DeptOnchangeFunction(dept_id, index) {
    console.log("for add", dept_id, index);
    $("#exp_type_id" + index).prop('disabled', true);
    var fd = new FormData;
    fd.append("dept_id", dept_id)
    var res = await fetch(`${baseUrl}/allocate-budget-filter-exp-type-list`, {
      method: 'POST',
      body: fd,
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json()
    console.log(data, index);
    $("#exp_type_id" + index).prop('disabled', false);
    SetFilterExp(data.result.data);
    SetSingleIndex(index)
  }






  //--------DEPT onchange Function For Edit--------//
  async function DeptOnchangeFunctionForEdit(dept_id, exp_type_id, index) {
    console.log("for edit", dept_id, exp_type_id, index);
    var fd = new FormData;
    fd.append("dept_id", dept_id)
    fd.append("exp_type_id", exp_type_id)
    var res = await fetch(`${baseUrl}/allocate-budget-filter-exp-type-list-for-edit`, {
      method: 'POST',
      body: fd,
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json()
    console.log(data, index);
    SetFilterExp(data.result.data);
    SetSingleIndex(index)
  }

  //=========================================== ONCHANGE APIS END =======================================================//
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
  // 
  // 
  // 
  // 
  //=================================== ALL PLUS , MINUS, SHOW, HIDE,SUBMIT FUNCTIONS START==================================//

  const dynamicChangeInput = (index, event) => {
    console.log(index, event.target)
    const value = [...arr2];
    console.log(value, value[index][event.target.name]);

    // return false
    value[index][event.target.name] = event.target.value;
    // console.log(value[index]['from_date'],value[index]['to_date'] )

    setArr2(value);
  }






  // const addfun = async (index) => {
  //   const value = [...dynmicdata];
  //   // console.log(value)
  //   // console.log(index)
  //   // console.log(dynmicdata[index])
  //   var beforeIndex = dynmicdata.filter((e, index2) => {
  //     return index2 <= index
  //   })
  //   var AfterIndex = dynmicdata.filter((e, index3) => {
  //     return index3 > index
  //   })
  //   // console.log(beforeIndex)
  //   // console.log(AfterIndex)
  //   var thisIndex = index + 1
  //   //console.log(thisIndex)
  //   if (AfterIndex.length > 0) {
  //     $("#unique_ids" + thisIndex).prop('disabled', false);
  //     $("#dept_id" + thisIndex).prop('disabled', false);
  //     $("#exp_type_id" + thisIndex).prop('disabled', true);
  //     $("#from_date" + thisIndex).prop('disabled', false);
  //     $("#to_date" + thisIndex).prop('disabled', false);
  //     $("#amount" + thisIndex).prop('disabled', false);
  //     $("#periodicity" + thisIndex).prop('disabled', false);
  //   } else {
  //     setTimeout(myGreeting, 1500);
  //     function myGreeting() {
  //       $("#unique_ids" + thisIndex).prop('disabled', false);
  //       $("#dept_id" + thisIndex).prop('disabled', false);
  //       $("#exp_type_id" + thisIndex).prop('disabled', true);
  //       $("#from_date" + thisIndex).prop('disabled', false);
  //       $("#to_date" + thisIndex).prop('disabled', false);
  //       $("#amount" + thisIndex).prop('disabled', false);
  //       $("#periodicity" + thisIndex).prop('disabled', false);
  //     }
  //   }
  //   SetDynamicData([...beforeIndex, { unique_id: '', dept_id: '', exp_type_id: '', from_date: '', to_date: '', amount: '', periodicity: '' }, ...AfterIndex]);
  // }








  //new add function
  function addfunnew() {
    console.log("1")
    // SetsingleAmount(0)
    // setTotalUsers('');
    setArr2([{ unique_id: '', dept_id: '', exp_type_id: '', from_date: '', to_date: '', amount: '', periodicity: '' }, ...arr2])
    let thisIndex = 0;
    setTimeout(myGreeting, 1000);
    function myGreeting() {
    // $(".hidden-input-exp" + 0).show();
    $("#unique_ids" + thisIndex).prop('disabled', false);
    $("#dept_id" + thisIndex).prop('disabled', false);
    $("#exp_type_id" + thisIndex).prop('disabled', true);
    $("#level_name" + thisIndex).prop('disabled', true);
    $("#from_date" + thisIndex).prop('disabled', false);
    $("#to_date" + thisIndex).prop('disabled', false);
    $("#amount" + thisIndex).prop('disabled', false);
    $("#periodicity" + thisIndex).prop('disabled', false);

    $(".hidden-input-exp" + 0).prop('readonly', false);
    }
  }











  const removefun = async (index) => {
    dispatch(getLodderStatus(true))
    //api checking with true false 
    const value = [...arr2];
    console.log(value[index]['dept_id'], value[index]['exp_type_id']);
    if (value[index]['dept_id'] == "" || value[index]['exp_type_id'] == "") {
      // alert(index)
      toast.success("removed the blank form")
      value.splice(index, 1);
      SetDynamicData(value);
      setArr2(value)
      dispatch(getLodderStatus(false))
      return false
    }
    var fd = new FormData;
    fd.append('dept_id', value[index]['dept_id']);
    fd.append('exp_type_id', value[index]['exp_type_id']);
    var res = await fetch(`${baseUrl}/allocate-budget-delete-check`, {
      method: 'POST',
      body: fd,
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json();
    console.log(data);
    if (data.result.status == "false") {
      toast.success("removed")
      value.splice(index, 1);
      SetDynamicData(value);
      setArr2(value)
      dispatch(getLodderStatus(false))
    } else {
      toast.warning("not romoveable")
      //alert('not romoveable')
      dispatch(getLodderStatus(false))
    }
    $(".valid").text('');
    $(".disable-class").prop('disabled', true);
  }







  const Showfun = (index) => {

    const value = [...arr2];
    if ($("#btnToggle" + index).html() == `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path></svg>`) {
      DeptOnchangeFunctionForEdit(value[index]['dept_id'], value[index]['exp_type_id'], index) //api call onchange dept


      $("#unique_ids" + index).prop('disabled', false);
      $("#dept_id" + index).prop('disabled', false);
      $("#exp_type_id" + index).prop('disabled', false);
      $("#from_date" + index).prop('disabled', false);
      $("#to_date" + index).prop('disabled', false);
      $("#amount" + index).prop('disabled', false);
      $("#periodicity" + index).prop('disabled', false);

      $("#add-edit-btn" + index).show();
      $("#btnToggle" + index).hide();
    }
  }














  async function singleInsertOrUpdateFunction(alldata, type, index) {
    console.log(alldata, type, index + 1);  //index+1 is for ordering in backend
    // return false;
    var fd = new FormData;
    if (type == "edit") {
      fd.append("id", alldata.id)
    }
    if (type == "add") {
      fd.append("index_no", index + 1)
    }
    fd.append("unique_id", alldata.unique_id)
    fd.append("dept_id", alldata.dept_id)
    fd.append("exp_type_id", alldata.exp_type_id)
    fd.append("amount", alldata.amount)
    fd.append("from_date", alldata.from_date)
    fd.append("to_date", alldata.to_date)
    fd.append("periodicity", alldata.periodicity)
    fd.append("type", type)
    console.log(Object.fromEntries(fd));
    //  return false;

    dispatch(getLodderStatus(true))
    await axios.post(`${baseUrl}/allocate-budget-add-or-edit`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res)
      if (res.data.result.code == "200") {
        toast.success(res.data.result.message)
        getAllAllocateBudgateData();
        SetSingleIndex("100000000")
        $("#btnToggle" + index).show();
        $("#unique_ids" + index).prop('disabled', true);
        $("#dept_id" + index).prop('disabled', true);
        $("#exp_type_id" + index).prop('disabled', true);
        $("#from_date" + index).prop('disabled', true);
        $("#to_date" + index).prop('disabled', true);
        $("#amount" + index).prop('disabled', true);
        $("#periodicity" + index).prop('disabled', true);

        $("#add-edit-btn" + index).hide();
        // $("#btnToggle" + index).trigger('click')
        // $(".disable-class").prop('disabled', true);
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

  //================================= ALL PLUS , MINUS, SHOW, HIDE, SUBMIT FUNCTIONS END ======================================//
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
  // 
  //
  //================================= FILTER CODE START HERE ======================================//
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
        "type": sectionID,
        "index": optionIDx,
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
          setStatus("0")
          setArr2(arr1);
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
          // dispatch(SetPolicyList(filterData2))
          // SetDynamicData(filterData2)
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
        if (status === "0") {
          const filterData = arr2.filter(item => {
            return Object.keys(item).some(key => {
              // console.log(item[key])
              return item[key].toString().toLowerCase().includes(lowerCaseValue)
            })
          });
          // alert(status)

          setArr2(filterData);
          setStatus("1")


        } else {
          // alert(status)
          const uniqueIds = [];
          const uniqueArray = newArr.filter(element => {
            const isDuplicate = uniqueIds.includes(element.id);
            if (!isDuplicate) {
              uniqueIds.push(element.id);
              return true;
            }
            return false;
          });

          setArr2(uniqueArray);
        }
      }
    }
    console.log(tf)
    console.log(val, optionValue)

  }









  // function handleCross(name) {
  //   console.log(name)
  //   console.log(activeFilters)
  // }







  // part-4
  // const lists= useSelector(state => state.ExpencePolisyListSlice.list);

  function sortFunction(name) {
    console.log(name)
    var nm = "";
    if (name === "Departments") {
      nm = "dept_name";
    }
    else if (name === "Expense Type") {
      nm = "exp_type_name";
    } else {
      nm = "updated_at"
    }


    // dept_name  exp_type_name  updated_at
    if (order === "ASC") {
      const sorted = [...arr2].sort((a, b) =>
        a[nm].toLowerCase() > b[nm].toLowerCase() ? 1 : -1
      );
      // dispatch(SetPolicyList(sorted))
      setArr2(sorted)
      setOrder('DSC')
    } else {
      const sorted = [...arr2].sort((a, b) =>
        a[nm].toLowerCase() < b[nm].toLowerCase() ? 1 : -1
      );
      // dispatch(SetPolicyList(sorted))
      setArr2(sorted)
      setOrder('ASC')
    }

    //change the text color of sort..
    if (name === "Departments") {
      SetSortOptions([
        { name: 'Newest', href: '#', current: false },
        { name: 'Departments', href: '#', current: true },
        { name: 'Expense Type', href: '#', current: false },
      ])
    }
    else if (name === "Expense Type") {
      SetSortOptions([
        { name: 'Newest', href: '#', current: false },
        { name: 'Departments', href: '#', current: false },
        { name: 'Expense Type', href: '#', current: true },
      ])
    } else {
      SetSortOptions([
        { name: 'Newest', href: '#', current: true },
        { name: 'Departments', href: '#', current: false },
        { name: 'Expense Type', href: '#', current: false },
      ])
    }
  }



  //================================= FILTER CODE End  HERE ======================================//

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = e => {
    // console.log(11)
    setIsCheckAll(!isCheckAll);
    setIsCheck(arr2.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, parseInt(id)]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== parseInt(id)));
    }
  };
  console.log(isCheck);



























  return (
    <>

      {/* filter code start here */}
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
                                      {option.label}
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
            <div className="mx-auto flex items-center justify-between sm:px-2 lg:px-4">
              {/* <input
              id="expPolicy-actions-selectAll"
              aria-describedby="expPolicy-actions-selectAll"
              name="expPolicy-actions-selectAll"
              type="checkbox"
              className=" hover:bg-teal-500 h-4 w-4 text-teal-600 border-gray-400 rounded cursor-pointer ring-inset ring-teal-500 md:ring-teal-500 lg:ring-teal-500 focus:ring-0 focus:ring-offset-0"
            /> */}



              <div className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  onChange={handleSelectAll}
                  checked={isCheckAll}
                  className="h-4 w-4 rounded border-gray-400 text-teal-500 focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor="selectAll" className='text-sm font-medium'>Select All</label>
              </div>



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

                  <Menu.Button className="group inline-flex justify-left text-sm font-medium text-gray-700 hover:text-gray-900" >
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
                              {option.name}
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
                  <Menu.Button className="group inline-flex justify-left text-sm font-medium text-gray-700 hover:text-gray-900" >
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

                  <Menu.Items className="origin-top-left absolute left-0 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" >
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
                          <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-0 text-teal-500 ring-black ring-opacity-5 focus:outline-none">
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
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </form>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
                    ))}



                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border border-transparent bg-teal-500 p-1 text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-offset-2"
                      // onClick={() => addfun(1)}
                      onClick={() => {
                        // alert(1)
                        addfunnew()
                      }}
                    >
                      <PlusIconMini className="h-5 w-5" aria-hidden="true" />
                    </button>
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
                Filters
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

                      <span>{activeFilter.label}</span>
                      <button
                        onClick={() => {
                          // console.log(activeFilter.label)
                          // handleCross(activeFilter.label)
                          handleFilterChange(activeFilter.type, activeFilter.index, activeFilter.label)
                        }}
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


      </div>

      {/* filter code end here */}
















































      <div className='px-8'>
        <ClipLoader loading={lodder.status} css={override} size={50} />



        {/*------------------------------ Form start ------------------------------------*/}
        <form className="space-y-8 divide-y divide-gray-200 rounded-md" id="allocateBudgets" >

          {arr2.map((data, index) => (

            <div key={index} >


              {/* ================= NEW CHANGES START ===================== */}

              <div className="flex items-center justify-between gap-4">


                {/* for checkbox */}
                <div className={'px-2 py-4 border-r border-gray-200 flex items-center gridView' + index}>
                  <input
                    key={data.id}
                    type="checkbox"
                    // name={name}
                    id={data.id}
                    onChange={handleClick}
                    checked={isCheck.includes(data.id)}
                    className="h-4 w-4 rounded border-gray-400 text-teal-500 focus:ring-0 focus:ring-offset-0"
                  />
                </div>


                {/* <div className="space-y-2 divide-y divide-teal-200 sm:space-y-2 shadow-md"> */}
                {/* <div className="pt-8 space-y-2 sm:pt-10 sm:space-y-5 shadow-md"> */}
                <div className="inc-dec-div sm:border sm:border-gray-300 p-7 pb-4 mt-4 mx-auto exp-list-form">
                  {/* <h1 className='mb-2 font-black'>No: {index + 1}</h1> */}



                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">{data.dept_name}</span>
                    <span className="inline-flex items-center rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-medium text-cyan-800">{data.exp_type_name}</span>
                  </div>

                  <div className="border-b border-gray-200 bg-white pb-4 mb-4"></div>








                  {/* --------------  ALL INPUT FIELD STARTS HERE ----------------- */}
                  <div className={'gridView' + index}>
                    <div className="lg:grid lg:grid-cols-6 lg:gap-2 mt-4">





                      {/* unique id */}
                      <div className={"mb-3 hidden-input-exp" + index}>
                        <label htmlFor="" className='font-medium text-sm'>Name:</label>
                        <input type="text font-serif" required={true} id={'unique_ids' + index} disabled={true}
                          name="unique_id" placeholder='unique id'
                          value={data.unique_id} onChange={event => dynamicChangeInput(index, event)}
                          className="mx-auto disable-class max-w-lg p-2 block w-full shadow-sm border  focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                        <h1 className='valid' id={"err_uid" + index}></h1>
                      </div>




                      {/* deaertment */}
                      <div className={"mb-3 hidden-input-exp" + index}>
                        <label htmlFor="" className='font-medium text-sm'>Department:</label>
                        <select
                          id={"dept_id" + index}
                          name="dept_id"
                          required={true}
                          disabled={true}
                          onChange={async (event) => {
                            const value = [...dynmicdata];
                            //console.log(value[index]['exp_type_id'])
                            dynamicChangeInput(index, event);
                            { data.id != null ? DeptOnchangeFunctionForEdit(event.target.value, value[index]['exp_type_id'], index) : DeptOnchangeFunction(event.target.value, index) }

                            // DeptOnchangeFunction(event.target.value,index)


                          }}
                          autoComplete="dept_id-name"
                          className="mx-auto disable-class max-w-lg block p-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm rounded-md"
                        >
                          <option value="">Select Dept</option>
                          {
                            depts.map((dept) => {
                              return (
                                <option value={dept.id} key={dept.id} selected={dept.id == data.dept_id ? 'selected' : ''}>{dept.identifier}</option>
                              )
                            })
                          }
                        </select>
                        <h1 className='valid' id={"err_dpt" + index}></h1>
                      </div>











                      {/* Exp types */}
                      <div className={"mb-3 hidden-input-exp" + index}>
                        <label htmlFor="" className='font-medium text-sm'>Exp Types:</label>
                        <select
                          id={"exp_type_id" + index}
                          name="exp_type_id"
                          required={true}
                          disabled={true}
                          onChange={event => dynamicChangeInput(index, event)}
                          autoComplete="exp_type_id-name"
                          className="mx-auto disable-class max-w-lg block p-2 border focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        >
                          {singleIndex == index ?
                            <>
                              <option value="">Select Exp types</option>
                              {
                                filterExp.map((exp) => {
                                  return (
                                    <option value={exp.id} key={exp.id} selected={exp.id == data.exp_type_id ? 'selected' : ''}>{exp.name}</option>
                                  )
                                })
                              }
                            </>
                            :
                            <>
                              <option value="">Select Exp type</option>
                              {
                                exp_type.map((exp) => {
                                  return (
                                    <option value={exp.id} key={exp.id} selected={exp.id == data.exp_type_id ? 'selected' : ''}>{exp.name}</option>
                                  )
                                })
                              }
                            </>}
                        </select>
                        <h1 className='valid' id={"err_exp" + index}></h1>
                      </div>





                      {/* Start Date */}
                      <div className={"mb-3 hidden-input-exp" + index}>
                        <label htmlFor="" className='font-medium text-sm'>Start Date:</label>
                        <input type="date" required={true} id={'from_date' + index} disabled={true}
                          name="from_date" placeholder='from_date' value={data.from_date}
                          onChange={event => dynamicChangeInput(index, event)}
                          className="mx-auto disable-class max-w-lg p-2 block w-full shadow-sm border  focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                        <h1 className='valid' id={"err_fd" + index}></h1>
                      </div>



                      {/* end date */}
                      <div className={"mb-3 hidden-input-exp" + index}>
                        <label htmlFor="" className='font-medium text-sm'>End Date:</label>
                        <input type="date" required={true} id={'to_date' + index} disabled={true}
                          name="to_date" placeholder='to_date' min={data.from_date}
                          value={data.to_date} onChange={event => dynamicChangeInput(index, event)}
                          className="mx-auto disable-class max-w-lg p-2 block w-full shadow-sm border  focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                        <h1 className='valid' id={"err_td" + index}></h1>
                      </div>




                      {/* periodicity */}
                      <div className={"mb-3 hidden-input-exp" + index}>
                        <label htmlFor="" className='font-medium text-sm'>Periodicity:</label>
                        <select
                          id={"periodicity" + index}
                          name="periodicity"
                          required={true}
                          disabled={true}
                          onChange={event => dynamicChangeInput(index, event)}
                          autoComplete="periodicity-name"
                          className="mx-auto disable-class max-w-lg block p-2 border focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select period</option>
                          <option value={'W'} selected={data.periodicity == "W" ? 'selected' : ''} >Weekly</option>
                          <option value={'M'} selected={data.periodicity == "M" ? 'selected' : ''} >Monthly</option>
                          {/* <option value={'Q'} selected={data.periodicity == "Q" ? 'selected' : ''} >Quertly</option> */}
                          <option value={'Y'} selected={data.periodicity == "Y" ? 'selected' : ''} >Yearly</option>
                          {/* <option value={'D'} selected={data.periodicity == "D" ? 'selected' : ''} >Daily</option> */}
                          {/* <option value={'H'} selected={data.periodicity == "H" ? 'selected' : ''} >Half Year</option> */}

                        </select>
                        <h1 className='valid' id={"err_prd" + index}></h1>
                      </div>




                      {/* Amount */}
                      <div className={"mb-3 hidden-input-exp" + index}>
                        <label htmlFor="" className='font-medium text-sm'>Amount:</label>
                        <input type="number" required={true} id={'amount' + index} disabled={true}
                          name="amount" placeholder='amount'
                          value={data.amount} onChange={event => dynamicChangeInput(index, event)}
                          className="mx-auto disable-class max-w-lg p-2 block w-full shadow-sm border  focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                        <h1 className='valid' id={"err_amnt" + index}></h1>
                      </div>


                    </div>
                  </div>


                  <span
                    //type="submit"
                    id={"add-edit-btn" + index}
                    style={{ display: data.id != null ? 'none' : '' }}
                    // disabled={true}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    onClick={(e) => {
                      //alert(1)
                      const value = [...arr2];
                      var sUid = value[index]['unique_id'];
                      var sDept = value[index]['dept_id'];
                      var sExp = value[index]['exp_type_id'];
                      // var sLevel = value[index]['level_name'];
                      var sAmount = value[index]['amount'];
                      var sFrom = value[index]['from_date'];
                      var sto = value[index]['to_date'];
                      var sPeriodicity = value[index]['periodicity'];
                      if (data.id != null) {
                        var type = "edit";
                      } else {
                        var type = "add";
                      }

                      var flag = 0;

                      //validation

                      if (sUid == "") {
                        $("#err_uid" + index).text("enter unique id")
                        flag = 1;
                      } else {
                        $("#err_uid" + index).text("")
                        flag = 0;
                      }

                      if (sDept == "") {
                        $("#err_dpt" + index).text("enter dept")
                        flag = 1;
                      } else {
                        $("#err_dpt" + index).text("")
                        flag = 0;
                      }

                      if (sExp == "") {
                        $("#err_exp" + index).text("enter Exp type")
                        flag = 1;
                      } else {
                        $("#err_exp" + index).text("")
                        flag = 0;
                      }

                      if (sAmount == "") {
                        $("#err_amnt" + index).text("enter amount")
                        flag = 1;
                      } else {
                        $("#err_amnt" + index).text("")
                        flag = 0;
                      }

                      if (sFrom == "") {
                        $("#err_fd" + index).text("enter from date")
                        flag = 1;
                      } else {
                        $("#err_fd" + index).text("")
                        flag = 0;
                      }

                      if (sto == "") {
                        $("#err_td" + index).text("enter to date")
                        flag = 1;
                      } else {
                        $("#err_td" + index).text("")
                        flag = 0;
                      }

                      if (sPeriodicity == "") {
                        $("#err_prd" + index).text("enter Periodicity")
                        flag = 1;
                      } else {
                        $("#err_prd" + index).text("")
                        flag = 0;
                      }


                      if (sUid != "" && sDept != "" && sExp != "" && sAmount != "" && sFrom != ""
                        && sto != "" && sPeriodicity != "") {
                        singleInsertOrUpdateFunction(value[index], type, index);
                      }



                    }}
                  >
                    {data.id != null ? 'Update' : 'Add'}

                  </span>



                </div>
                {/* </div> */}

                <div className={'pl-1 grid border-l gridView' + index} >
                  {dynmicdata.length < 2 ? '' :
                    (<> <span
                      // onClick={() => removefun(index)}
                      onClick={() => { if (window.confirm('Are you sure to delete this record?')) { removefun(index) }; }}
                      className="mr-1 pt-1 pl-1 inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-full text-red-500 hover:bg-red-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >  <BsFillTrashFill />  </span>
                    </>)}

                  {/* -- increament/decreament button end --  */}

                  {/* show hide button start */}
                  {data.id != null ? <>
                    <span id={"btnToggle" + index} onClick={() => Showfun(index)}
                      className="mb-1 mr-1 pt-1 pl-1 inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-full text-black hover:bg-teal-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    ><BsFillPencilFill /></span>

                  </> : ''}
                </div>
                {/* show hide button end */}

              </div>

              {/* ================= NEW CHANGES CLOSED ===================== */}

            </div>
            // </div>
          ))}


          {/* <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                      Submit
                    </button>

                  </div>
                </div> */}
        </form>


      </div>
    </>
  )
}

export default AllocateBudgets