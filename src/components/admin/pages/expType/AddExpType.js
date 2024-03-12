import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import $ from "jquery";
import axios from 'axios';
import { toast } from "react-toastify";
import { getModalStatus, setModalNo } from '../../../../redux/adminSlices/modalSlice';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const AddExpType = () => {

  const [name, setName] = useState("")
  const [depts, setDepts] = useState([])
  const [deptId, setDeptId] = useState("")

  const navigate = useNavigate();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const dispatch = useDispatch();
  //for dynamic form
  const [dynmicdata, SetDynamicData] = useState([{
    key: '', value: 'text', 'required_type': 'optional',
  }])

  useEffect(() => {
    //validations
    $("#addExpType").validate({
      rules: {
        addExpType: {
          required: true,
        },
        dpt: {
          required: true,
        }
      }
    });

    getDepts();
  }, []);



  //api call for getting all the dept under that login admin
  async function getDepts() {
    // return false
    return axios.get(`${baseUrl}/exp-type-dept-list`, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res)
      if (res.data.result.code == "200") {
        setDepts(res.data.result.allDeptsUnderAdmin)
      } else {
        console.log(res.data.result.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }









  //dynamic  part
  const dynamicChangeInput = (index, event) => {
    const value = [...dynmicdata];
    value[index][event.target.name] = event.target.value;
    SetDynamicData(value);
  }





  const addfun = () => {
    SetDynamicData([...dynmicdata, { key: '', value: 'text', 'required_type': 'optional' }]);
  }





  const removefun = (index) => {
    const value = [...dynmicdata];
    value.splice(index, 1);
    SetDynamicData(value);
  }









  const handleSubmit = async (event) => {
    event.preventDefault();
    var fd = new FormData;
    fd.append("dept_id", deptId);
    fd.append("name", name);
    fd.append("dynamicDatas", JSON.stringify(dynmicdata));
    //  console.log(Object.fromEntries(fd));
    //  return false
    return axios.post(`${baseUrl}/exp-type-add`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res)
      if (res.data.result.code == "200") {
        toast.success(res.data.result.message);
        setName("")
        dispatch(setModalNo(0))
        dispatch(getModalStatus(false))
      } else {
        toast.error(res.data.result.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }













  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="modal-heading">Add Expence Type</h1>
      </div>
      <ClipLoader loading={lodder.status} css={override} size={50} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        <div className="py-4">
          {/* -- dynamic part with form --  */}
          <form className="space-y-8 divide-y divide-gray-200" id="addExpType" onSubmit={handleSubmit}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">




              <div className="sm:items-start">
                <label htmlFor="dpt" className="block text-xs font-medium text-gray-400 sm:pt-2">
                  Select Dept.
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    name="dpt"
                    id="dpt"
                    onChange={async (e) => {
                      setDeptId(e.target.value);
                    }}


                    autoComplete="dpt-name"
                    className="p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                  >
                    <option value={deptId}>Select Department</option>
                    {
                      depts.map((dept) => (
                        <option value={dept.id} key={dept.id}>{dept.identifier}</option>
                      ))
                    }
                  </select>
                </div>
              </div>






              <div className="space-y-6 sm:space-y-5">
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="sm:items-start">
                      <label htmlFor="name" className="block text-xs font-medium text-gray-400 sm:pt-2">
                        Name<sup className='starmark'>*</sup>
                      </label>
                      <div className="mt-1 sm:mt-0">
                        <input
                          type="text"
                          name="addExpType"
                          id="addExpType"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="given-name"
                          className="p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                        />
                      </div>
                    </div>
                    <div></div>
                  </div>

                </div>
              </div>



            </div>


            {/* dynamic data */}
            <div>
              <h3 className="text-md mt-5 leading-6 text-gray-900">Dynamic Data</h3>
            </div>
            <div>
              {dynmicdata.map((data, index) => (

                <div key={index} className="sm:flex sm:gap-3 mt-5 sm:items-center justify-evenly">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-400 sm:pt-2">
                      Input Field
                    </label>
                    <input type="text" name="key" value={data.key} onChange={event => dynamicChangeInput(index, event)} placeholder="Key"
                      className="max-w-lg my-2 p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300"
                    />
                  </div>


                  <div className="sm:items-start">
                    <label htmlFor="dpt" className="block text-xs font-medium text-gray-400 sm:pt-2">
                      Input Type
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <select
                        name="value"
                        onChange={event => dynamicChangeInput(index, event)}
                        className="dynamic-select-box p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                      >
                        <option value={'text'} key={'text'} selected>Text</option>
                        <option value={'integer'} key={'integer'}>Integer</option>
                        <option value={'float'} key={'float'}>Float</option>
                        <option value={'number'} key={'number'}>Number</option>
                        <option value={'tiny-text'} key={'tiny-text'}>Tiny-text</option>
                      </select>
                    </div>
                  </div>


                  <div className="sm:items-start">
                    <label htmlFor="dpt" className="block text-xs font-medium text-gray-400 sm:pt-2">
                      Required Type
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <select
                        name="required_type"
                        onChange={event => dynamicChangeInput(index, event)}
                        className="dynamic-select-box p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                      >
                        <option value={'optional'} key={'optional'} selected >Optional</option>
                        <option value={'required'} key={'required'} >Required</option>
                      </select>
                    </div>
                  </div>


                  {/* add icon with condition start*/}
                  {dynmicdata.length < 2 ? (<>

                    <span onClick={() => addfun()}
                      className="cursor-pointer ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
                    >  +  </span>
                    {/* <span onClick={()=>removefun(index)}>  -  </span> */}

                  </>)
                    :
                    (<div>

                      <span onClick={() => addfun()}
                        className="cursor-pointer ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
                      >  +  </span>
                      <span onClick={() => removefun(index)}
                        className="cursor-pointer ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
                      >  -  </span>

                    </div>)}
                  {/* add icon with condition end */}

                </div>
              ))}
            </div>


            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center border border-gray-200 px-8 py-1 text-xs text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto"
                >
                  Save
                </button>

              </div>
            </div>
          </form>
          {/* -- closed --    */}
        </div>
      </div>
    </>
  )
}

export default AddExpType