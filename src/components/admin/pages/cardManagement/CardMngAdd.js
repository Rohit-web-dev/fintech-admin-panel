import React, { useEffect, useState } from 'react'
import $ from "jquery";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLodderStatus } from '../../../../redux/adminSlices/lodderSlice';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { GET_ALL_DEPENDENT_DEPT_LEVEL } from '../../../../redux/type';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { BiRefresh } from 'react-icons/bi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { getModalStatus } from '../../../../redux/adminSlices/modalSlice';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const CardMngAdd = () => {

  const navigate = useNavigate();
  const lodder = useSelector(state => state.lodderSlice);
  const dispatch = useDispatch();
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const getAllDatas = useSelector(state => state.empCrudSlice);


  const [depts, SetDepts] = useState([]);
  const [total, SetTotal] = useState('');
  const [rem, SetRem] = useState('');
  const [invested, SetInvested] = useState('');

  const [allUser, setAllUser] = useState([]);

  const [userId, setUserId] = useState("");
  const [deptId, setDeptId] = useState("");
  const [levelId, setLevelId] = useState("");

  //all input fields
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");



  useEffect(() => {
    getAllData()
  }, [])

  async function getAllData() {
    dispatch(getLodderStatus(true))
    var res = await fetch(`${baseUrl}/dept-list-under-login-admin`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json()
    // console.log(data);
    SetDepts(data.result.data)
    dispatch(getLodderStatus(false))
  }

  useEffect(() => {
    $("#cardMngAdd").validate({
      rules: {
        dpt: {
          required: true,
        },
        level: {
          required: true,
        },
        user: {
          required: true,
        },
        cardno: {
          required: true,
          minlength: 16,
        },
        expdate: {
          required: true,
        },
        cvv: {
          required: true,
          minlength: 3,
        },

      }
    });
  }, [])

  // rendom number
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();


    dispatch(getLodderStatus(true))
    var fd = new FormData;
    fd.append("member_id", userId);
    fd.append("card_no", card);
    fd.append("card_expiry_date", exp);
    fd.append("card_cvv", cvv);

    //console.log(Object.fromEntries(fd));
    // return false

    var res = await fetch(`${baseUrl}/card-add`, {
      method: 'POST',
      body: fd,
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json();
    // console.log(data.result)
    if (data.result.code == 200) {
      toast.success(data.result.message);
      dispatch((getModalStatus(false)))
      navigate("/management#tab_cards")
    } else {
      console.log(data.result.message);
      toast.error(data.result.message);
    }
    dispatch(getLodderStatus(false))
  }




  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* <h1 className="text-2xl font-semibold text-gray-900">Card Management Add</h1> */}
        {/* Back Button */}
        {/* <Link to={"/card-mng"} className="text-green-600 px-3 py-4">Back</Link> */}
      </div>
      {/* <ClipLoader loading={lodder.status} css={override} size={50} /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">



        {/* -- back btn --  */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
          </div>
          {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link to={"/card-mng"}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                ><span className='text-white'>Back</span></Link>
              </div> */}
        </div>



        <div className="py-4">
          {/* -- form par --  */}
          <form className="space-y-8 divide-y divide-gray-200" id="cardMngAdd" onSubmit={handleSubmit}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">

              <div className="space-y-6 sm:space-y-5">
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-2 sm:gap-4">
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
                            var fd = new FormData;
                            fd.append('dept_id', e.target.value);
                            var res = await fetch(`${baseUrl}/user-under-dept`, {
                              method: 'POST',
                              body: fd,
                              headers: {
                                'Authorization': `Bearer ` + localStorage.getItem('token')
                              }
                            });
                            var data = await res.json();
                            console.log(data)
                            setAllUser(data.result.users);
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





                    <div className="sm:items-start">
                      <label htmlFor="dpt" className="block text-xs font-medium text-gray-400 sm:pt-2">
                        Select Employee
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select
                          name="user"
                          id="user"
                          autoComplete="dpt-name"
                          onChange={async (e) => {
                            setUserId(e.target.value)

                          }}
                          className="p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                        >
                          <option value={userId} >Select User</option>
                          {
                            allUser.map((user) => (

                              <option value={user.id} key={user.id}>{user.name}</option>
                            ))
                          }

                        </select>
                      </div>
                    </div>

                  </div>


                  <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="sm:items-start">
                      <label htmlFor="name" className="block text-xs font-medium text-gray-400 sm:pt-2">
                        Card Number
                      </label>
                      <div className="flex gap-2 mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="number"
                          name="cardno"
                          id="cardno"
                          required

                          value={card}
                          onChange={(e) => { setCard(e.target.value) }}
                          autoComplete="given-name"
                          className="p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                        />
                        <div onClick={() => {
                          setCard(randomNumberInRange(1000000000000000, 9999999999999999))
                        }}
                          className="flex items-center cursor-pointer"
                        ><BiRefresh /></div>
                      </div>
                    </div>


                    <div className="sm:items-start">
                      <label htmlFor="limit" className="block text-xs font-medium text-gray-400 sm:pt-2">
                        CVV
                      </label>
                      <div className="flex gap-2 mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="number"
                          name="cvv"
                          id="cvv"
                          required
                          value={cvv}
                          onChange={(e) => { setCvv(e.target.value) }}
                          autoComplete="given-limit"
                          className="p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                        />
                        <div onClick={() => {
                          setCvv(randomNumberInRange(100, 999))
                        }}
                          className="flex items-center cursor-pointer"
                        ><BiRefresh /></div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="sm:items-start">
                      <label htmlFor="limit" className="block text-xs font-medium text-gray-400 sm:pt-2">
                        Expiry Date
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="date"
                          name="expdate"
                          id="expdate"
                          required
                          value={exp}
                          onChange={(e) => { setExp(e.target.value) }}
                          autoComplete="given-limit"
                          className="p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                        />
                      </div>
                    </div>
                    <div></div>
                  </div>

                </div>
              </div>
            </div>


            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mt-32 inline-flex items-center justify-center border border-gray-200 px-8 py-1 text-xs text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto"
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

export default CardMngAdd