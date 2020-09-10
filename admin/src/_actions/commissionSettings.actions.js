import { commissionSettingsConstants } from '../_constants';
import * as commonAction from './commonAction';
import { userService, commonService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { apiConstants } from '../_constants/api.constants';


export const commissionSettingsActions = {
    getCommissionSettings,
    updateCommissionSettings,
    updateGeneralSettings
};


//-- Get user detail on profile page
function getCommissionSettings(apiName,userData) {
    return dispatch => {
        dispatch(commonAction.request(commissionSettingsConstants.C_SETTINGS_REQUEST));
        userService.getData(apiName, userData)
            .then(
                user => {
                    dispatch(commonAction.success(commissionSettingsConstants.C_SETTINGS_SUCCESS, user.data));
                    if (user.success == false) {
                        dispatch(commonAction.failure(commissionSettingsConstants.C_SETTINGS_FAILURE, user.message));
                        dispatch(alertActions.error(user.message));
                    } 
                },
                error => {
                    dispatch(alertActions.error(error.response.data.error));
                }
            );
    };
}


//-- Update Admin user Profile
function updateCommissionSettings(apiName, userData ,getApi,postData) {
    return dispatch => {
        dispatch(commonAction.request(commissionSettingsConstants.C_SETTINGS_REQUEST, userData));
        commonService.withTokenPut(apiName, userData)
            .then(
                user => {
                    dispatch(commonAction.success(commissionSettingsConstants.C_SETTINGS_SUCCESS, user));
                    dispatch(alertActions.success(user.data.message));
                    if (user.success == false) {
                        dispatch(commonAction.failure(commissionSettingsConstants.C_SETTINGS_FAILURE, user.message));
                        dispatch(alertActions.error(user.message));
                    } 
                    dispatch(alertActions.success("commission setting updated"));
                    setTimeout(function () {
                        dispatch(alertActions.clear())
                    }, 3000);

                    dispatch(getCommissionSettings(getApi,postData))
                },
                error => {
                    dispatch(alertActions.error(error.response.data.error));
                }
            );
    };
}

//-- update detail on general setting page
function updateGeneralSettings(apiName, userData ,getApi,postData) {
    return dispatch => {
        dispatch(commonAction.request(commissionSettingsConstants.C_SETTINGS_REQUEST, userData));
        commonService.withTokenPut(apiName, userData)
            .then(
                user => {
                    dispatch(commonAction.success(commissionSettingsConstants.C_SETTINGS_SUCCESS, user));
                    dispatch(alertActions.success(user.data.message));
                    if (user.success == false) {
                        dispatch(commonAction.failure(commissionSettingsConstants.C_SETTINGS_FAILURE, user.message));
                        dispatch(alertActions.error(user.message));
                    } 
                    dispatch(alertActions.success("general setting updated"));
                    setTimeout(function () {
                        dispatch(alertActions.clear())
                    }, 3000);

                    dispatch(getCommissionSettings(getApi,postData))
                },
                error => {
                    dispatch(alertActions.error(error.response.data.error));
                }
            );
    };
}