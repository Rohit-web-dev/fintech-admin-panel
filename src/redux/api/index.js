import axios from 'axios'

axios.defaults.baseURL = 'http://srvtechservices.com/exp-app/backend/api'
// axios.defaults.baseURL = 'http://localhost/fintech-app/api'
// axios.defaults.baseURL = 'http://server.w3sigma.in/api/'

export const LoginApi = async (fd) => axios.post('/login', fd)

export const fogetPassEmailSent = async (fd) => axios.post('/forget-password/enter-mail', fd)

export const fogetPassEnterNewPass = async (fd) => axios.post('forget-password/new-password', fd)

export const DeptAddApi = async (fd) => axios.post('dept-add', fd, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const DeptGetApi = async () => axios.get('dept-list', {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const DeptDelApi = async (fd) => axios.post('dept-delete', fd, {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const DeptEditApi = async (fd) => axios.post('dept-update', fd, {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const GetSingleDept = async (fd) => axios.post('get-single-dept-data', fd, {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const CheckUserAPI = async () => axios.get('get_user', {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const deptMapParentsChildsApi = async () => axios.get('dept-list', {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const postDeptMapParentsChildsApi = async (fd) => axios.post('dept-map-add', fd, {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const getDeptMapDataApi = async () => axios.get('dept-map-list', {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const getMapSingleDataApi = async (fd) => axios.post('dept-map-single-view', fd, {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const updateDeptMap = async (fd) => axios.post('dept-map-edit', fd, {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const DeptMapDelApi = async (fd) => axios.post('dept-mapping-delete', fd, {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const postEmpRolApi = async (fd) => axios.post('member-role-add', fd, {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const getEmpRolApi = async () => axios.get('member-role-list', {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const empRolDelApi = async (fd) => axios.post('member-role-delete', fd, {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const getAllRoles = async () => axios.get('member-role-list', {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


export const getDeptLevels = async (fd) => axios.post('level-ubder-one-dept', fd, {

  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})





export const getChildReportData = async () => axios.get('child-report-transaction-list', {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})




export const getMasterReportData = async () => axios.get('master-report-list', {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})



export const getAdmiNWithDept = async () => axios.get('admin-list-with-child-depts', {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})



export const getChildReportDataUser = async () => axios.get('user-child-report-transaction-list', {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})




export const getMasterReportDataUser = async () => axios.get('user-master-report-list', {
  headers: {
    'Authorization': `Bearer ` + localStorage.getItem('token')
  }
})


