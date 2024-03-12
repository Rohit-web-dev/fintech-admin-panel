import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import $ from "jquery";
import { Multiselect } from "multiselect-react-dropdown";
import axios from 'axios';
import { getModalStatus } from '../../../../redux/adminSlices/modalSlice';
import { toast } from "react-toastify";
import { getLodderStatus } from '../../../../redux/adminSlices/lodderSlice';
import { ALL_ADMINS_WITH_REPORT } from '../../../../redux/type';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;


const CreateAdmin = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [deptIds, SetDeptIds] = useState([]);
    const [allDept, SetAllDept] = useState([]);
    const baseUrl = useSelector(state => state.keyValSlice.url)

    const navigate = useNavigate();
    const lodder = useSelector(state => state.lodderSlice);

    const dispatch = useDispatch();



    useEffect(() => {

        //validations
        $("#addadmin").validate({
            rules: {
                name: {
                    required: true,
                },
                email: {
                    required: true,
                },
                password: {
                    required: true,
                    minlength: 6,
                },
                dept_id: {
                    required: true,
                },
            }
        });
        getAllAvailableDept();
    }, []);











    //---------- API FOR GETTING ALL AVAILABLE DEPT----------------//
    async function getAllAvailableDept() {
        await axios.get(`${baseUrl}/get-available-dept`, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('token')
            }
        }).then((res) => {
            console.log(res)
            if (res.data.result.code == "200") {
                SetAllDept(res.data.result.rem_depts)
            }
            else {
                console.log(res.data.result)
            }
        }).catch((err) => {
            console.log(err);

        });
    }











    //To get all selected value of multi select dropdown
    function onSelect(selectedList) {
        SetDeptIds(selectedList)
    }












    const handleSubmit = async (event) => {
        event.preventDefault();

        if (deptIds.length < 1) {
            alert("please select a dept")
            return false
        }
        var fd = new FormData;
        fd.append("name", name)
        fd.append("email", email)
        fd.append("password", password)
        fd.append("dept_ids", JSON.stringify(deptIds))
        console.log(Object.fromEntries(fd));
        //  return false;

        dispatch(getLodderStatus(true))
        await axios.post(`${baseUrl}/admin-add`, fd, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('token')
            }
        }).then((res) => {
            console.log(res.data)
            if (res.data.code == "200") {
                toast.success(res.data.message)
                dispatch((getModalStatus(false)))
                dispatch(getLodderStatus(false))
                dispatch({ type: ALL_ADMINS_WITH_REPORT });
                navigate("/management#tab_admin")
            } else {
                toast.error(res.data.message);
                dispatch(getLodderStatus(false))
            }
        }).catch((err) => {
            console.log(err);
            //toast.error(err.data.result.message);
        });
    }











    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

            </div>
            <ClipLoader loading={lodder.status} css={override} size={50} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

                <div className="py-4">
                    {/* -- dynamic part with form --  */}
                    <form className="space-y-8 divide-y divide-gray-200" id="addadmin" onSubmit={handleSubmit}>
                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">

                            <div className="space-y-6 sm:space-y-5">

                                <div className="space-y-6 sm:space-y-5">
                                    <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                                        <div className="sm:items-start">
                                            <label htmlFor="name" className="block text-xs font-medium text-gray-400 sm:pt-2">
                                                Name<sup className='starmark'>*</sup>
                                            </label>
                                            <div className="mt-1 sm:mt-0">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    required
                                                    value={name} onChange={(e) => setName(e.target.value)}
                                                    autoComplete="given-name"
                                                    className="p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:items-start">
                                            <label htmlFor="name" className="block text-xs font-medium text-gray-400 sm:pt-2">
                                                Email<sup className='starmark'>*</sup>
                                            </label>
                                            <div className="mt-1 sm:mt-0">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    required
                                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                                    autoComplete="given-name"
                                                    className="p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                                        <div className="sm:items-start">
                                            <label htmlFor="name" className="block text-xs font-medium text-gray-400 sm:pt-2">
                                                Password<sup className='starmark'>*</sup>
                                            </label>
                                            <div className="mt-1 sm:mt-0">
                                                <input
                                                    type="text"
                                                    name="password"
                                                    id="password"
                                                    required
                                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                                    autoComplete="given-name"
                                                    className="p-2 block w-full shadow-sm border border-gray-200 sm:max-w-xs sm:text-sm border-gray-300"
                                                />
                                            </div>
                                        </div>




                                        <div className="sm:items-start">
                                            <label htmlFor="name" className="block text-xs font-medium text-gray-400 sm:pt-2">
                                                Select Dept<sup className='starmark'>*</sup>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <Multiselect options={allDept} displayValue="identifier" onSelect={onSelect} />
                                            </div>
                                        </div>




                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="pt-5">
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center border border-gray-200 px-8 py-1 text-xs text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto"
                                >
                                    Save
                                </button>

                            </div>
                        </div>
                    </form>
                    {/* -- closed --    */}
                </div>
            </div>
        </>
    )
}

export default CreateAdmin