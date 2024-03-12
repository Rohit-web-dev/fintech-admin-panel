import React, { useEffect, useState } from 'react';
import { Template } from 'devextreme-react/core/template';
import TreeList, {
  Column, ColumnChooser, HeaderFilter, FilterPanel, SearchPanel, Selection, Lookup, Scrolling, Paging, Pager, Toolbar, Item
} from 'devextreme-react/tree-list';
import {
  Editing, ValidationRule, Button,
} from 'devextreme-react/tree-list';
import CustomStore from 'devextreme/data/custom_store';
import axios from 'axios';
import notify from 'devextreme/ui/notify';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DEPT_GET, DELETE_DEPT_BY_ID } from '../../../../redux/type';
import { AiFillEye } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import DeptAdd from './DeptAdd';
import DeptEdit from './DeptEdit';
import CardMngAdd from '../cardManagement/CardMngAdd';
import { getModalStatus, setModalNo } from '../../../../redux/adminSlices/modalSlice';
import { MdClose } from 'react-icons/md';
import $ from "jquery";
import Modal from 'react-modal';
import CreateAdmin from '../admin/CreateAdmin';
import UpdateAdmin from '../admin/UpdateAdmin';

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


function DeptList() {
  let subtitle;
  // const [modalIsOpen, setIsOpen] = React.useState(false);

  const [dept_id, setDept] = React.useState(0);
  const modalStatus = useSelector(state => state.modalSlice);
  const modalNo = useSelector(state => state.modalSlice.modelNo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getModalStatus(false))
  }, [])

  const expandedRowKeys = [1, 2, 3, 4, 5];
  const allowedPageSizes = [5, 10, 20];

  //---- all useState field--------//
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const navigate = useNavigate();


  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== '';
  }

  function onEditorPreparing(e) {
    if (e.dataField === 'Head_ID' && e.row.data.ID === 1) {
      e.editorOptions.disabled = true;
      e.editorOptions.value = null;
    }
  }


  const buttonOptionssss = {
    // text: 'Refresh',
    icon: 'plus',
    text: 'Add Department',
    onClick: function () {
      // $('#myModal').modal('show')
      // setAddedit(0);
      dispatch(setModalNo(1)) //dept add
      dispatch(getModalStatus(true))
      //setIsOpen(true);
    }
  };


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    dispatch(getModalStatus(false))
    //setIsOpen(false);
  }




  const store = new CustomStore({
    key: 'id',


    //------------DELETE -----------------//

    remove: (key) => {

      var fd = new FormData();
      fd.append("dept_id", key);
      // console.log(Object.fromEntries(fd));
      return axios.post(`${baseUrl}/dept-delete`, fd, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      }).then((res) => {
        // console.log(res)
        if (res.data.result.code == "200") {
          toast.success(res.data.result.message);
        } else {
          toast.error(res.data.result.message);
          console.log(res.data.result);
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

      //api call `${baseUrl}/dept-list`
      return fetch(`${baseUrl}/dept-list`, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      })
        .then((response) => response.json())
        .then((data) =>
        (//console.log(data.result),

          {
            data: data.result.data,
            totalCount: 40,
          }), [])
        .catch(() => { throw new Error('Data Loading Error'); });
    },


  });

  function onEditorPreparing(e) {
    if (e.dataField === 'Head_ID' && e.row.data.ID === 1) {
      e.editorOptions.disabled = true;
      e.editorOptions.value = null;
    }
  }










  return (
    <>



      {/* <ClipLoader loading={lodder.status} css={override} size={50} /> */}

      {/* -- dynamic par --  */}

        <div className="mt-auto table-scroll-m items-end overflow-auto h-fit">
          
          <TreeList
            dataSource={store}
            columnAutoWidth={true}
            showRowLines={true}
            showBorders={true}
            defaultExpandedRowKeys={expandedRowKeys}
            keyExpr="id"
            onEditorPreparing={onEditorPreparing}
          >
            <SearchPanel visible={true} width={200}/>
            <HeaderFilter visible={true} />
            {/* <FilterPanel visible={true} /> */}
            <Selection mode="multiple" />
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
              defaultPageSize={30} />
            <Pager
              // showPageSizeSelector={true} //to show per page count
              allowedPageSizes={allowedPageSizes}
              showInfo={true} />


            <Editing allowDeleting={true} mode="popup" />




            <Column
              dataField="identifier"
              dataType="string"
              caption="Department Name">
              <ValidationRule type="required" />
            </Column>

            <Column
              dataField="dept_desc.desc"
              dataType="string"
              caption="Description">
              <ValidationRule type="required" />
            </Column>



            <Column
              type="buttons"
              className="flex justify-between"
              // width={100}
              caption="Actions">


              {/* for edit */}
              <Button
                //icon="edit"
                text="edit"
                type="normal"
                stylingMode="contained"
                onClick={(e) => {
                  //alert(e.row.key)
                  setDept(e.row.key)
                  dispatch(setModalNo(2)) //dept edit
                  dispatch(getModalStatus(true))
                  // navigate("/departments/edit/" + e.row.key)
                }}
              >
                <MdModeEditOutline className='edit-btn common-btn' />
              </Button>



              {/* for view */}
              <Button
                // icon="folder"
                text="View"
                type="normal"
                stylingMode="contained"
                onClick={(e) => {
                  // alert(e.row.key)
                  navigate("/departments/view/" + e.row.key)
                }}
              >
                <AiFillEye className='view-btn common-btn' />
              </Button>

              {/* for delete */}
              <Button name="delete"  >
                <BsFillTrashFill className='trash-btn common-btn' />
              </Button>

            </Column>
          </TreeList>








          {/* MODAL PART */}
          {/* <button onClick={openModal}>Open Modal</button> */}
          <Modal
            isOpen={modalStatus.status}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
            <button className='modal-closed-btn' onClick={closeModal}><MdClose /></button>
            {/* <button className='modal-closed-btn' onClick={closeModal}>close/{modalNo}</button> */}

            {modalNo === 1 ? 
            <> <div className='modal-heading'>Department add</div></> 
            :  modalNo === 2 ? <div className='modal-heading'>Department Edit</div> 
            :  modalNo === 3 ? <div className='modal-heading'>Add Cards</div>
            :  modalNo === 4 ?  <div className='modal-heading'>Add Admin</div>
            : <div className='modal-heading'>Edit Admin</div>
            }



            {modalNo === 1 ? <> <DeptAdd></DeptAdd></>
             : modalNo === 2 ? <DeptEdit dept_id={dept_id} />
             : modalNo === 3 ? <CardMngAdd></CardMngAdd>
             : modalNo === 4 ? <CreateAdmin></CreateAdmin>
             :<UpdateAdmin></UpdateAdmin>
            }




          </Modal>
        </div>

      {/* -- closed --    */}

    </>
  );
}

export default DeptList