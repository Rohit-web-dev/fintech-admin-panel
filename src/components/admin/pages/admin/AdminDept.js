import React from 'react';
import { DataGrid, Column, Button, Editing, Toolbar, MasterDetail, FilterPanel, SearchPanel, Selection, HeaderFilter } from 'devextreme-react/data-grid';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'


function AdminDept(props) {



  const depts = useSelector(state => state.AdminDeptsSlice.allAdminsDept);
  const dispatch = useDispatch();
  const dataSource = getDepts(props.data.key);  //step 2
  // console.log(props)





  useEffect(() => {
    console.log(2)
    //  console.log(props,depts)
    // dispatch({ type: CHILD_REPORT_WITH_TRANSACTION_LIST });
  }, []);





  function getDepts(key) {  //step 3
    return new DataSource({
      store: new ArrayStore({
        data: depts,
        key: 'id',
      }),
      filter: ['admin_id', '=', key],
    });
  }





  return (
    <React.Fragment>
      <div className="admin-detail-caption">
        {`${props.data.data.name}'s All Depterments`}
      </div>
      <div className='child-admin-dept-table'>
        <DataGrid
          dataSource={dataSource}  //step 1
          showBorders={true}
          columnAutoWidth={true}
        >

          <HeaderFilter visible={true} />
          <FilterPanel visible={true} />
          <Selection mode="multiple" />
          <Editing
            mode="row"
            useIcons={true}
          />

          <Column dataField="identifier" caption="Dept Name" />
          <Column dataField="dept_desc.desc" caption="Dept Desc" />

        </DataGrid>
      </div>
    </React.Fragment>
  );



}


export default AdminDept;
