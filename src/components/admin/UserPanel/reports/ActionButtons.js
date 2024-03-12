import React, { useState, useEffect } from 'react';
import DropDownButton from 'devextreme-react/drop-down-button';
import notify from 'devextreme/ui/notify';
import 'whatwg-fetch';
import { DotsVerticalIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { getModalStatus, setModalNo } from '../../../../redux/adminSlices/modalSlice';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import { setId, setType, setPageType } from '../../../../redux/adminSlices/reportModelSlice';
import $ from "jquery";
import axios from 'axios';
import { getLodderStatus } from '../../../../redux/adminSlices/lodderSlice';
import { toast } from "react-toastify";
import { MASTER_REPORT_LIST_CLONE_USER } from '../../../../redux/type';
import { CHILD_REPORT_WITH_TRANSACTION_LIST_CLONE_USER } from '../../../../redux/type';
import { Link, useNavigate } from 'react-router-dom'


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


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const buttonDropDownOptions = { width: 200 };

const parentDropDown = ['Aproved', 'Reject', 'Revision Required'];
const childDropDown = ['Aproved', 'Reject', 'Revision Required', 'View Details'];

function ActionButtons(props) {

  const pageType = props.pageType;    //*****  THE PAGE TYPE of Action button (Child or Parent)  ****** */
  let subtitle;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalStatus = useSelector(state => state.modalSlice);
  const modalNo = useSelector(state => state.modalSlice.modelNo);
  const baseUrl = useSelector(state => state.keyValSlice.url);
  const reportModel = useSelector(state => state.reportModelSlice);

  const [comment, setComment] = useState("");

  // console.log(props.pageType)

  useEffect(() => {
    $("#model").validate({
      rules: {
        resion: {
          required: true,
          minlength: 10,
        },
      }
    });
  })
















  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    dispatch(getModalStatus(false))

    dispatch(setId(""))
    dispatch(setType(""))
    dispatch(setPageType(""))
    setComment("")
  }






















useEffect(()=>{
  console.log(props.data.data.status);
    // console.log(e.itemData, props.data.data.id, props);
},[]);







  async function onItemClick(e) {
    console.log("e.itemData, props.data.data.id, props");
    console.log(e.itemData, props.data.data.id, props);












    if (e.itemData == "Aproved") {

      if (pageType == "parent") {
        var urlEndPoint = `${baseUrl}/user-master-report-status-update`;
      }
      else if (pageType == "child") {
        var urlEndPoint = `${baseUrl}/user-child-report-transaction-status-update`;
      } else {
        console.log("something is wrong")
      }
      var type = "approve";

      //api call
      dispatch(getLodderStatus(true))
      var fd = new FormData;
      fd.append("id", props.data.data.id)
      fd.append("status", type);
      fd.append("comment", comment);

      console.log(Object.fromEntries(fd), urlEndPoint);
      
      //  return false;
      await axios.post(`${urlEndPoint}`, fd, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      }).then((res) => {
        console.log(res)
        if (res.data.result.code == "200") {
          toast.success(res.data.result.message)
          dispatch({ type: MASTER_REPORT_LIST_CLONE_USER });
          dispatch({ type: CHILD_REPORT_WITH_TRANSACTION_LIST_CLONE_USER });
        } else {
          toast.error(res.data.result.message);
        }
      })
        .catch((err) => {
          console.log(err);
          //toast.error(err.data.result.message);
        });
        setTimeout(() => {
          dispatch(getLodderStatus(false))
        }, 3000);











    } else if (e.itemData == "Reject" || e.itemData == "Revision Required") {
      var id = props.data.data.id;
      if (e.itemData == "Reject") {
        var type = "reject";
      } else {
        var type = "revision";
      }
      dispatch(setId(id))
      dispatch(setType(type))
      if (pageType == "child") {
        dispatch(setPageType("child"))
        dispatch(setModalNo(100))
      }
      else {
        dispatch(setPageType("parent"))
        dispatch(setModalNo(101))
      }
      dispatch(getModalStatus(true))


    }
    else if (e.itemData == "Cancel") {
      //alert(1)
      // $("#dp").hide(200);

    }
    else {
      navigate("/reports/transaction-detail/" + props.data.data.id)

    }
    // notify(e.itemData.name || e.itemData, 'success', 600);

  }












  

  //FORM SUBMIT button without approve using modal
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(reportModel.page_type, comment)
    if (reportModel.page_type == "parent") {
      var urlEndPoint = `${baseUrl}/user-master-report-status-update`;
    }
    else if (reportModel.page_type == "child") {
      var urlEndPoint = `${baseUrl}/user-child-report-transaction-status-update`;
    } else {
      console.log("something is wrong")
    }

    //api call
    var fd = new FormData;
    fd.append("id", reportModel.id)
    fd.append("status", reportModel.status_type);
    fd.append("comment", comment);

    console.log(Object.fromEntries(fd), urlEndPoint);

    dispatch(getLodderStatus(true))
    // return false;
    await axios.post(`${urlEndPoint}`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res)
      if (res.data.result.code == "200") {
        toast.success(res.data.result.message)

        dispatch({ type: MASTER_REPORT_LIST_CLONE_USER });
        dispatch({ type: CHILD_REPORT_WITH_TRANSACTION_LIST_CLONE_USER });
        dispatch(getModalStatus(false))
      } else {
        toast.error(res.data.result.message);
      }
    })
      .catch((err) => {
        console.log(err);
        //toast.error(err.data.result.message);
      });
      setTimeout(() => {
        dispatch(getLodderStatus(false))
      }, 3000);
    
  }







  return (
    <>
    {pageType=="parent"? 
    <><div className="dx-fieldset">
        <div className="dx-field">
          <div className="dx-field-value">
            <DropDownButton
            // id="dp"
              icon="overflow"
              dropDownOptions={buttonDropDownOptions}
              items={props.data.data.status=="Submitted" ? parentDropDown 
              : props.data.data.status=="Re submitted" ? parentDropDown
              : ["Cancel"]}
              onItemClick={onItemClick}
            />
          </div>
        </div>
      </div>
      </> : <>
      <div className="dx-fieldset">
        <div className="dx-field">
          <div className="dx-field-value">
            <DropDownButton
              icon="overflow"
              dropDownOptions={buttonDropDownOptions}
              items={props.data.data.status=="Submitted"? childDropDown 
              :  props.data.data.status=="Re submitted"? childDropDown 
              : ["View Details","Cancel"]}
              onItemClick={onItemClick}
            />
          </div>
        </div>
      </div>
      </>}
      






      {/* MODAL PART START*/}
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalStatus.status}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal 2"
        ariaHideApp={false}
      >
        {modalNo === 100 ?
          <>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
            <h1 className='modal-heading'>Transition status comment</h1>
            <button className='modal-closed-btn' onClick={closeModal}><MdClose /></button>

            {/* {reportModel.id}/{reportModel.status_type}/{reportModel.page_type}/{modalNo} */}

            <div className="mt-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <form className="space-y-8 divide-y divide-gray-200" id="model" onSubmit={handleSubmit}>
                <label htmlFor="resion" className="block text-xs font-medium text-gray-400 sm:mt-px sm:pt-2">
                  Reason for {reportModel.status_type} <sup className='starmark'>*</sup>
                </label>
                <textarea
                  id="resion"
                  onChange={(e) => {
                    setComment(e.target.value)
                  }}
                  name="resion"
                  rows={10}
                  className="p-2 shadow-sm block w-full sm:text-sm border border-gray-200"
                  value={comment}
                />
                <div className="modal-sub-btn">
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
            </div>
          </>


          :

          <>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
            <h1 className='modal-heading'>Report status comment</h1>
            <button className='modal-closed-btn' onClick={closeModal}><MdClose /></button>

            {/* {reportModel.id}/{reportModel.status_type}/{reportModel.page_type}/{modalNo} */}

            <div className="mt-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <form className="space-y-8 divide-y divide-gray-200" id="model" onSubmit={handleSubmit}>
                <label htmlFor="resion" className="block text-xs font-medium text-gray-400 sm:mt-px sm:pt-2">
                  Reason for {reportModel.status_type}<sup className='starmark'>*</sup>
                </label>
                <textarea
                  id="resion"
                  onChange={(e) => {
                    setComment(e.target.value)
                  }}
                  name="resion"
                  rows={10}
                  className="p-2 shadow-sm block w-full sm:text-sm border border-gray-200"
                  value={comment}
                />
                <div className="modal-sub-btn">
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
            </div>
          </>
        }
      </Modal>
      {/* MODAL PART End*/}
    </>
  );
}

export default ActionButtons;
