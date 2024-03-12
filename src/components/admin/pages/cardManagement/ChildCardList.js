import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
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
import { setFunds } from '../../../../redux/adminSlices/cardSlice';
import { setList } from '../../../../redux/adminSlices/cardlistSlice';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const ChildCardList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  //const[list,SetList]=useState([]);
  const list = useSelector(state => state.cardlistSlice.cardList)
  const FundDetails = useSelector(state => state.cardSlice)

  const total = FundDetails.totalFund;
  const invested = FundDetails.investedFund;
  const rem = FundDetails.remFund;

  const [upr, setUpr] = useState("");

  const userId = props.userId;
  const name = props.name;

  useEffect(() => {
    getChildLists();
  }, []);

  async function getChildLists() {
    dispatch(getLodderStatus(true))

    var fd = new FormData;
    fd.append("member_id", userId);

    await axios.post(`${baseUrl}/card-list-child`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.result.code == "200") {

        dispatch(setList(res.data.result.lists))
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
        {/* <h1 className="text-2xl font-semibold text-gray-900">All Card Details of {name}</h1> */}
      </div>
      <ClipLoader loading={lodder.status} css={override} size={50} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {/* -- form par --  */}



          {/* <h1>{name}</h1> */}


          <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900"> Cards list for {name}</h3>
                </div>

          <div className="my-2 mx-2 overflow-x-auto sm:-mx-6 lg:mx-1 lg:px-1">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
              
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Card No
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Cvv
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Exp Date
                      </th>

                      <th scope="col" className="relative py-3.5 text-left pl-3 pr-4 sm:pr-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {list.map((l) => (
                      <tr key={l.id}>
                        <td className="whitespace-nowrap py-3.5 pl-6 pr-3 text-sm text-gray-500">{l.card_no}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{l.card_cvv}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{l.card_expiry_date}</td>

                        <td className="sm:flex sm:items-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">

                          <button onClick={async () => {
                            dispatch(getLodderStatus(true))
                            if (window.confirm('Delete the card?')) {
                              var fd = new FormData;
                              fd.append('card_id', l.id)
                              var res = await fetch(`${baseUrl}/card-delete`, {
                                method: 'POST',
                                body: fd,
                                headers: {
                                  'Authorization': `Bearer ` + localStorage.getItem('token')
                                }
                              });
                              var data = await res.json();
                              //console.log(data.result)
                              if (data.result.code == 200) {
                                toast.success(data.result.message);
                                // dispatch(setFunds(data.result)); //to set funds
                                getChildLists();  // to update the table

                              } else {
                                toast.error(data.result.message);
                                // console.log(data.result.message);
                              }
                              dispatch(getLodderStatus(false))

                            }
                          }}
                            className="text-red-500 pr-3 py-4">
                            <BsFillTrashFill className='trash-btn' />
                          </button>


                          <Link to={"/card-mng/edit/" + l.id} className="text-green-600 px-3 py-4"><MdModeEditOutline className='edit-btn' /></Link>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>






          {/* -- closed --    */}
        </div>
      </div>
    </>
  )
}

export default ChildCardList