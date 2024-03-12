import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { css } from "@emotion/react";
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";
import $ from "jquery";
import validate from 'jquery-validation'
import { BsFillTrashFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { toast } from "react-toastify";
import axios from "axios";
import { getLodderStatus } from '../../../../redux/adminSlices/lodderSlice';
import { setDeptLevelFunds } from '../../../../redux/adminSlices/DeptLevelFund';
import { setLevelList } from '../../../../redux/adminSlices/deptLevelList';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const LevelList = (props) => {

  const dispatch = useDispatch()
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  // const [list, setList] = useState([]);
  const list = useSelector(state => state.deptLevelList.Levellist);


  const dept_id = props.DeptId;
  const deptname = props.name;

  useEffect(() => {
    getAllLevelData();
  }, [])

  async function getAllLevelData() {
    dispatch(getLodderStatus(true))
    var fd = new FormData;
    fd.append("dept_id", dept_id);
    await axios.post(`${baseUrl}/dept-leve-child-list`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.result.code == "200") {

        dispatch(setLevelList(res.data.result.data))
        dispatch(getLodderStatus(false))
      } else {
        toast.error(res.data.result.message);
        dispatch(getLodderStatus(false))
      }
    })
      .catch((err) => {
        console.log(err);
        dispatch(getLodderStatus(false))
      });
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">All level Details of Deptartment: {deptname}</h1>
      </div>
      <ClipLoader loading={lodder.status} css={override} size={50} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {/* -- dynamic par --  */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                {/* <h1 className="text-xl font-semibold text-gray-900">Users</h1> */}
                {/* <p className="mt-2 text-sm text-gray-700">
                      A list of all the users in your account including their name, title, email and role.
                    </p> */}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link
                  to="/level-limit/add"
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Add levels
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

                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Deptartment Name
                          </th>

                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Level
                          </th>

                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Level Limit
                          </th>

                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Order
                          </th>

                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {list.map((list) => (
                          <tr key={list.id} >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="text-gray-900">{list.dept_details.identifier}</div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-500">{list.dept_level_limits.level_limit}</div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900">{list.level}</div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-500">{list.is_top == "1" ? 'Sub Admin' : ''}</div>
                            </td>
                            <td className="sm:flex sm:items-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <button onClick={async () => {
                                if (window.confirm('Delete the item?')) {
                                  dispatch(getLodderStatus(true))
                                  var fd = new FormData;
                                  fd.append('dept_level_id', list.id)
                                  var res = await fetch(`${baseUrl}/dept-level-limit-delete`, {
                                    method: 'POST',
                                    body: fd,
                                    headers: {
                                      'Authorization': `Bearer ` + localStorage.getItem('token')
                                    }
                                  });
                                  var data = await res.json();
                                  console.log(data.result)
                                  if (data.result.code == 200) {
                                    toast.success(data.result.message);
                                    dispatch(setDeptLevelFunds(data.result.funds)); //to set funds
                                    getAllLevelData();
                                  } else {
                                    toast.error(data.result.message);
                                    console.log(data.result.message);
                                  }
                                  dispatch(getLodderStatus(false))

                                }
                              }}
                                className="text-red-500 pr-3 py-4">
                                <BsFillTrashFill />
                              </button>
                              <Link to={"/departments/levels/edit/" + list.id} className="text-green-600 px-3 py-4"><FaEdit /></Link>
                              {/* <Link to={"/deptview/"+person.id} className="text-violet-700 pl-3 py-4"><AiOutlineEye /></Link>
                                 */}
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

export default LevelList