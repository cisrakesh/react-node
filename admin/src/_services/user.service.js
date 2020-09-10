import config from 'config';
import { authHeader,history } from '../_helpers';
import axios from 'axios';

export const userService = {
    login,
    //save,
    changePassword,
    getUsersList,
    getAdminData,
    updateAdminData,
    getAllUserCount,
    uploadAdminProfileImg,
    updatePendingData,
    getData,
    getDocumentDetails,
    updateDocumentDetails,
    uploadDummyfiles
    //updateUserStatus
};

// //-- We can check admin/user login 
// function login(username, password) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//     };

//     return fetch(`${config.apiUrl}/login`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             //console.log("TEST ",user);
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             sessionStorage.setItem('user', JSON.stringify(user));
//             //sessionStorage.setItem('token', JSON.stringify(user.token));
//             //console.log(user);
//             return user;
//         });
// }
function login(apiName, email, password) {
    const userInfo = {
        email: email,
        password: password
    };
    return axios.post(`${config.apiUrl}`+apiName, userInfo)
        //.then(handleResponse)
        .then((response) => {
            if (response) {
                sessionStorage.setItem('user', JSON.stringify(response.data.user));
                sessionStorage.setItem('token', JSON.stringify(response.data.token));
            }
            return response.data ;
        }).catch((error)=>{ 
            return Promise.reject(error);});
}

function updateAdminData(apiName, data) {
    let tokenObj = JSON.parse(sessionStorage.getItem("token"))
    return axios({
        method: 'PUT',
        url: `${config.apiUrl+apiName}`,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenObj}` },
        data: data
    }).then((handleResponse) => {
        
        return handleResponse;
    });
}

// function logout() {
//     // remove user from local storage to log user out
//     sessionStorage.removeItem('user');
//     console.log("SD");
//     history.push('/login');
// }

//-- Save
// function save(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ user })
//     };

//     return fetch(`${config.apiUrl}/user_profile.php`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             sessionStorage.setItem('user', JSON.stringify(user));

//             return user;
//         });
// }
//-- Change Password
function changePassword(apiName, userData) {
    let token = JSON.parse(sessionStorage.getItem('token'));
    return axios({
        method: 'PUT',
        url: `${config.apiUrl+apiName}`,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        data: userData
    }).then(handleResponse);
}

//-- getUsersList
function getUsersList(apiName, userData) {
    let token = JSON.parse(sessionStorage.getItem('token')); 
    return axios({
        method: 'POST',
        url: `${config.apiUrl+apiName}`,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        data: userData
    }).then(handleResponse);
}

//get admin details
function getAdminData(apiName, userData) {
    let token = JSON.parse(sessionStorage.getItem('token'));    
    return axios({
        method: 'GET',
        url: `${config.apiUrl+apiName}`,
        headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` },
        data: userData
    }).then(handleResponse);
}

//get driver profile
function getDocumentDetails(apiName, userData) {
    let id=userData.id;
    let token = JSON.parse(sessionStorage.getItem('token'));     
    return axios({
        method: 'GET',
        url: `${config.apiUrl+apiName}`+'/'+id,
        headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` },
    }).then(handleResponse);
}   

//get all user list
function getAllUserCount(apiName) {
    let token = JSON.parse(sessionStorage.getItem('token'));    
    return axios({
        method: 'GET',
        url: `${config.apiUrl+apiName}`,
        headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` }
    }).then(handleResponse);
}

function uploadAdminProfileImg(apiName,userData) {

    var getFile=userData.files;
    var files = new FormData();
    files.append("profile_image", getFile);
    let token = JSON.parse(sessionStorage.getItem('token'));    
    return axios({  
        method: 'PUT',
        url: `${config.apiUrl+apiName}`,
        // headers: { 'Content-Type': 'multipart/form-data', 'Authorization':`Bearer ${token}`,"type": "formData"},
        headers: { 'Authorization':`Bearer ${token}`},
        data: files
    }).then(handleResponse);
}

function updatePendingData(apiName,userData) {
   let token = JSON.parse(sessionStorage.getItem('token'));    
    return axios({
        method: 'PUT',
        url: `${config.apiUrl+apiName}`,
        headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}`},
        data:userData,
     
    }).then(handleResponse);
}

//get data
function getData(apiName, userData) {
    let token = JSON.parse(sessionStorage.getItem('token'));    
    return axios({
        method: 'GET',
        url: `${config.apiUrl+apiName}`,
        headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` },
        data: userData
    }).then(handleResponse);
}

//update driver profile
function updateDocumentDetails(apiName, userData) {
    let id=userData.id;
    let postData={}
    postData.licence_verified=userData.licence_verified;
    postData.identity_verified=userData.identity_verified
    let token = JSON.parse(sessionStorage.getItem('token'));     
    return axios({
        method: 'PUT',
        url: `${config.apiUrl+apiName}`+'/'+id,
        headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` },
        data:postData
    }).then(handleResponse);
}   

//-- updateUserStatus
// function updateUserStatus(apiName, userData) {
//     let token = JSON.parse(sessionStorage.getItem('token'));    
//     return axios({
//         method: 'POST',
//         url: `${config.apiUrl+apiName}`,
//         headers: { 'Content-Type': 'application/json', 'Authorization': token},
//         data: userData
//     }).then(handleResponse);
// }

// function handleResponse(response) { 
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         //console.log(data);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.error) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }


//upload dummy files
function uploadDummyfiles(apiName,userData) {  
    var getFile=userData.files;
    var files = new FormData();
    let fileArray=[];
    for(let i=0;i<getFile.length;i++)
    {
    files.append("profile_image", getFile[i]);
    }
    let token = JSON.parse(sessionStorage.getItem('token'));    
    return axios({  
        method: 'PUT',
        url: `${config.apiUrl+apiName}`,
        // headers: { 'Content-Type': 'multipart/form-data', 'Authorization':`Bearer ${token}`,"type": "formData"},
        headers: { 'Authorization':`Bearer ${token}`},
        data: files
    }).then(handleResponse);
}



function handleResponse(response) {

    //console.log('response', response);

    if (response.status == 200||response.status == 201) {
        return response;
    } else {
        const error = response;
        return Promise.reject(error);
    }

}


// function handleSearchUser(entity, userData){
//      let token = JSON.parse(sessionStorage.getItem('token'));    
//      return axios({
//          method: 'POST',
//          url: `${config.apiUrl+entity}`,
//          headers: { 'Content-Type': 'application/json', 'Authorization': token},
//          data: userData
//      }).then(handleResponse);
// }