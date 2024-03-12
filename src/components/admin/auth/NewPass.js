import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { setUserSlice } from '../../../redux/adminSlices/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { FROGET_PASSWORD_SET_NEW_PASSWORD } from "../../../redux/type"
import $ from "jquery";
import validate from 'jquery-validation'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const NewPass = () => {

  const initialData = useSelector(state => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lodder = useSelector(state => state.lodderSlice);

    //Email form fill 
    const handleChange = (prop) => (event) => {
       dispatch(setUserSlice({ ...initialData, [prop]: event.target.value }))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch({ type: FROGET_PASSWORD_SET_NEW_PASSWORD, initialData: { ...initialData, navigate: navigate } })
    }

    useEffect(() => {
      //$("#a").val('anfjfn');
      $("#newpass").validate({
        rules: {
          email: {
            required: true,
          }
        }
      });
    })
  
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Enter OTP & Set Password</h2>
      </div>
      <ClipLoader loading={lodder.status} css={override} size={50} />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form id="newpass" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Email OTP
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="otp"
                  value={initialData.otp} onChange={handleChange('otp')}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="npass" className="block text-sm font-medium text-gray-700">
                New Passowrd
              </label>
              <div className="mt-1">
                <input
                  id="npass"
                  name="npass"
                  type="text"
                  autoComplete="npass"
                  value={initialData.password} onChange={handleChange('password')}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default NewPass