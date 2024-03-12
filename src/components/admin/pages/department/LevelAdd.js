import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import $ from "jquery";
import validate from 'jquery-validation'
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { getLodderStatus } from '../../../../redux/adminSlices/lodderSlice';
import { setLevelList } from '../../../../redux/adminSlices/deptLevelList';
import { setDeptLevelFunds } from '../../../../redux/adminSlices/DeptLevelFund';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const LevelAdd = (props) => {


  const navigate = useNavigate();
  const lodder = useSelector(state => state.lodderSlice);
  const dispatch = useDispatch();
  const param = useParams();
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const DeptDetails = useSelector(state => state.DeptLevelFund)

  //all coomimg from slice redux and props
  const dept_id = props.DeptId;

  const total = DeptDetails.totalFund;
  const invested = DeptDetails.investedFund;
  const rem = DeptDetails.remFund;
  const Deptname = DeptDetails.name;

  //input datas
  const [name, SetName] = useState("");
  const [level_limit, Setlevel_limit] = useState('');
  const [is_top, Seis_top] = useState('');


  useEffect(() => {
    $("#frm").validate({
      rules: {
        dpt: {
          required: true,
        },
        name: {
          required: true,
        },
        limit: {
          required: true,
          min: 10,
        },
      }
    });
  }, [])



  const handleSubmit = async (event) => {
    event.preventDefault();
    //check the valus
    if (parseInt(rem) < parseInt(level_limit)) {
      toast.error(" Upeer Limit cant be more than that of remaining fund " + rem);
      return false;
    }

    dispatch(getLodderStatus(true))

    // if (level_limit > rem) {
    //   alert("Maximum Level Limit can be upto " + rem)
    //   return false;
    // }
    //return false

    var fd = new FormData;
    fd.append("level_name", name);
    fd.append("dept_id", dept_id);
    fd.append("level_limit", level_limit);
    fd.append("is_top", is_top);

    var res = await fetch(`${baseUrl}/dept-level-limit-add`, {
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

      dispatch(setDeptLevelFunds(data.result.funds)); // reset the funds
      dispatch(setLevelList(data.result.list)); // reset the list

      //reset form
      SetName("");
      Setlevel_limit('');
      Seis_top('');

    } else {
      console.log(data.result.message);
      toast.error(data.result.message);
    }
    dispatch(getLodderStatus(false))
  }


  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* <h1 className="text-2xl font-semibold text-gray-900">Add level under {Deptname}</h1> */}

        {/* Back Button */}
        {/* <Link to={"/departments"} className="text-green-400 px-3 py-4">Back</Link> */}


        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Add level under {Deptname}</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link to={"/departments"}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >Back</Link>
          </div>
        </div>

      </div>



      <div className="pb-1 px-3 lg:ml-5 mt-0 sm:items-start">
        <p className="mt-1 max-w-2xl text-gray-500 text-sm font-medium">Total limit of the user: {total}</p>
        <p className="mt-1 max-w-2xl text-orange-500 text-sm font-medium">Limit Asigned: {invested}</p>
        <p className="mt-1 max-w-2xl text-green-500 text-sm font-medium">Remaining limit: {rem - level_limit}</p>
      </div>

      {/* <ClipLoader loading={lodder.status} css={override} size={50} /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {/* -- dynamic par --  */}
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">

              <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">



                <form className="space-y-6 sm:space-y-5" id="frm" onSubmit={handleSubmit}>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Level Name
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={name} onChange={(e) => { SetName(e.target.value) }}
                        autoComplete="given-name"
                        className="max-w-lg p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>


                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="limit" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Level Limit
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="number"
                        name="limit"
                        id="limit"
                        required
                        max={rem}
                        value={level_limit} onChange={(e) => {
                          Setlevel_limit(e.target.value)
                        }}
                        autoComplete="given-name"
                        className="max-w-lg p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>


                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="is_top" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Select Category
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <select
                        id="is_top"
                        name="is_top"
                        required
                        onChange={(e) => {
                          Seis_top(e.target.value)
                          //alert(e.target.value)
                        }}
                        autoComplete="is_top-name"

                        className="max-w-lg block p-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      >

                        <option value={is_top} selected={is_top == "" ? 'selected' : ''}>Select</option>
                        <option value={1}>Sub Admin</option>
                        <option value={0}>None</option>
                      </select>
                    </div>
                  </div>


                  <div className="pt-5">
                    <div className="flex justify-end">

                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div>


            </div>
            {/* -- closed --    */}
          </div>
        </div>
      </div>

    </>
  )
}

export default LevelAdd