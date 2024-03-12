import React from 'react';
import DataGrid,
{
  Column,
  MasterDetail, Button, Editing,
  FilterPanel, SearchPanel, Selection, HeaderFilter
} from 'devextreme-react/data-grid';
import ChildReport from './ChildReport.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { getLodderStatus } from '../../../../redux/adminSlices/lodderSlice.js';
import { LoadPanel } from 'devextreme-react/load-panel';
import ButtonMasterCell from './ButtonMasterCell.js';
import { MASTER_REPORT_LIST_USER, CHILD_REPORT_WITH_TRANSACTION_LIST_USER } from '../../../../redux/type/index.js';
import { Link } from 'react-router-dom';

function UserMasterReport() {

  const employees = useSelector(state => state.masterReportSlice.list);
  const dispatch = useDispatch();
  const lodder = useSelector(state => state.lodderSlice);
  const baseUrl = useSelector(state => state.keyValSlice.url)

  useEffect(() => {
    console.log(111)
    dispatch({ type: MASTER_REPORT_LIST_USER });
    dispatch({ type: CHILD_REPORT_WITH_TRANSACTION_LIST_USER });
  }, []);



  function cloneIconClick(e) {
    console.log(e)
  }

  // function contentReady(e) {
  //   if (!e.component.getSelectedRowKeys().length) { e.component.selectRowsByIndexes(0); }
  // }


  function selectionChanged(e) {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
  }

  return (
    <div className="relative sm:block px-2">
      <div className="mt-4 sm:flex-none">
       
      </div>
      <div className="flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
        <div className="mt-0.5 table-scroll-m">
          <LoadPanel
            hideOnOutsideClick={true}
            visible={lodder.status}
          // onHidden={lodder.status}
          />

          <div className='master-report-table'>
            <DataGrid id="grid-container"
              dataSource={employees}
              keyExpr="id"
              showBorders={true}
              // onContentReady={contentReady}
              onSelectionChanged={selectionChanged}
            >
              <SearchPanel visible={true} width={200} />
              <HeaderFilter visible={true} />
              {/* <FilterPanel visible={true} /> */}
              <Selection mode="multiple" />
              <Editing
                mode="row"
                useIcons={true}
              />


              <Column dataField="id" caption="Report Id" />
              <Column dataField="report_name" caption="Report name" />
              <Column dataField="user_name" caption="User Name" />
              <Column dataField="dept" caption="Department" />
              <Column dataField="master_amount" caption="Total Amount" />
              <Column dataField="violations" caption="Total Violations" />
              {/* <Column dataField="date_of_submited" dataType="date" caption="Submited Date" /> */}
              <Column dataField="from_date" dataType="date" caption="From Date" />
              <Column dataField="to_date" dataType="date" caption="To Date" />
              <Column dataField="status" caption="Status" />
              <Column caption="Action" cellRender={ButtonMasterCell} />

              {/* <Column type="buttons" caption="Actions" width={110}>
                <Button hint="more" icon="more" onClick={(e) => {
                  cloneIconClick(e.row.key)
                }} />
              </Column> */}

              <MasterDetail
                enabled={true}
                component={ChildReport}
              />
            </DataGrid>
          </div>

        </div>
      </div>
    </div>
  );

}

export default UserMasterReport;
