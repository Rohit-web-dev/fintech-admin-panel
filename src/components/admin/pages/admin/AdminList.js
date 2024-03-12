import React from 'react';
import DataGrid,
{
  Column,
  MasterDetail, Button, Editing,
  FilterPanel, SearchPanel, Selection, HeaderFilter,
  Toolbar, Item
} from 'devextreme-react/data-grid';
import AdminDept from './AdminDept.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { getModalStatus, setModalNo } from '../../../../redux/adminSlices/modalSlice.js';
import { LoadPanel } from 'devextreme-react/load-panel';
import { ALL_ADMINS_WITH_REPORT } from '../../../../redux/type/index.js';

import { BsFillTrashFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import { setAdminId } from '../../../../redux/adminSlices/AdminUpdateSlice.js';



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




function AdminList() {
  let subtitle;
  const admins = useSelector(state => state.AdminDeptsSlice.allAdmin);
  const dispatch = useDispatch();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const modalStatus = useSelector(state => state.modalSlice);
  const modalNo = useSelector(state => state.modalSlice.modelNo);




  useEffect(() => {
    console.log(99999999)
    dispatch({ type: ALL_ADMINS_WITH_REPORT });
  }, []);








  const addAdminButton = {
    // text: 'Refresh',
    icon: 'plus',
    text: 'Add Admin',
    onClick: function () {
      dispatch(setModalNo(4))//for add admin
      dispatch(getModalStatus(true))
    }
  };





  function selectionChanged(e) {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
  }









  return (
    <div className="relative sm:block px-2">
      <div className="flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
        <div className="mt-0.5 table-scroll-m">
          <LoadPanel
            hideOnOutsideClick={true}
            visible={lodder.status}
          // onHidden={lodder.status}
          />

          <div className='master-admin-table'>
            <DataGrid id="grid-container"
              dataSource={admins}
              keyExpr="id"
              showBorders={true}
              // onContentReady={contentReady}
              onSelectionChanged={selectionChanged}
            >

              <Toolbar>
                <Item
                  widget="dxButton"
                  options={addAdminButton}
                  className="add-item-button"
                />
                <Item
                  name="searchPanel"
                />
              </Toolbar>
              <SearchPanel visible={true} width={200} />
              <HeaderFilter visible={true} />
              <FilterPanel visible={true} />
              <Selection mode="multiple" />
              <Editing
                mode="row"
                useIcons={true}
              />




              <Column dataField="name" caption="Admin Name" />
              <Column dataField="email" caption="Admin Email" />
              <Column dataField="deptCount" caption="Total Dept" />
              <Column
              type="buttons"
              className="flex justify-between"
              caption="Actions">


              {/* for edit */}
              <Button
                text="edit"
                type="normal"
                stylingMode="contained"
                onClick={(e) => {
                  // alert(e.row.key)
                  // setDept(e.row.key)
                  dispatch(setAdminId(e.row.key))
                  dispatch(setModalNo(5)) //for edit admin
                  dispatch(getModalStatus(true))

                }}
              >
                <MdModeEditOutline className='edit-btn common-btn' />
              </Button>



              {/* for delete */}
              <Button
                text="delete"
                type="normal"
                stylingMode="contained"
                onClick={(e) => {
                  alert(e.row.key)
                }}
              >
                <BsFillTrashFill className='trash-btn common-btn' />
              </Button>

            </Column>
              {/* <Column caption="Action" cellRender={ButtonMasterCell} /> */}

              <MasterDetail
                enabled={true}
                component={AdminDept}
              />
            </DataGrid>
          </div>

        </div>
      </div>
    </div>
  );

}

export default AdminList;
