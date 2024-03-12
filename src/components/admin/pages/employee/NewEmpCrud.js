import React, { useEffect, useState } from 'react';
import { Template } from 'devextreme-react/core/template';
// import { Button } from 'devextreme-react/button';
import { SelectBox } from 'devextreme-react/select-box';
import TreeList, {
  Column, ColumnChooser, HeaderFilter, Toolbar, Item, FilterPanel, SearchPanel, Selection, Lookup, Scrolling, Paging, Pager, Popup
} from 'devextreme-react/tree-list';
import {
  Editing, ValidationRule, Button
} from 'devextreme-react/tree-list';
import CustomStore from 'devextreme/data/custom_store';
import axios from 'axios';
import notify from 'devextreme/ui/notify';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'devextreme/dist/css/dx.softblue.compact.css';
import { AiFillCreditCard } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import OrgTabs from '../manage/organization'
import Chart, {
  Margin
} from 'devextreme-react/chart';

function NewEmpCrud() {

  const expandedRowKeys = [1, 2, 3, 4, 5];
  const allowedPageSizes = [5, 10, 20];

  //---- all useState field--------//
  const [hd, setHd] = useState("");
  const [dept, setDept] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const navigate = useNavigate();


  useEffect(() => {
    getDeptWithUser(); // for get all dept and user for state management
  }, []);

  async function getDeptWithUser() {
    console.log("Token: " + localStorage.getItem('token'))
    var res = await fetch( `${baseUrl}/get-dept-and-user`, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json();
    // console.log(data.result)
    setDept(data.result.data)
    setAllUser(data.result.allUsers);
  }



  const lookupDataOfDept = {
    store: dept,
    //sort: 'Full_Name',
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



  //---dropdown of dept-----//
  async function dept_to_user_fun(rowData, value) {
    rowData.Head_ID = 0;
    this.defaultSetCellValue(rowData, value);
    //console.log(rowData, value)
  }


  //-------filter of User -----//
  function getFilteredUsers(options) {
    return {
      store: allUser,
      filter: options.data ? ['dept_id', '=', options.data.dept_id] : null,
    };
  }








  const store = new CustomStore({
    key: 'id',



    //-------INSERT---------//

    insert: (values) => {
      // console.log(values)
      var fd = new FormData;
      fd.append("name", values.name);
      fd.append("email", values.email);
      fd.append("password", values.password);
      fd.append("dept_id", values.dept_id);
      fd.append("parent", values.Head_ID);
      fd.append("level", values.level);
      // console.log(Object.fromEntries(fd));
      //return false;

      return axios.post(`${baseUrl}/member-add-new`, fd, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      }).then((res) => {
        // console.log(res)
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







    //-------- UPDATE --------------//

    update: (key, values) => {
      //console.log(key, values.identifier,values.dept_desc.longdesc, values.dept_desc.desc)
      var fd = new FormData;
      fd.append("member_id", key);
      fd.append("value", JSON.stringify(values));
      // console.log(Object.fromEntries(fd));
      //return false
      return axios.post(`${baseUrl}/member-update-new`, fd, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      }).then((res) => {
        // console.log(res)
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





    //------------DELETE -----------------//

    remove: (key) => {

      var fd = new FormData;
      fd.append("member_id", key)
      // console.log(Object.fromEntries(fd));
      return axios.post(`${baseUrl}/member-delete-new`, fd, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      }).then((res) => {
        // console.log(res)
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

      //api call
      return fetch(`${baseUrl}/member-list-new`, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      })
        .then((response) => response.json())
        .then((data) =>
        (console.log(data),
          setHd(data.result.top),
          {
            data: data.result.data,
            totalCount: 40,
          }), [])
        .catch(() => { throw new Error('Data Loading Error'); });
    },


  });

  const user = {
    name: 'Rebecca Nicholas',
    role: 'Product Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  const stats = [
    { name: 'Pending Reports', stat: '5' },
    { name: 'Outstanding Amount', stat: '$5000' },
    { name: 'Reports Exceeding Cap', stat: '3' },
  ]
  return (
    <>

      {/* <ClipLoader loading={lodder.status} css={override} size={50} /> */}

      <div className="table-scroll-m">
        {/* -- dynamic par --  */}

        <TreeList
          dataSource={store}
          columnAutoWidth={true}
          showRowLines={true}
          showBorders={true}
          defaultExpandedRowKeys={expandedRowKeys}
          keyExpr="id"
          parentIdExpr="Head_ID"
          onEditorPreparing={onEditorPreparing}
          height="80%"
        >
          {/* <Toolbar>                  
                  <Item name="addRowButton" showText="always" />
                  <Item name="searchPanel" />
                </Toolbar> */}
          <SearchPanel visible={true} width={200}/>
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


          <Editing allowUpdating={true} allowDeleting={true} allowAdding={true} mode="popup" >
            <Popup title="Employee Info" showTitle={true} width={700} height={525} />
          </Editing>


          <Column
            dataField="name"
            dataType="string">
            <ValidationRule type="required" />
          </Column>


          <Column
            dataField="email"
            caption="Email">
            <ValidationRule type="required" />
          </Column>


          <Column
            dataField="password"
            visible={false}
            dataType="string">
            {/* <ValidationRule type="required" /> */}
          </Column>



          <Column
            dataField="level"
            caption="Level">
            <ValidationRule type="required" />
          </Column>



          <Column
            dataField="dept_id"
            caption="Dept name" setCellValue={dept_to_user_fun}>

            <Lookup dataSource={lookupDataOfDept} valueExpr="id" displayExpr="identifier" />
            <ValidationRule type="required" />
          </Column>



          <Column visible={false} dataField="Head_ID" caption="Parent User">
            <Lookup dataSource={getFilteredUsers} displayExpr="name" valueExpr="id" />
            <ValidationRule type="required" />
          </Column>



          <Column type="buttons"
            caption="Actions">


            {/* for edit */}
            <Button name="edit"
              icon="edit"
            >
              <MdModeEditOutline className='edit-btn common-btn' />
            </Button>


          


            {/* card */}
            <Button
              text="Card"
              type="normal"
              stylingMode="contained"
              onClick={(e) => {
                //alert(e.row.key)
                navigate("/card-mng/view/" + e.row.key)
              }}
              >
              <AiFillCreditCard className='view-btn common-btn' />
            </Button>

              {/* for delete */}
              <Button name="delete"
              icon="trash"
            >
              <BsFillTrashFill className='trash-btn common-btn' />
            </Button>

          </Column>
        </TreeList>

      </div>

    </>
  );


}





export default NewEmpCrud;
