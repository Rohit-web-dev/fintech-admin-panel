import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { getLodderStatus } from '../../../../../redux/adminSlices/lodderSlice';
import { toast } from "react-toastify";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

function PolicyUserList(props) {

  const dispatch = useDispatch();
  const param = useParams();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const [list, Setlist] = useState([]);

  useEffect(() => {
    getAllUserUnderAPolicy();
  }, [props.listStatus]);

// console.log(props.listStatus)
  async function getAllUserUnderAPolicy() {
    // console.log(111111111111)
    dispatch(getLodderStatus(true))
    var fd = new FormData;
    fd.append("policy_id", props.id)
    await axios.post(`${baseUrl}/expence-policy-userlist`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res)
      if (res.data.result.code == "200") {
        Setlist(res.data.result.totalUser)
      } else {
        toast.error(res.data.result.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
    dispatch(getLodderStatus(false))
  }



  return (
    <>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">user list under policy id :{param.id}</h1>
      </div> */}
      {/* <ClipLoader loading={lodder.status} css={override} size={50} /> */}
      <div className="max-w-7xl mx-auto overflow-auto explistsh">
        <div className="py-4">
          {/* -- list part --  */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">

              </div>
              {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link
                  to="/budgets/expence-policy/manage"
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  back
                </Link>
              </div> */}
            </div>
            <div className="mt-2 flex flex-col">
              <div className="my-2 mx-4 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            User Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Email
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            dept name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            level name
                          </th>

                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Expense type
                          </th>

                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Total Amount
                          </th>
                          <th scope="col" className="relative py-3.5 text-left pl-3 pr-4 sm:pr-6">
                            Invested Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {list.map((l) => (
                          <tr key={l.userId}>
                            <td className="whitespace-nowrap py-3.5 pl-6 pr-3 text-sm text-gray-500">{l.user_details.name}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{l.user_details.email}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{l.user_details.dept_details.identifier}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{l.user_details.level}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{l.expTypeName}</td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{l.user_amount}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{l.TotalAmountSpent}</td>
                         {/* total_invested */}
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

export default PolicyUserList