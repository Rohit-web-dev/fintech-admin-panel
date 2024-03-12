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
import LevelList from './LevelList';
import LevelAdd from './LevelAdd';
import { useParams } from 'react-router-dom';
import { setDeptLevelFunds } from '../../../../redux/adminSlices/DeptLevelFund';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;


const LevelChild = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)


  // const[totalLimit,SetTotalLimit]=useState("");
  // const[investedLimit,SetInvestedLimit]=useState("");
  // const[remainingLimit,SetRemainingLimit]=useState("");
   const[name,SetName]=useState("");

  useEffect(() => {
    getRemainingFund();
  }, []);


  async function getRemainingFund() {

    var fd=new FormData;
    fd.append("dept_id",param.id)
    await axios.post(`${baseUrl}/dept-level-details`,fd, {
    headers: {
      'Authorization': `Bearer ` + localStorage.getItem('token')
    }
  }).then((res) => {
   console.log(res)
    if (res.data.result.code == "200") {

       SetName(res.data.result.name)
      dispatch(setDeptLevelFunds(res.data.result));
    } else {
      toast.error(res.data.result.message);
     console.log(res.data.result.message);
    }
  })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <LevelAdd DeptId={param.id} />
      <LevelList DeptId={param.id} name={name} />
    </>

  )
}

export default LevelChild