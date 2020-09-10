import config from 'config';
import axios from 'axios';

export const commonService = {
    withToken,
    withOutToken,
    handleResponse,
};

//-- It's common function for using the token
function withToken(apiName, data) {
    let tokenObj = JSON.parse(sessionStorage.getItem("token"))
    return axios({
        method: 'POST',
        url: `${config.apiUrl+apiName}`,
        headers: { 'Content-Type': 'application/json', 'Authorization': tokenObj },
        data: data
    }).then((handleResponse) => {
        
        return handleResponse;
    });
};

//-- It's common function for using without token
function withOutToken(apiName, data) {
    return axios({
        method: 'POST',
        url: `${config.apiUrl+apiName}`,
        data: data
    }).then(handleResponse);
};

function handleResponse(response) {
    //console.log('response', response);
    if (response.status == 200||response.status == 201) {
        return response;
    } else {
        const error = response;
        return Promise.reject(error);
    }
}