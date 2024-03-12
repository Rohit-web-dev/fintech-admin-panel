import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import $ from "jquery";
import axios from 'axios';
import { toast } from "react-toastify";
import { getModalStatus, setModalNo } from '../../../../redux/adminSlices/modalSlice';
import { getLodderStatus } from '../../../../redux/adminSlices/lodderSlice';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const ReportDynamicData = () => {


  const navigate = useNavigate();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const dispatch = useDispatch();
  //for dynamic form
  const [dynmicdata, SetDynamicData] = useState([{
    key_field: '', type: ''
  }])

  useEffect(() => {

    //validations
    $("#addExpType").validate({
      rules: {
        addExpType: {
          required: true,
        },
      }
    });

    getDynamicData();

  }, []);




  async function getDynamicData() {
    dispatch(getLodderStatus(true))
    var res = await fetch(`${baseUrl}/report-dynamic-data-get`, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json();
    // console.log(data)
    if (data.result.code == "200") {

      if (data.result.countData < 1) {
        SetDynamicData([{ key_field: '', type: '' }])
      } else {
        SetDynamicData(data.result.data)
      }
    } else {
      console.log(data.result.message);
    }
    dispatch(getLodderStatus(false))
  }






  //dynamic form part
  const dynamicChangeInput = (index, event) => {
    const value = [...dynmicdata];
    value[index][event.target.name] = event.target.value;
    SetDynamicData(value);
  }

  const addfun = () => {
    SetDynamicData([...dynmicdata, { key_field: '', type: '' }]);
  }

  const removefun = (index) => {
    const value = [...dynmicdata];
    value.splice(index, 1);
    SetDynamicData(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    var fd = new FormData;
    fd.append("dynamicDatas", JSON.stringify(dynmicdata));
    //  console.log(Object.fromEntries(fd));

    return axios.post(`${baseUrl}/report-dynamic-data-post`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      //   console.log(res)
      if (res.data.result.code == "200") {
        toast.success(res.data.result.message);
        dispatch(setModalNo(0))
        dispatch(getModalStatus(false))
        getDynamicData()
      } else {
        toast.error(res.data.result.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }







  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to={"/report"}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >Back</Link>
        </div> */}

      </div>
      <ClipLoader loading={lodder.status} css={override} size={50} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        <div className="py-4">
          {/* -- dynamic part with form --  */}
          <form className="space-y-8 divide-y divide-gray-200" id="addExpType" onSubmit={handleSubmit}>



            {/* dynamic data */}
            <div className='sm:flex sm:justify-between sm:items-center'>
              <h3 className="text-md font-semibold leading-6 text-gray-900">Report Dynamic Data</h3>
              {/* <h1 className="modal-heading">Add Expence Type</h1> */}
              <Link to={"/report"}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >Back</Link>
            </div>
            <div>
              {dynmicdata.map((data, index) => (

                <div key={index} className="sm:flex sm:gap-3 mt-5 sm:items-center justify-evenly">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-400 sm:pt-2">
                      Field
                    </label>
                    <input type="text" name="key_field" value={data.key_field}
                      onChange={event => dynamicChangeInput(index, event)} placeholder="field"
                      className="max-w-lg my-2 p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-400 sm:pt-2">
                      Type
                    </label>
                    <input type="text" name="type" value={data.type}
                      onChange={event => dynamicChangeInput(index, event)} placeholder="type"
                      className="max-w-lg my-2 p-2 block w-full shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300"
                    />
                  </div>


                  {/* add icon with condition start*/}
                  {dynmicdata.length < 2 ? (<>

                    <span onClick={() => addfun()}
                      className="cursor-pointer ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
                    >  +  </span>
                    {/* <span onClick={()=>removefun(index)}>  -  </span> */}

                  </>)
                    :
                    (<>

                      <span onClick={() => addfun()}
                        className="cursor-pointer ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
                      >  +  </span>
                      <span onClick={() => removefun(index)}
                        className="cursor-pointer ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
                      >  -  </span>


                    </>)}
                  {/* add icon with condition end */}

                </div>
              ))}
            </div>


            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center border border-gray-200 px-8 py-1 text-xs text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto"
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

export default ReportDynamicData