import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { setDeptSlice } from '../../../../redux/adminSlices/deptAddSlice'
import { useNavigate } from 'react-router-dom';
import { DEPT_GET, DELETE_DEPT_BY_ID } from '../../../../redux/type';
import { useDispatch, useSelector } from 'react-redux'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { getLodderStatus } from '../../../../redux/adminSlices/lodderSlice';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaEdit, FaMaxcdn } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import $ from "jquery";
import validate from 'jquery-validation'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;


const DeptList = () => {

  const navigate = useNavigate();
  const lodder = useSelector(state => state.lodderSlice);
  const rows = useSelector(state => state.deptAddSlice.allData)
  const editData = useSelector(state => state.deptAddSlice)
  const dispatch = useDispatch();


  console.log(rows)
  useEffect(() => {
    dispatch({ type: DEPT_GET });
  }, [])


  return (
    <>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Department List</h1>
          </div> */}
      <ClipLoader loading={lodder.status} css={override} size={50} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {/* -- dynamic par --  */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                {/* <h1 className="text-xl font-semibold text-gray-900">Department list</h1> */}
                {/* <p className="mt-2 text-sm text-gray-700">
                      A list of all the users in your account including their name, title, email and role.
                    </p> */}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link
                  to="/departments/add"
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Add Department
                </Link>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Short Description
                          </th>

                          <th scope="col" className="relative text-left py-3.5 pl-3 pr-4 sm:pr-6">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {rows.map((person) => (
                          <tr key={person.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <div className="font-medium text-gray-900">{person.identifier}</div>
                                </div>
                                <div className="ml-4">
                                  {/* <div className="font-medium text-gray-900">{person.identifier}</div> */}

                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.dept_desc.desc}</td>

                            <td className="sm:flex sm:items-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">

                              <button onClick={() => {
                                if (window.confirm('Delete the item?')) {

                                  dispatch({ type: DELETE_DEPT_BY_ID, id: person.id })
                                }
                              }}
                                className="text-red-500 pr-3 py-4"
                              >
                                <BsFillTrashFill />
                              </button>

                              <Link to={"/departments/edit/" + person.id} className="text-green-600 px-3 py-4"><FaEdit /></Link>

                              <Link to={"/departments/view/" + person.id} className="text-violet-700 sm:mr-3 py-4"><AiOutlineEye /></Link>


                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* -- closed --    */}
        </div>
      </div>
    </>
  )
}

export default DeptList