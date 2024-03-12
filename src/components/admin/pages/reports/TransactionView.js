import React, { useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

function TransactionView() {

  const [tamount, setTamount] = useState("")
  const [recipt, setRecipt] = useState("")
  const [expDate, setExpDate] = useState("")
  const [expPolicy, setExpPolicy] = useState("")
  const [expType, setExpType] = useState("")
  const [status, setStatus] = useState("")
  const [reportId, setReportId] = useState("")
  const [transId, setTransId] = useState("")



  const [dynmicdata, SetDynamicData] = useState([])

  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const param = useParams();

  useEffect(() => {
    getData()
    console.log(param.id);
  }, [])


  async function getData() {
    var fd = new FormData;
    fd.append("id", param.id);
    await axios.post(`${baseUrl}/child-report-transaction-details-view`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res)
      if (res.data.result.code == "200") {
        // console.log(res.data.result.message)
        setTransId(res.data.result.data.id)
        setTamount(res.data.result.data.transaction_amount)
        setRecipt(res.data.result.data.link_of_recipt)
        setExpDate(res.data.result.data.date_of_expence)
        setExpPolicy(res.data.result.data.expence_policy_details.unique_id)
        setExpType(res.data.result.data.expence_policy_details.exp_type_details.name)
        if (res.data.result.data.status == "RR") {
          setStatus("Revision Required")
        } else if (res.data.result.data.status == "RJ") {
          setStatus("Rejected")
        }
        else if (res.data.result.data.status == "AP") {
          setStatus("Aproved")
        } else {
          setStatus("Submitted")
        }
        setReportId(res.data.result.data.child_report_model_details.report_id)
        SetDynamicData(res.data.result.data.exp_dynamic_data_filled_by_user)
      } else {
        console.log(res.data.result.data.message);
      }
    })
      .catch((err) => {
        console.log(err);
        //toast.error(err.data.result.data.message);
      });
      console.log(tamount);
  }

  return (
    <>
      <ClipLoader loading={lodder.status} css={override} size={50} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {/* -- dynamic par --  */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="flex items-center px-4 sm:px-3">
              <div className="sm:flex-auto mb-3">
                <h3 className="text-lg ml-5 mt-5 leading-6 font-medium text-gray-900">Full Details of Transaction id: {transId}</h3>
              </div>
              <div className="my-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link
                  to='/report'
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Back
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Transaction Amount:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tamount}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Link of Receipt:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {recipt}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date of Experiance:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {expDate}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Experiance Policy Name:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {expPolicy}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Experiance Type:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {expType}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {status}
                  </dd>
                </div>
                <div>

                  {/* -- dynamic data --  */}
                  <div>
                    <h3 className="text-lg ml-5 mt-5 leading-6 font-medium text-gray-900">Dynamic Data</h3>
                  </div>
                  <div>

                    {
                      dynmicdata.map((e) => {
                        return (
                          <div key={e.id} className="sm:flex mt-5 sm:items-center justify-evenly">
                            <input type="text" name="key_name" value={e.key_field} placeholder="Key" disabled
                              className="max-w-lg my-2 p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                            <span>{' < ----- >'}</span>
                            <input type="text" name="value" value={e.value} placeholder="Value" disabled
                              className="max-w-lg my-2 p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        )
                      })

                    }


                  </div>
                </div>
                <div>
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

export default TransactionView