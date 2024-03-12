import React, { useEffect, useState } from 'react';
import { Template } from 'devextreme-react/core/template';
import TreeList, {
  Column, ColumnChooser, HeaderFilter, SearchPanel, Selection, Lookup, Scrolling, Paging, Pager, Toolbar, Item
} from 'devextreme-react/tree-list';
import {
 Button,
} from 'devextreme-react/tree-list';
import CustomStore from 'devextreme/data/custom_store';
import axios from 'axios';
import notify from 'devextreme/ui/notify';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { getModalStatus, setModalNo } from '../../../../redux/adminSlices/modalSlice';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import { MdModeEditOutline } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { setReportDynamicDeptId } from '../../../../redux/adminSlices/ReportDynamicDeptIdSlice';
import ReportDynamicAdd from './ReportDynamicAdd';
import ReportDynamicEdit from './ReportDynamicEdit';

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



function ReportDynamicList() {

  const expandedRowKeys = [1, 2, 3, 4, 5];
  const allowedPageSizes = [5, 10, 20];

  //---- all useState field--------//
  let subtitle;
  const [dept, setDept] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const modalStatus = useSelector(state => state.modalSlice);
  const modalNo = useSelector(state => state.modalSlice.modelNo);
  const reportModel = useSelector(state => state.reportModelSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch()









  // -- modal details -- 

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    dispatch(getModalStatus(false))
  }

  const buttonOptionssss = {
    icon: 'plus',
    text: 'Add Report Dynamic Fields',
    onClick: function () {
      dispatch(setModalNo(1))
      dispatch(getModalStatus(true)) //just for modal open
    }
  };







  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== '';
  }

  function onEditorPreparing(e) {
    if (e.dataField === 'Head_ID' && e.row.data.ID === 1) {
      e.editorOptions.disabled = true;
      e.editorOptions.value = null;
    }
  }












  const store = new CustomStore({
    key: 'dept_id',





    //------------DELETE -----------------//

    remove: (key) => {

      var fd = new FormData;
      fd.append("exp_id", key)
      // console.log(Object.fromEntries(fd));
      return axios.post(`${baseUrl}/exp-type-delete`, fd, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      }).then((res) => {
        //  console.log(res)
        if (res.data.result.code == "200") {
          toast.success(res.data.result.message);
          setDept(res.data.result.allDept);
          setAllUser(res.data.result.allUsers);
        } else {
          toast.error(res.data.result.message);
        }
      })
        .catch((err) => {
          console.log(err);
        });
    },





    //-----------FETCH ALL DATA------------//

    load(loadOptions) {
      let params = '?';
      [
        'skip',
        'take',
        'requireTotalCount',
        'requireGroupCount',
        'sort',
        'filter',
        'totalSummary',
        'group',
        'groupSummary',
      ].forEach((i) => {
        if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
      });
      params = params.slice(0, -1);

      //api call `${baseUrl}/exp-type-list`
      return fetch(`${baseUrl}/report-dynamic-data-get`, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      })
        .then((response) => response.json())
        .then((data) =>
        ( 
            console.log(data.result),

          {
            data: data.result.data,
            totalCount: 40,
          }), [])
        .catch(() => { throw new Error('Data Loading Error'); });
    },


  });


  return (
    <>

      {/* <ClipLoader loading={lodder.status} css={override} size={50} /> */}

      <div className="mt-0.5 table-scroll-m">

        <TreeList
          dataSource={store}
          columnAutoWidth={true}
          showRowLines={true}
          showBorders={true}
          defaultExpandedRowKeys={expandedRowKeys}
          keyExpr="dept_id"
          onEditorPreparing={onEditorPreparing}
        >

          <Toolbar>
            <Item
              // location="before"
              widget="dxButton"
              options={buttonOptionssss}
              className="add-item-button"
            />
            <Item
              name="searchPanel"
            />
          </Toolbar>

          <Scrolling
            mode="standard" />
          <Paging
            enabled={true}
            defaultPageSize={10} />
          <Pager
            // showPageSizeSelector={true} //to show per page count
            allowedPageSizes={allowedPageSizes}
            showInfo={true} />


          
          <Column
            // width={500}
            dataField="dept_name"
            dataType="string"
            caption="Dept Name">
            {/* <ValidationRule type="required" /> */}
          </Column>


          <Column
            // width={500}
            dataField="totalDynamicField"
            dataType="string"
            caption="Total Dynamic Fields">
            {/* <ValidationRule type="required" /> */}
          </Column>




          <Column type="buttons"
           
            caption="Actions">
            <Button
              text="edit"
              type="normal"
              stylingMode="contained"
              onClick={(e) => {
                dispatch(setReportDynamicDeptId(e.row.key))
                dispatch(setModalNo(2))
                dispatch(getModalStatus(true))
              }}
            >
              <MdModeEditOutline className='edit-btn common-btn' />
            </Button>

            <Button
                text="View"
                type="normal"
                stylingMode="contained"
                onClick={(e) => {
                   navigate("/report/dynamic-fields/view/" + e.row.key)
                }}
              >
                <AiFillEye className='view-btn common-btn' />
              </Button>
            <Button name="delete" icon="trash" />

          </Column>

        </TreeList>





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
          <button className='modal-closed-btn' onClick={closeModal}><MdClose /></button>
          {modalNo === 1 ?
            <>
             <ReportDynamicAdd />
            </>
            :
            <>
              <ReportDynamicEdit />
            </>
          }
        </Modal>
        {/* MODAL PART End*/}


        {/* -- closed --    */}
      </div>


    </>
  );


}



export default ReportDynamicList;
