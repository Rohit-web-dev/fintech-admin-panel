import React, { useEffect, useState } from 'react';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
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
import { MASTER_REPORT_LIST_USER } from '../../../../redux/type';
import { CHILD_REPORT_WITH_TRANSACTION_LIST_USER } from '../../../../redux/type';
import { Link } from 'react-router-dom'

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


export default function ActionButtonsForChild(props) {

  const pageType = props.pageType;    //*****  THE PAGE TYPE of Action button (Child or Parent)  ****** */
  let subtitle;
  const dispatch = useDispatch();
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








  //-----APPROVE STATUS---------//
  async function approveFunction(id, type) {
    //  alert(id)
    // alert(id)
    //api call

    if (pageType == "parent") {
      var urlEndPoint = `${baseUrl}/user-master-report-status-update`;
    }
    else if (pageType == "child") {
      var urlEndPoint = `${baseUrl}/user-child-report-transaction-status-update`;
    } else {
      console.log("something is wrong")
    }

    //api call
    var fd = new FormData;
    fd.append("id", id)
    fd.append("status", type);
    fd.append("comment", comment);

    console.log(Object.fromEntries(fd), urlEndPoint);
    dispatch(getLodderStatus(true))
    //  return false;
    await axios.post(`${urlEndPoint}`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res)
      if (res.data.result.code == "200") {
        toast.success(res.data.result.message)
        dispatch({ type: MASTER_REPORT_LIST_USER });
        dispatch({ type: CHILD_REPORT_WITH_TRANSACTION_LIST_USER });
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







  //-------REJECT, REVISION STATUS----------//
  function actionFunction(id, type) {
    console.log(id, type);

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

        dispatch({ type: MASTER_REPORT_LIST_USER });
        dispatch({ type: CHILD_REPORT_WITH_TRANSACTION_LIST_USER });
        dispatch(getModalStatus(false))
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
    <div className='action-dropdown-main'>





      {/* start dropdown */}
      <Menu as="div" className="inline-block text-left">

        <div>
          <Menu.Button className="overflow-hidden bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute overflow-visible drop-menu-report origin-top-right right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={(e) => {
                      var type = "approve"; //dont change this type
                      approveFunction(props.data.data.id, type)
                    }}

                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Approve
                  </a>)}

              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={(e) => {
                      var type = "reject"; //dont change this type
                      actionFunction(props.data.data.id, type)
                      // alert(props.data.data.id),
                    }}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Reject
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={(e) => {
                      var type = "revision"; //dont change this type
                      actionFunction(props.data.data.id, type)
                      // alert(props.data.data.id),
                    }}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Revision Required
                  </a>
                )}
              </Menu.Item>


              {pageType == "child" ? <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={"/report/transaction-detail/" + props.data.data.id}
                      onclick
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      View Details
                    </Link>
                  )}
                </Menu.Item></> : ''}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {/* end dropdown */}











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

    </div>
  );
}
