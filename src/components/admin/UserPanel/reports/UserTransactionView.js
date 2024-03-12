import React, { useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { GiTireIronCross } from 'react-icons/gi';



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

function UserTransactionView() {

  const [tamount, setTamount] = useState("")
  const [recipt, setRecipt] = useState("")
  const [expDate, setExpDate] = useState("")
  const [expPolicy, setExpPolicy] = useState("")
  const [expType, setExpType] = useState("")
  const [status, setStatus] = useState("")
  const [reportId, setReportId] = useState("")
  const [transId, setTransId] = useState("")
  const [periodicViolation, setPeriodicViolation] = useState("")
  const [tlViolation, setTlViolation] = useState("")

  const [policyHistory, setpolicyHistory] = useState({
    "id": '',
    "expense_policy_id": '',
    "admin_id": '',
    "unique_id": "",
    "dept_name": "",
    "exp_type_name": "",
    "level_name": "",
    "users_total_amount": "",
    "total_user": '',
    "amount_per_user": "",
    "amount_per_transaction": "",
    "periodicity": "",
    "from_date": "",
    "to_date": "",
    "created_at": "",
    "updated_at": "",
    "random_id": ""
  });


  console.log(policyHistory);

  const [voilatedDatas, setvoilatedDatas] = useState([])
  const [investedAmount, setinvestedAmount] = useState('')

  const [dynmicdata, SetDynamicData] = useState([])

  //report details
  const [report, setReport] = useState("")
  const [reportdynmicdata, SetreportDynamicData] = useState([])

  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const param = useParams();

  useEffect(() => {
    getData()
    console.log(param.id);
    getExpPolicyHistory();
    // getPeriodicViolationData();
  }, [])


  useEffect(() => {
    getPeriodicViolationData();
  }, [transId])






  async function getData() {
    var fd = new FormData;
    fd.append("id", param.id);
    await axios.post(`${baseUrl}/user-child-report-transaction-details-view`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res)
      if (res.data.result.code == "200") {
        console.log(res.data.result.message)
        setTransId(res.data.result.data.id)
        setTamount(res.data.result.data.transaction_amount)
        setRecipt(res.data.result.data.link_of_recipt)
        setExpDate(res.data.result.data.date_of_expence)
        setExpPolicy(res.data.result.data.expence_policy_details.unique_id)
        setExpType(res.data.result.data.expence_policy_details.exp_type_details.name)
        setTlViolation(res.data.result.data.is_per_periodicity_amount_voilation)
        setPeriodicViolation(res.data.result.data.is_per_transaction_amount_violation)
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
        setReport(res.data.result.data.child_report_model_details.master_report_details.report_name)
        SetreportDynamicData(res.data.result.data.child_report_model_details.master_report_details.dynamic_filled_by_user)

      } else {
        console.log(res.data.result.message);
      }
    })
      .catch((err) => {
        console.log(err);
        //toast.error(err.data.result.data.message);
      });
    console.log(tamount);
  }







  async function getExpPolicyHistory() {
    var fd = new FormData;
    fd.append("id", param.id);
    await axios.post(`${baseUrl}/transaction-to-policy-details`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      //console.log(res)
      if (res.data.result.code == "200") {
        setpolicyHistory(res.data.result.exp_policy_history)
        // console.log(policyHistory)
      } else {
        setpolicyHistory({
          "id": '',
          "expense_policy_id": '',
          "admin_id": '',
          "unique_id": "",
          "dept_name": "",
          "exp_type_name": "",
          "level_name": "",
          "users_total_amount": "",
          "total_user": '',
          "amount_per_user": "",
          "amount_per_transaction": "",
          "periodicity": "",
          "from_date": "",
          "to_date": "",
          "created_at": "",
          "updated_at": "",
          "random_id": ""
        })
      }

    })
      .catch((err) => {
        console.log(err);
        // toast.error(err.data.result.data.message);
      });

  }






  async function getPeriodicViolationData() {
    if (transId != "") {
      // alert(1)
      getImage(transId);

      var fd = new FormData;
      fd.append("transaction_id", transId);
      await axios.post(`${baseUrl}/periodic-violation-all-week-transaction`, fd, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      }).then((res) => {
        console.log(res)
        if (res.data.result.code == "200") {
          setvoilatedDatas(res.data.result.all_transactions_under_that_week)
          setinvestedAmount(res.data.result.totalWeekAmount)
          // console.log(policyHistory)
        }

      })
        .catch((err) => {
          console.log(err);
          // toast.error(err.data.result.data.message);
        });


    }
  }


  const [img, SetImg] = useState();
  async function getImage(data) {
    console.log(data);
    var obj = {
      folder_name: "restaurant-receipt",
      // file_name:`${data}.jpg`
      file_name: `420.jpg`
    }
    await axios.post("https://serve.w3sigma.in/client/image", obj).then((res) => {
      console.log(res)
      SetImg(res.data.image_base64)

    })
      .catch((err) => {
        console.log(err);
        // toast.error(err.data.result.data.message);
      });
  }


  // -- modal img func -- 

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  // -- modal img func -- 





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
              {/* {img} */}


              <div className="my-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link
                  to='/reports'
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
                  <dt className="text-sm font-medium text-gray-500">Report Name:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report}</dd>
                </div>



                <h1>Report Dynamic Datas</h1>
                {
                  reportdynmicdata.map((e) => {
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

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">periodic violation Status:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {periodicViolation == "Y" ? 'Yes' : 'No'}
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">per transaction limit violation Status:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {tlViolation == "Y" ? 'Yes' : 'No'}
                  </dd>
                </div>
                <div>

                <div>
                    <h3 className="text-lg ml-5 mt-5 leading-6 font-medium text-gray-900">Receipt</h3>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className='w-36 px-4 py-4 ml-3'>
                      {img == "E" ? (<>recipt not Uploaded</>) : (<>  <img src={"data:image/jpg;base64," + img} /> </>)}
                    </div>
                  </div>
                  <button onClick={openModal} className='inline-flex px-2 mb-4 ml-8 items-center border border-transparent bg-teal-500 p-1 text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-offset-2'>View Image</button>

                  {/* modal for image */}
                  <div>

                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                    <div className='absolute right-2 top-2 w-100 px-2 py-2 bg-white flex justify-end'>
                      <button onClick={closeModal} className=''><GiTireIronCross /></button>
                      </div>
                      {img == "E" ? (<>recipt not Uploaded</>) : (<>  <img src={"data:image/jpg;base64," + img} /> </>)}
                    </Modal>
                  </div>
                  {/* modal for image */}

<hr/>
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








                    {/* ------------------------------------------------------------------------------------- */}


                    <div>
                      <h3 className="text-lg ml-5 mt-5 leading-6 font-medium text-gray-900">Policy history details at transaction create time</h3>
                    </div>
                    <div className="inc-dec-div sm:border sm:border-gray-300 p-7 pb-4 mt-4 mb-4 mx-auto mx-4">

                      <div className={'gridView'}>
                        <div className="lg:grid lg:grid-cols-4 lg:gap-2">
                          {policyHistory.id == '' ? (<>No expense policy history found because of old data.try with new transaction.</>) : (<>

                            <div className="sm:flex gap-2">
                              <dt className="text-sm font-medium capitalize text-gray-500">policy Id:</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">{policyHistory.id}</dd>
                            </div>
                            <div className="sm:flex gap-2">
                              <dt className="text-sm font-medium capitalize text-gray-500">unique id:</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">{policyHistory.unique_id}</dd>
                            </div>
                            <div className="sm:flex gap-2">
                              <dt className="text-sm font-medium capitalize text-gray-500">dept name:</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">{policyHistory.dept_name}</dd>
                            </div>
                            <div className="sm:flex gap-2">
                              <dt className="text-sm font-medium capitalize text-gray-500">exp type name:</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">{policyHistory.exp_type_name}</dd>
                            </div>
                            <div className="sm:flex gap-2">
                              <dt className="text-sm font-medium capitalize text-gray-500">level name:</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">{policyHistory.level_name}</dd>
                            </div>
                            <div className="sm:flex gap-2">
                              <dt className="text-sm font-medium capitalize text-gray-500">amount per transaction:</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">{policyHistory.amount_per_transaction}</dd>
                            </div>
                            <div className="sm:flex gap-2">
                              <dt className="text-sm font-medium capitalize text-gray-500">users total amount:</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize rounded-full bg-cyan-100 px-2.5 py-0.5 sm:mt-0 sm:col-span-2">{policyHistory.users_total_amount}</dd>
                            </div>
                            <div className="sm:flex gap-2">
                              <dt className="text-sm font-medium capitalize text-gray-500">periodicity:</dt>
                              {/* <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">weekly</dd> */}

                              {/* {policyHistory == "W" ? (<>
                                <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">weekly</dd>
                              </>)
                                : (<>
                                  <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">...</dd>
                                </>)} */}

                              {policyHistory.periodicity == "W" ? (
                                <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">Weekly</dd>
                              ) :

                                policyHistory.periodicity == "M" ? (
                                  <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">Monthly</dd>
                                ) :
                                  policyHistory.periodicity == "Y" ? (
                                    <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">Year</dd>
                                  ) :
                                    policyHistory.periodicity == "D" ? (
                                      <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">Daily</dd>
                                    ) :
                                      policyHistory.periodicity == "H" ? (
                                        <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">Half Year</dd>
                                      )
                                        : (
                                          <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">...</dd>
                                        )}

                            </div>
                            <div className="sm:flex gap-2">
                              <dt className="text-sm font-medium capitalize text-gray-500">from date:</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">{policyHistory.from_date}</dd>
                            </div>
                            <div className="sm:flex gap-2">
                              <dt className="text-sm font-medium capitalize text-gray-500">to date:</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">{policyHistory.to_date}</dd>
                            </div>

                          </>)}

                        </div>
                      </div>
                    </div>





                    {/* <div className="inc-dec-div sm:border sm:border-gray-300 p-7 pb-4 mt-4 mb-4 mx-auto mx-4"> */}

                    {voilatedDatas.length == 0 ? (<></>) :
                      (<>
                        <div>
                          <h3 className="text-lg ml-5 mt-5 leading-6 font-medium text-gray-900">List of all transactions of that voilation week</h3>
                        </div>
                        <div className="inc-dec-div sm:border sm:border-gray-300 p-7 pb-4 mt-4 mb-4 mx-auto mx-4">
                          {/* <h1>List of all transactions of that voilation week</h1> */}
                          <table className="min-w-full divide-y divide-gray-300">
                            <tr className="bg-gray-200">
                              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">id</th>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Transaction date</th>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">status</th>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Expense type</th>
                            </tr>
                            {voilatedDatas.map((e) => {
                              return (
                                <tr key={e.id} style={{ backgroundColor: e.id == transId ? 'yellow' : '' }}   >
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{e.id}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.date_of_expence}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.status == "RR" ? 'Revision Required'
                                    : e.status == "AP" ? 'Approve'
                                      : e.status == "RS" ? 'ReSubmitted' : 'Submitted'}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.transaction_amount}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.expence_type_details.name}</td>
                                </tr>
                              )
                            })}


                          </table>

                          <h3 className="text-md mt-5 leading-6 font-medium text-gray-500">Total invested amount for that week which is reason for violation is :
                            <span className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white">{investedAmount}</span></h3>
                          {/* <h1>Total invested amount for that week which is reason for violation is : {investedAmount}</h1> */}
                          {/* <br/> */}
                          <h3 className="text-md mt-2 leading-6 font-medium text-gray-600"><b>Note: </b>Highlight (yellow) mark is current transaction</h3>
                        </div>

                      </>)}

                    <div>
                    </div>


                    {/* {voilatedDatas.length == 0 ? (<></>) :
                        (<>
                          <h1>List of all transactions of that voilation week</h1>
                          <table>
                            <tr>
                              <th>id</th>
                              <th>Transaction date</th>
                              <th>status</th>
                              <th>Amount</th>
                              <th>Expense type</th>
                            </tr>
                            {voilatedDatas.map((e) => {
                              return (
                                <tr key={e.id} style={{ backgroundColor: e.id == transId ? 'red' : '' }}   >
                                  <td>{e.id}</td>
                                  <td>{e.date_of_expence}</td>
                                  <td>{e.status == "RR" ? 'Revision Required'
                                    : e.status == "AP" ? 'Approve'
                                      : e.status == "RS" ? 'ReSubmitted' : 'Submitted'}</td>
                                  <td>{e.transaction_amount}</td>
                                  <td>{e.expence_type_details.name}</td>
                                </tr>
                              )
                            })}


                          </table>

                          <h1>Total invested amount for that week which is reason for violation is : {investedAmount}</h1>
                          <br></br>
                          red mark is current transaction

                        </>)} */}
                    {/* </div> */}

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

export default UserTransactionView