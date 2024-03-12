import React, { useEffect, useState } from 'react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from 'react-redux'
import { Tree, TreeNode } from 'react-organizational-chart';
import { getLodderStatus } from '../../../../redux/adminSlices/lodderSlice';
import { Link } from 'react-router-dom'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const EmpTree = () => {

  const lodder = useSelector(state => state.lodderSlice);
  const [allDept, setAllDept] = useState([])
  const baseUrl = useSelector(state => state.keyValSlice.url);
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [layer1, setLayer1] = useState("")

  const [layer2, setLayer2] = useState([])



  useEffect(() => {
    getALlDept()
  }, [])

  async function getALlDept() {
    dispatch(getLodderStatus(true))
    console.log("Token: " + localStorage.getItem('token'))
    var res = await fetch(`${baseUrl}/dept-list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    var data = await res.json()
    // console.log(data.result);
    setAllDept(data.result.data)
    dispatch(getLodderStatus(false))
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* <h1 className="text-2xl font-semibold text-gray-900">Employee Tree</h1> */}
        {/* Back Button */}
        {/* <Link to={"/employee"} className="text-green-600 px-3 py-4">Back</Link> */}
      </div>
      <ClipLoader loading={lodder.status} css={override} size={50} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">


        {/* -- back btn --  */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Employee Tree</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link to={"/employee"}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >Back</Link>
          </div>
        </div>

        <div className="py-4">
          {/* -- dynamic par --  */}


          <form className="space-y-6 mb-5 sm:space-y-5" id="frm">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="dpt" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">

              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="dpt"
                  name="dpt"
                  onChange={async (e) => {
                    //alert(e.target.value)
                    var fd = new FormData;
                    fd.append("dept_id", e.target.value);
                    console.log(fd)
                    //console.log(Object.fromEntries(fd));
                    var res = await fetch(`${baseUrl}/tree`, {
                      method: 'POST',
                      body: fd,
                      headers: {
                        'Authorization': `Bearer ` + localStorage.getItem('token')
                      }
                    });
                    var data = await res.json();
                    console.log(data.result)
                    setLayer1(data.result.Deptname)

                    setLayer2(data.result.tree)
                  }}
                  required
                  autoComplete="dpt-name"
                  className="max-w-lg block p-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >

                  <option>Select</option>
                  {
                    allDept.map((data) => {
                      return (
                        <option value={data.id}>{data.identifier}</option>
                      )
                    })
                  }

                </select>
              </div>
            </div>
          </form>


          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <Tree
              lineWidth={'2px'}
              lineColor={'green'}
              lineBorderRadius={'10px'}
              label={<div className='text-lg'>{layer1} <p className='text-sm font-semibold'>(Dept Name)</p></div>}
            >

              {layer2.length < 1 ? <><TreeNode label={<div className='text-lg text-red-500'>No Data Found</div>} /></> :
                (<>

                  {
                    layer2.map((layer3) => {
                      return (
                        <TreeNode label={<div className='text-lg'>{layer3.topUser}<p className='text-sm font-semibold'>( Level: {(layer3.topUserLevel)} )</p></div>}>
                          {
                            layer3.data.map((layer4) => {
                              return (
                                <TreeNode label={<div className='text-lg'>{layer4.child__name.name}<p className='text-sm font-semibold'>( Level: {(layer4.child_level_details.level_details.level)} )</p></div>}>
                                  {
                                    layer4.cu.map((layer5) => {
                                      return (
                                        <TreeNode label={<div className='text-lg'>{layer5.child__name.name}<p className='text-sm font-semibold'>( Level: {(layer5.child_level_details.level_details.level)} )</p></div>}>
                                          {
                                            layer5.subchilds_user.map((layer6) => {
                                              return (
                                                <TreeNode label={<div className='text-lg'>{layer6.child__name.name}<p className='text-sm font-semibold'>( Level: {(layer6.child_level_details.level_details.level)} )</p></div>}>
                                                  {
                                                    layer6.subchilds_user.map((layer7) => {
                                                      return (
                                                        <TreeNode label={<div className='text-lg'>{layer7.child__name.name}<p className='text-sm font-semibold'>( Level: {(layer7.child_level_details.level_details.level)} )</p></div>}>
                                                          {
                                                            layer7.subchilds_user.map((layer8) => {
                                                              return (
                                                                <TreeNode label={<div className='text-lg'>{layer8.child__name.name}<p className='text-sm font-semibold'>( Level: {(layer8.child_level_details.level_details.level)} )</p></div>}>
                                                                  {
                                                                    layer8.subchilds_user.map((layer9) => {
                                                                      return (
                                                                        <TreeNode label={<div className='text-lg'>{layer9.child__name.name}<p className='text-sm font-semibold'>( Level: {(layer9.child_level_details.level_details.level)} )</p></div>}>
                                                                          {
                                                                            layer9.subchilds_user.map((layer10) => {
                                                                              return (
                                                                                <TreeNode label={<div className='text-lg'>{layer10.child__name.name}<p className='text-sm font-semibold'>( Level: {(layer10.child_level_details.level_details.level)} )</p></div>}>
                                                                                  {
                                                                                    layer10.subchilds_user.map((layer11) => {
                                                                                      return (
                                                                                        <TreeNode label={<div className='text-lg'>{layer11.child__name.name}<p className='text-sm font-semibold'>( Level: {(layer11.child_level_details.level_details.level)} )</p></div>}>
                                                                                          {
                                                                                            layer11.subchilds_user.map((layer12) => {
                                                                                              return (
                                                                                                <TreeNode label={<div className='text-lg'>{layer12.child__name.name}<p className='text-sm font-semibold'>( Level: {(layer12.child_level_details.level_details.level)} )</p></div>}>
                                                                                                  {
                                                                                                    layer12.subchilds_user.map((layer13) => {
                                                                                                      return (
                                                                                                        <TreeNode label={<div className='text-lg'>{layer13.child__name.name}<p className='text-sm font-semibold'>( Level: {(layer13.child_level_details.level_details.level)} )</p></div>} />
                                                                                                      )
                                                                                                    })
                                                                                                  }
                                                                                                </TreeNode>
                                                                                              )
                                                                                            })
                                                                                          }
                                                                                        </TreeNode>
                                                                                      )
                                                                                    })
                                                                                  }
                                                                                </TreeNode>
                                                                              )
                                                                            })
                                                                          }
                                                                        </TreeNode>
                                                                      )
                                                                    })
                                                                  }
                                                                </TreeNode>
                                                              )
                                                            })
                                                          }
                                                        </TreeNode>
                                                      )
                                                    })
                                                  }
                                                </TreeNode>
                                              )
                                            })
                                          }
                                        </TreeNode>
                                      )
                                    })
                                  }
                                </TreeNode>
                              )
                            })
                          }
                        </TreeNode>
                      )
                    })
                  }

                </>)
              }
            </Tree>
          </div>
          {/* -- closed --    */}
        </div>
      </div>
    </>
  )
}

export default EmpTree