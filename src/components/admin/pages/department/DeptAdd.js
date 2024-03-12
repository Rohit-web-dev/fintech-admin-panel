import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setDeptSlice } from '../../../../redux/adminSlices/deptAddSlice'
import { useNavigate } from 'react-router-dom';
import { DEPT_SUBMIT, DEPT_GET_CLONE } from '../../../../redux/type';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import $ from "jquery";
import validate from 'jquery-validation'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const DeptAdd = () => {

  const navigate = useNavigate();
  const lodder = useSelector(state => state.lodderSlice);
  const initialData = useSelector(state => state.deptAddSlice)
  const dispatch = useDispatch();
  //for dynamic form
  const [dynmicdata, SetDynamicData] = useState([{
    key: '', value: ''
  }])

  useEffect(() => {

    //validations
    $("#frm").validate({
      rules: {
        name: {
          required: true,
        },
        // limit: {
        //   required: true,
        // },
        ldesc: {
          required: true,
          minlength: 6,
          //maxlength:10,
        },
        sdesc: {
          required: true,
          minlength: 6,
        },
      }
    });



    dispatch(setDeptSlice({
      name: "",
      //is_top: "",
      sdesc: "",
      ldesc: "",
      //limit: "",
      allData: [],
    }))
    dispatch({ type: DEPT_GET_CLONE });
  }, [])



  const handleChange = (prop) => (event) => {
    const aaaa = dispatch(setDeptSlice({ ...initialData, [prop]: event.target.value }))
  }

  //dynamic 
  const dynamicChangeInput = (index, event) => {
    const value = [...dynmicdata];
    value[index][event.target.name] = event.target.value;
    SetDynamicData(value);
  }

  const addfun = () => {
    SetDynamicData([...dynmicdata, { key: '', value: '' }]);
  }

  const removefun = (index) => {
    const value = [...dynmicdata];
    value.splice(index, 1);
    SetDynamicData(value);
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: DEPT_SUBMIT, initialData: { ...initialData, navigate: navigate, dynamicData: dynmicdata } })
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* <h1 className="text-2xl font-semibold text-gray-900">Department Add</h1> */}
        {/* Back Button */}
        {/* <Link to={"/departments"} className="text-green-600 px-3 py-4">Back</Link> */}


      </div>
      <ClipLoader loading={lodder.status} css={override} size={50} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">


        {/* -- back btn --  */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            {/* <h1 className="text-2xl font-semibold text-gray-900">Department Add</h1> */}
          </div>
          {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link to={"/departments"}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                ><span className='text-white'>Back</span></Link>
              </div> */}
        </div>



        <div className="py-4">
          {/* -- dynamic part with form --  */}
          <form className="space-y-8 divide-y divide-gray-200" id="frm" onSubmit={handleSubmit}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">

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
                          name="name"
                          id="name"
                          required
                          value={initialData.name} onChange={handleChange('name')}
                          autoComplete="given-name"
                          className="p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                        />
                      </div>
                    </div>
                    <div></div>
                  </div>

                  <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="grid-modal-form sm:items-start">
                      <label htmlFor="sdesc" className="block text-xs font-medium text-gray-400 sm:mt-px sm:pt-2">
                        Short Desc<sup className='starmark'>*</sup>
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea
                          id="sdesc"
                          name="sdesc"
                          rows={3}
                          value={initialData.sdesc} onChange={handleChange('sdesc')}
                          className="p-2 shadow-sm block w-full sm:text-sm border border-gray-200"
                        />
                      </div>
                    </div>

                    <div className="grid-modal-form sm:items-start">
                      <label htmlFor="ldesc" className="block text-xs font-medium text-gray-400 sm:mt-px sm:pt-2">
                        Long Desc<sup className='starmark'>*</sup>
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea
                          id="ldesc"
                          name="ldesc"
                          rows={3}
                          value={initialData.ldesc} onChange={handleChange('ldesc')}
                          className="p-2 shadow-sm block w-full sm:text-sm border border-gray-200"
                        />
                      </div>
                    </div>
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
                  <input type="text" name="key" value={data.key} onChange={event => dynamicChangeInput(index, event)} placeholder="Key"
                    className="max-w-lg my-2 p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300"
                  />

                  <input type="text" name="value" value={data.value} onChange={event => dynamicChangeInput(index, event)} placeholder="value"
                    className="max-w-lg my-2 p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300"
                  />


                  {/* add icon with condition start*/}
                  {dynmicdata.length < 2 ? (<>

                    <span onClick={() => addfun()}
                      className="cursor-pointer ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
                    >  +  </span>
                    {/* <span onClick={()=>removefun(index)}>  -  </span> */}

                  </>)
                    :
                    (<>

                      <span onClick={() => addfun()}
                        className="cursor-pointer ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
                      >  +  </span>
                      <span onClick={() => removefun(index)}
                        className="cursor-pointer ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
                      >  -  </span>


                    </>)}
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

export default DeptAdd