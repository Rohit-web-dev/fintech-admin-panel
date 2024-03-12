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
//import { useDispatch, useSelector } from 'react-redux'
import { AiFillEye } from 'react-icons/ai';

import { getModalStatus, setModalNo } from '../../../../redux/adminSlices/modalSlice';






function CardMngList() {

  const dispatch = useDispatch();

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




  const buttonOptions = {
    // text: 'Refresh',
    icon: 'plus',
    text: 'Add cards',
    onClick: function () {
      //alert(1)
      // $('#myModal').modal('show')
      dispatch(setModalNo(3))//card add
      dispatch(getModalStatus(true))
    }
  };






  const store = new CustomStore({
    key: 'userId',


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
      return fetch(`${baseUrl}/card-list-master`, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      })
        .then((response) => response.json())
        .then((data) =>
        (//console.log(data),

          {
            data: data.result.master_lists,
            totalCount: 40,
          }), [])
        .catch(() => { throw new Error('Data Loading Error'); });
    },


  });


  return (
    <>

      <div className="mt-0.5 table-scroll-m">

        <TreeList
          dataSource={store}
          columnAutoWidth={true}
          showRowLines={true}
          showBorders={true}
          defaultExpandedRowKeys={expandedRowKeys}
          keyExpr="userId"
          onEditorPreparing={onEditorPreparing}
        >

          {/* <ColumnChooser enabled={true} /> */}
          <Toolbar>
            <Item
              // location="before"
              widget="dxButton"
              options={buttonOptions}
            />
            <Item
              name="searchPanel"
            />
          </Toolbar>




          <SearchPanel visible={true} width={200}/>
          <HeaderFilter visible={true} />
          {/* <FilterPanel visible={true} /> */}
          <HeaderFilter visible={true} />
          <Selection mode="multiple" />

          <Scrolling
            mode="standard" />
          <Paging
            enabled={true}
            defaultPageSize={30} />
          <Pager
            // showPageSizeSelector={true} //to show per page count
            allowedPageSizes={allowedPageSizes}
            showInfo={true} />







          <Column
            dataField="UserName"
            dataType="string"
            caption="Employee Name">
            <ValidationRule type="required" />
          </Column>

          <Column
            dataField="DeptName"
            dataType="string"
            caption="Dept Name">
            <ValidationRule type="required" />
          </Column>

          <Column
            dataField="TotalCards"
            dataType="string"
            caption="Total Cards">
            <ValidationRule type="required" />
          </Column>



          <Column type="buttons"
            caption="Actions">

            {/* for view */}
            <Button
              // text="View"
              type="normal"
              stylingMode="contained"
              onClick={(e) => {
                //alert(e.row.key)
                navigate("/card-mng/view/" + e.row.key)
              }}
              className="view-btn custome-btn"
            // icon="folder"
            >
              <AiFillEye className='view-btn mx-auto common-btn card-view-btn' />
            </Button>

          </Column>
        </TreeList>


      </div>

    </>
  );
}

export default CardMngList