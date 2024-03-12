import React from 'react'
import { Link } from 'react-router-dom';
import { DEPT_EDIT, DEPT_GET_SINGLE, DEPT_GET_CLONE } from '../../../../redux/type';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setDeptSlice } from '../../../../redux/adminSlices/deptAddSlice'
import { useNavigate } from 'react-router-dom';
import { getLodderStatus } from '../../../../redux/adminSlices/lodderSlice';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const DeptView = () => {

  const param = useParams();
  const lodder = useSelector(state => state.lodderSlice);
  const initialData = useSelector(state => state.deptAddSlice)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const keyValBaseUrl = useSelector(state => state.keyValSlice.url)


  //for dynamic data
  const [dynmicdata, SetDynamicData] = useState([])

  useEffect(() => {
    dispatch(setDeptSlice({
      name: "",
      is_top: "",
      sdesc: "",
      ldesc: "",
      limit: "",
      allData: [],
    }))
    dispatch({ type: DEPT_GET_CLONE });
    getKeyValueFun(param.id);
    dispatch({ type: DEPT_GET_SINGLE, initialData: { id: param.id, } });
  }, [])


  async function getKeyValueFun(id) {
    var fd = new FormData;
    fd.append("id", param.id);
    var res = await fetch(`${keyValBaseUrl}/dept-get-keyval`, {
      method: 'POST',
      body: fd
    });
    var data = await res.json()
    if (data.result.data == "none") {
      SetDynamicData([...dynmicdata]);
    } else {
      SetDynamicData(data.result.data)
    }
  }


  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* <h1 className="text-2xl font-semibold text-gray-900">Department View</h1> */}

      </div>
      <ClipLoader loading={lodder.status} css={override} size={50} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {/* -- dynamic par --  */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">

            <div className="sm:flex sm:items-center px-4 py-5 sm:px-6">
              <div className="sm:flex-auto">
                {/* <p className="mt-2 text-sm text-gray-700">
                      A list of all the users in your account including their name, title, email and role.
                    </p> */}
              </div>

              <div className="my-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: DEPT_GET_CLONE });
                    //navigate("/deptlist")
                    // dispatch(getLodderStatus(true));
                    setTimeout(function (t) {
                      navigate("/management#tab_departments");
                      //dispatch(getLodderStatus(false));

                    }, 1000, this);
                  }}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Back
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{initialData.name}</dd>
                </div>
                {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Order</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{initialData.is_top == "1" ? 'Top Category' : 'Bottom Category'}</dd>
                    </div> */}
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Short Desc</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {initialData.sdesc}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Long Desc</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {initialData.ldesc}
                  </dd>
                </div>


                <div>

                  <div>
                    <h3 className="text-lg ml-5 mt-5 leading-6 font-medium text-gray-900">Dynamic Data</h3>
                  </div>
                  <div>


                    {dynmicdata.map((data, index) => (

                      <div key={index} className="sm:flex mt-5 sm:items-center justify-evenly">

                        <input type="text" name="key_name" value={data.key_name} placeholder="Key" disabled
                          className="max-w-lg my-2 p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                        <span>{' < ----- >'}</span>

                        <input type="text" name="value" value={data.value} placeholder="Value" disabled
                          className="max-w-lg my-2 p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />




                      </div>
                    ))}
                  </div>

                </div>
              </dl>
            </div>
          </div>
          {/* -- closed --    */}
        </div>
      </div>
    </>
  )
}

export default DeptView