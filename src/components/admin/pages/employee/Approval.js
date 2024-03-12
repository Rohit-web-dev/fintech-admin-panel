import React, { useEffect, useState } from 'react';
import { Template } from 'devextreme-react/core/template';
import TreeList, {
  Column, ColumnChooser, HeaderFilter, SearchPanel, Selection, Lookup, Scrolling, Paging, Pager,
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





function Approval() {

  const expandedRowKeys = [1, 2, 3, 4, 5];
  const allowedPageSizes = [5, 10, 20];

  //---- all useState field--------//
  const [hd, setHd] = useState("");
  const [dept, setDept] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const baseUrl = useSelector(state => state.keyValSlice.url)
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userId, setuserId] = useState(false);
  const [username, setusername] = useState(false);


  useEffect(() => {
    getDeptWithUser(); // for get all dept and user for state management
  }, []);

  async function getDeptWithUser() {
    var res = await fetch("http://srvtechservices.com/exp-app/backend/api/get-dept-and-user", {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json();
    console.log(data.result)
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
      return fetch("http://srvtechservices.com/exp-app/backend/api/member-list-new", {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      })
        .then((response) => response.json())
        .then((data) =>
        ( //console.log(data.result),
          setHd(data.result.top),
          {
            data: data.result.data,
            totalCount: 40,
          }), [])
        .catch(() => { throw new Error('Data Loading Error'); });
    },


  });


  return (
    <>

      <h1>Approval system</h1>
      <TreeList
        dataSource={store}
        columnAutoWidth={true}
        showRowLines={true}
        showBorders={true}
        defaultExpandedRowKeys={expandedRowKeys}
        keyExpr="id"
        parentIdExpr="Head_ID"
        onEditorPreparing={onEditorPreparing}
      >

        <Scrolling
          mode="standard" />
        <Paging
          enabled={true}
          defaultPageSize={10} />
        <Pager
          // showPageSizeSelector={true} //to show per page count
          allowedPageSizes={allowedPageSizes}
          showInfo={true} />


        <Editing mode="form" />



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
          caption="position (level)">
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
          {/* <Button
                                    width={120}
                                    text="Card"
                                    type="normal"
                                    stylingMode="contained"
                                    onClick={(e) => {
                                       // console.log(e.row.data,e.row.key)
                                        // navigate("/card-mng/view/" + e.row.key)

                                    }}
                                /> */}
          <Button
            text="Approval Users"
            type="normal"
            stylingMode="contained"
            onClick={(e) => {
              setShowModal(true); setuserId(e.row.key); setusername(e.row.data.name)
            }}
          >
            Aprroval users
          </Button>

        </Column>
      </TreeList>



      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title/{userId}/{username}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-red text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Approval users set of <b>{username}</b>


                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <select
                        name="user"
                        id="user"

                        onChange={async (e) => {
                          alert(e.target.value)

                        }}
                        className="max-w-lg block p-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value={userId} >Select User</option>
                        {
                          allUser.map((user) => (

                            <option value={user.id} key={user.id}>{user.name}</option>
                          ))
                        }

                      </select>
                    </div>
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}


    </>
  );


}



export default Approval;
