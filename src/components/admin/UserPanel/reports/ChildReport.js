import React from 'react';
import { DataGrid, Column, Button, Editing, Toolbar, MasterDetail, FilterPanel, SearchPanel, Selection, HeaderFilter } from 'devextreme-react/data-grid';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import ButtonChildcell from './ButtonChildcell.js';
import { CHILD_REPORT_WITH_TRANSACTION_LIST_USER } from '../../../../redux/type/index.js';


function ChildReport(props) {

  const tasks = useSelector(state => state.reportSlice.list);
  const dispatch = useDispatch();
  const dataSource = getTasks(props.data.key);  //step 2
  // console.log(props)


  useEffect(() => {
     console.log(2)
    // dispatch({ type: CHILD_REPORT_WITH_TRANSACTION_LIST_USER });
  }, []);


  function getTasks(key) {  //step 3
    return new DataSource({
      store: new ArrayStore({
        data: tasks,
        key: 'id',
      }),
      filter: ['ReportId', '=', key],
    });
  }


  function cloneIconClick(e) {
    alert(e)
    // getChildList()
  }



  return (
    <React.Fragment>
      <div className="master-detail-caption">
        {`${props.data.data.user_name}'s expences`}
      </div>
      <div className='child-report-table'>
        <DataGrid
          dataSource={dataSource}  //step 1
          showBorders={true}
          columnAutoWidth={true}
        >
            {/* <SearchPanel visible={true} width={200}/> */}
            <HeaderFilter visible={true} />
            {/* <FilterPanel visible={true} /> */}
            <Selection mode="multiple" />
          <Editing
            mode="row"
            useIcons={true}
          />

          <Column dataField="transaction_unique_id" caption="Transaction Id" />
          <Column dataField="transaction_amount" />
          <Column dataField="link_of_recipt" />
          <Column dataField="date_of_expence" dataType="date" />
          <Column dataField="exp_policy_name" />
          <Column dataField="exp_type" />
          <Column dataField="status" />
          <Column dataField="is_per_periodicity_amount_voilation" caption="Periodic violation"/>
          <Column dataField="is_per_transaction_amount_violation" caption="Transaction limit violation" />

          <Column caption="Action" cellRender={ButtonChildcell} />

        </DataGrid>
      </div>
    </React.Fragment>
  );



}


export default ChildReport;
