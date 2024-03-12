import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from "@emotion/react";
import $ from "jquery";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLodderStatus } from '../../../redux/adminSlices/lodderSlice';
import validate from 'jquery-validation'
import { BsEyeFill, BsEyeSlashFill, BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';
import { PlusIcon as PlusIconMini } from '@heroicons/react/solid'



const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}





// function starts 
const SuperAdminWeekSet = () => {

  //assigning location variable
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");
  // console.log(splitLocation[2]);

  const navigate = useNavigate();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url);
  const dispatch = useDispatch();
  const [startDay, setStartDay] = useState()
  const [endday, setEndDay] = useState()


  useEffect(() => {
    getWeekData();
  }, []);


  useEffect(() => {
    // $("#week_start").prop('disabled', true);
    // $("#week_end").prop('disabled', true);
    // $("#btn").hide();

    $("#frm").validate({
      rules: {
        week_start: {
          required: true,
        },
        week_end: {
          required: true,
        }
      }
    });
  })




  //----------MAIN LIST OF THAT PAGE-----------//
  async function getWeekData() {
    //alert(id);
    dispatch(getLodderStatus(true))
    var res = await fetch(`${baseUrl}/get-week-set-data`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json()
    console.log(data)
    if (data.result.code == "200") {
      if (data.result.list.week_start == "Sun") {
        setStartDay("Sun-1")
      }
      else if (data.result.list.week_start == "Mon") {
        setStartDay("Mon-2")
      }
      else if (data.result.list.week_start == "Tue") {
        setStartDay("Tue-3")
      }
      else if (data.result.list.week_start == "Wed") {
        setStartDay("Wed-4")
      }
      else if (data.result.list.week_start == "Thu") {
        setStartDay("Thu-5")
      }
      else if (data.result.list.week_start == "Fri") {
        setStartDay("Fri-6")
      }
      else {
        setStartDay("Sat-7")
      }


      //----------------------------------//
      if (data.result.list.week_end == "Sun") {
        setEndDay("Sun-1")
      }
      else if (data.result.list.week_end == "Mon") {
        setEndDay("Mon-2")
      }
      else if (data.result.list.week_end == "Tue") {
        setEndDay("Tue-3")
      }
      else if (data.result.list.week_end == "Wed") {
        setEndDay("Wed-4")
      }
      else if (data.result.list.week_end == "Thu") {
        setEndDay("Thu-5")
      }
      else if (data.result.list.week_end == "Fri") {
        setEndDay("Fri-6")
      }
      else {
        setEndDay("Sat-7")
      }

    } else {
      console.log(data)
    }
    dispatch(getLodderStatus(false))
  }






  const Showfun = () => {

    if ($("#btnToggle").html() == `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path></svg>`) {

      $("#week_start").prop('disabled', false);
      $("#week_end").prop('disabled', false);


      $("#btn").show();
      $("#btnToggle").hide();
    }
  }












  async function submitFun(event) {
    event.preventDefault();
    var sDay = "";
    var eDay = "";
    // console.log(startDay,endday)
    var start = startDay.split("-")
    var end = endday.split("-")

    // console.log(start[1],end[1]);

    if (parseInt(start[1]) > parseInt(end[1])) {
      toast.error("start day can not be less than end date")
      return false
    }

    if (start[1] == "undefined") {
      sDay = startDay;
    } else {
      sDay = start[0];
    }

    if (end[1] == "undefined") {
      eDay = endday;
    } else {
      eDay = end[0];
    }
    console.log(sDay, eDay);
    var fd = new FormData;
    fd.append("week_start", sDay)
    fd.append("week_end", eDay)

    dispatch(getLodderStatus(true))
    await axios.post(`${baseUrl}/add-or-edit-week-set-data`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res)
      if (res.data.result.code == "200") {
        toast.success(res.data.result.message)

        //call the list
        getWeekData();

        $("#week_start").prop('disabled', true);
        $("#week_end").prop('disabled', true);
        $("#btnToggle").show()
        $("#btn").hide();
      } else {
        toast.error(res.data.result.message);
      }
    })
      .catch((err) => {
        console.log(err);
        //toast.error(err.data.result.message);
      });
    dispatch(getLodderStatus(false))




  }












  return (
    <>
      <div className='px-8'>
        <ClipLoader loading={lodder.status} css={override} size={50} />

        {/*------------------------------ Form start ------------------------------------*/}
        <form className="space-y-8 divide-y divide-gray-200 rounded-md" id="frm" onSubmit={submitFun} >

          <div className="flex items-center justify-between gap-4">
            <div className='inc-dec-div sm:border sm:border-gray-300 p-7 pb-4 mt-4 mx-auto exp-list-form'>
              <div className="lg:grid lg:grid-cols-2 lg:gap-2">
                <div className="mb-3">
                  <label htmlFor="" className='font-medium text-sm'>Week start day:</label>
                  <select name='week_start' onChange={(e) => {
                    setStartDay(e.target.value)
                  }} id="week_start" disabled className='border-gray-300 rounded-md' style={{ width: '100%' }}>
                    <option value={''}>Select</option>
                    <option value={'Sun-1'} selected={startDay == "Sun-1" ? 'selected' : ''} >Sunday</option>
                    <option value={'Mon-2'} selected={startDay == "Mon-2" ? 'selected' : ''} >Monday</option>
                    <option value={'Tue-3'} selected={startDay == "Tue-3" ? 'selected' : ''} >Tuesday</option>
                    <option value={'Wed-4'} selected={startDay == "Wed-4" ? 'selected' : ''} >Wednesday</option>
                    <option value={'Thu-5'} selected={startDay == "Thu-5" ? 'selected' : ''} >Thursday</option>
                    <option value={'Fri-6'} selected={startDay == "Fri-6" ? 'selected' : ''} >Friday</option>
                    <option value={'Sat-7'} selected={startDay == "Sat-7" ? 'selected' : ''} >Saturday</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="" className='font-medium text-sm'>Week end day:</label>
                  <select name='week_end' onChange={(e) => {
                    setEndDay(e.target.value)
                  }} id="week_end" disabled className='border-gray-300 rounded-md' style={{ width: '100%' }}>
                    <option value={''}>Select</option>
                    <option value={'Sun-1'} selected={endday == "Sun-1" ? 'selected' : ''} >Sunday</option>
                    <option value={'Mon-2'} selected={endday == "Mon-2" ? 'selected' : ''} >Monday</option>
                    <option value={'Tue-3'} selected={endday == "Tue-3" ? 'selected' : ''} >Tuesday</option>
                    <option value={'Wed-4'} selected={endday == "Wed-4" ? 'selected' : ''} >Wednesday</option>
                    <option value={'Thu-5'} selected={endday == "Thu-5" ? 'selected' : ''} >Thursday</option>
                    <option value={'Fri-6'} selected={endday == "Fri-6" ? 'selected' : ''} >Friday</option>
                    <option value={'Sat-7'} selected={endday == "Sat-7" ? 'selected' : ''} >Saturday</option>
                  </select>
                </div>

                <div className="mb-3">
                  <input type="submit" value="save" id="btn" style={{ display: "none" }}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  />
                </div>
              </div>
            </div>

            <div className='pl-1 grid border-l gridView'>
              <span id="btnToggle" onClick={() => Showfun()}
                className="mb-1 mr-1 pt-1 pl-1 inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-full text-black hover:bg-teal-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              ><BsFillPencilFill /></span>
            </div>
          </div>

        </form>


      </div>
    </>
  )
}

export default SuperAdminWeekSet