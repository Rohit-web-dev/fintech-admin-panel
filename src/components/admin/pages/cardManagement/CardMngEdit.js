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
import $ from "jquery";
import { setFunds } from '../../../../redux/adminSlices/cardSlice';
import { setList } from '../../../../redux/adminSlices/cardlistSlice';
import { useParams } from 'react-router-dom';
import { BiRefresh } from 'react-icons/bi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const CardMngEdit = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)



  //all input fields
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");




  const [name, setName] = useState("");
  const [userid, setUserid] = useState("");




  useEffect(() => {
    getSingleData();
    $("#cardMngAdd").validate({
      rules: {

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
  }, []);


  // rendom number
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  async function getSingleData() {
    dispatch(getLodderStatus(true))

    var fd = new FormData;
    fd.append("card_id", param.id);

    await axios.post(`${baseUrl}/card-view`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      //console.log(res)
      if (res.data.result.code == "200") {


        setName(res.data.result.name);
        setUserid(res.data.result.card_details.m_id);

        //all input fiels
        setCard(res.data.result.card_details.card_no);
        setExp(res.data.result.card_details.card_expiry_date);
        setCvv(res.data.result.card_details.card_cvv);

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



  const handleSubmit = async (event) => {
    event.preventDefault();


    dispatch(getLodderStatus(true))
    var fd = new FormData;
    fd.append("member_id", userid);
    fd.append("card_id", param.id);
    fd.append("card_no", card);
    fd.append("card_expiry_date", exp);
    fd.append("card_cvv", cvv);


    //console.log(Object.fromEntries(fd));
    //  return false

    var res = await fetch(`${baseUrl}/card-update`, {
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
      navigate("/card-mng/view/" + userid)

    } else {
      console.log(data.result.message);
      toast.error(data.result.message);
    }
    dispatch(getLodderStatus(false))
  }


  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

      </div>
      {/* <ClipLoader loading={lodder.status} css={override} size={50} /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">



        {/* -- back btn --  */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <span className="text-2xl font-semibold text-gray-500">Edit card details of {name}</span>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link to={"/card-mng/view/" + userid}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            ><span className='text-white'>Back</span></Link>
          </div>
        </div>



        <div className="py-4">



          {/* -- form part --  */}
          <form className="space-y-8 divide-y divide-gray-200" id="cardMngAdd" onSubmit={handleSubmit}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">

              <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit card</h3>
                </div>
                <div className="space-y-6 sm:space-y-5">




                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
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
                        className="max-w-lg p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                      <div onClick={() => {
                        setCard(randomNumberInRange(1000000000000000, 9999999999999999))
                      }}
                        className="flex items-center cursor-pointer"
                      ><BiRefresh /></div>
                    </div>
                  </div>


                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="limit" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
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
                        className="max-w-lg p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>


                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="limit" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
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
                        className="max-w-lg p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                      <div onClick={() => {
                        setCvv(randomNumberInRange(100, 999))
                      }}
                        className="flex items-center cursor-pointer"
                      ><BiRefresh /></div>
                    </div>
                  </div>


                </div>
              </div>
            </div>


            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Update
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

export default CardMngEdit