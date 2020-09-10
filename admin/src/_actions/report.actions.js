import { reportConstants,userConstants } from '../_constants';
import * as commonAction from './commonAction';
import { userService, commonService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { apiConstants } from '../_constants/api.constants';


export const reportActions = {
    getDriverList,
    getActivatedUser,
    getPendingCount,
    DummyFileUpload
};

//-- Get user detail on profile page
function getDriverList(apiName,userData) {
    return dispatch => {
        dispatch(commonAction.request(reportConstants.GET_DRIVER_LIST_REQUEST));
        commonService.withToken(apiName, userData)
            .then(
                user => {
                    dispatch(commonAction.success(reportConstants.GET_DRIVER_LIST_SUCCESS, user.data));
                    if (user.success == false) {
                        dispatch(commonAction.failure(reportConstants.GET_DRIVER_LIST_FAILURE, user.message));
                        dispatch(alertActions.error(user.message));
                    } 
                },
                error => {
                    dispatch(alertActions.error(error.response.data.error));
                }
            );
    };
}

//-- Get user detail on profile page
function getActivatedUser(apiName,userData) {
    return dispatch => {
        dispatch(commonAction.request(reportConstants.GET_ACTIVATED_USER_REQUEST));
        commonService.withToken(apiName, userData)
            .then(
                user => {
                    dispatch(commonAction.success(reportConstants.GET_ACTIVATED_USER_SUCCESS, user.data));
                    if (user.success == false) {
                        dispatch(commonAction.failure(reportConstants.GET_ACTIVATED_USER_FAILURE, user.message));
                        dispatch(alertActions.error(user.message));
                    } 
                },
                error => {
                    dispatch(alertActions.error(error.response.data.error));
                }
            );
    };
}

//-- Get user detail on profile page
function getPendingCount(apiName,userData) {
    return dispatch => {
        dispatch(commonAction.request(reportConstants.GET_PENDING_COUNTS_REQUEST));
        commonService.withToken(apiName,userData)
            .then(
                user => {
                    dispatch(commonAction.success(reportConstants.GET_PENDING_COUNTS_SUCCESS, user.data));
                    if (user.success == false) {
                        dispatch(commonAction.failure(reportConstants.GET_PENDING_COUNTS_FAILURE, user.message));
                        dispatch(alertActions.error(user.message));
                    } 
                },
                error => {
                    dispatch(alertActions.error(error.response.data.error));
                }
            );
    };
}


//-- dummy file upload
function DummyFileUpload(apiName,userData) {
 
    return dispatch => {
        dispatch(commonAction.request(reportConstants.GET_PENDING_COUNTS_REQUEST));
        userService.uploadDummyfiles(apiName,userData)
            .then(
                user => {
                    dispatch(commonAction.success(reportConstants.GET_PENDING_COUNTS_SUCCESS, user.data));
                    if (user.success == false) {
                        dispatch(commonAction.failure(reportConstants.GET_PENDING_COUNTS_FAILURE, user.message));
                        dispatch(alertActions.error(user.message));
                    } 
                },
                error => {
                    dispatch(alertActions.error(error.response.data.error));
                }
            );
    };
}
