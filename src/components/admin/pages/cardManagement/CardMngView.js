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
import ChildCardAdd from './ChildCardAdd';
import ChildCardList from './ChildCardList';
import { useParams } from 'react-router-dom';
import { setFunds } from '../../../../redux/adminSlices/cardSlice';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;


const CardMngView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)



  // const[totalLimit,SetTotalLimit]=useState("");
  // const[investedLimit,SetInvestedLimit]=useState("");
  // const[remainingLimit,SetRemainingLimit]=useState("");
  const [name, SetName] = useState("");

  useEffect(() => {
    getRemainingFund();
  }, []);


  async function getRemainingFund() {

    var fd = new FormData;
    fd.append("member_id", param.id)
    await axios.post(`${baseUrl}/member-name`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      //  console.log(res)
      if (res.data.result.code == "200") {
        // SetTotalLimit(res.data.result.totalUpperLimit)
        // SetInvestedLimit(res.data.result.alreadyInvestedLimit)
        // SetRemainingLimit(res.data.result.rem)

        SetName(res.data.result.name)
        dispatch(setFunds(res.data.result));
      } else {
        navigate("/management#tab_cards")
        toast.error(res.data.result.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <ChildCardAdd userId={param.id} name={name} />
      <ChildCardList userId={param.id} name={name} />
    </>

  )
}

export default CardMngView