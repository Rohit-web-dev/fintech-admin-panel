import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { getLodderStatus } from '../../../../redux/adminSlices/lodderSlice';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const CardMngList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const [list, SetList] = useState([]);

  useEffect(() => {
    getMasterLists();
  }, []);

  async function getMasterLists() {
    dispatch(getLodderStatus(true))

    await axios.get(`${baseUrl}/card-list-master`, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      //console.log(res)
      if (res.data.result.code == "200") {
        SetList(res.data.result.master_lists)
        dispatch(getLodderStatus(false))
      } else {
        toast.error(res.data.result.message);
        dispatch(getLodderStatus(false))
      }
    })
      .catch((err) => {
        console.log(err);
        //toast.error(err.data.result.message);
        dispatch(getLodderStatus(false))
      });
  }




  return (
    <>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Employee Card List</h1>
          </div> */}
      <ClipLoader loading={lodder.status} css={override} size={50} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-2">
          {/* -- list part --  */}
          <div className="px-4 sm:px-6 lg:px-4">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">

              </div>
              <div className="mt-2 sm:mt-0 sm:ml-12 sm:flex-none">
                <Link
                  to="/card-mng/add"
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Add Cards
                </Link>
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Employee Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Dept Name
                          </th>

                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Total Cards
                          </th>
                          <th scope="col" className="relative py-3.5 text-left pl-3 pr-4 sm:pr-6">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {list.map((l) => (
                          <tr key={l.userId}>
                            <td className="whitespace-nowrap py-3.5 pl-6 pr-3 text-sm text-gray-500">{l.UserName}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{l.DeptName}</td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{l.TotalCards}</td>
                            <td className="sm:flex sm:items-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <Link to={"/card-mng/view/" + l.userId} className="text-violet-700 pl-3 py-4"><AiOutlineEye /></Link>
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

export default CardMngList