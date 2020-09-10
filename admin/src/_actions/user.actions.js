import { userConstants,CouponConstants } from "../_constants";
import * as commonAction from "./commonAction";
import { userService, commonService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";
import { apiConstants } from "../_constants/api.constants";

//import rootReducer from '../_reducers';
//import { createStore } from 'redux'

//const store = createStore(rootReducer)

export const userActions = {
  login,
  //save,
  logout,
  changePassword,
  getUsersList,
  //updateUserStatus,
  getUserDetails,
  //updateUser,
  updateAdminProfileInfo,
  changeLanguage,
  getAdminDetails,
  updateAdminProfileData,
  getAllUserCount,
  uploadProfileImg,
  updatePendingUser,
  getDocumentList,
  updateDocumentList,
  forgetpassword,
};

//-- Login function
function login(apiName, username, password) {
  return dispatch => {
    dispatch(commonAction.request(userConstants.LOGIN_REQUEST, { username }));

    userService.login(apiName, username, password).then(
      user => {
        dispatch(commonAction.success(userConstants.LOGIN_SUCCESS, user));
        history.push("/dashboard");
      },
      error => {
        dispatch(commonAction.failure(userConstants.LOGIN_FAILURE, error));
        dispatch(alertActions.error(error.response.data.error.msg));
      }
    );
  };
}

//-- Save
// function save(user) {
//     return dispatch => {
//         dispatch(commonAction.request(userConstants.PROFILE_REQUEST, { user }));

//         userService.save(user)
//             .then(
//                 user => {
//                     dispatch(commonAction.success(userConstants.PROFILE_SUCCESS, user));
//                     history.push('/profile');
//                 },
//                 error => {
//                     dispatch(commonAction.failure(userConstants.PROFILE_FAILURE, error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };
// }

//-- logout
function logout() {
  //userService.logout();
  sessionStorage.removeItem("user");
  history.push("/login");
  return { type: userConstants.LOGOUT };
}

//-- Change Password
function changePassword(apiName, userData) {
  return dispatch => {
    dispatch(
      commonAction.request(userConstants.CHANGE_PASSWORD_REQUEST, userData)
    );
    userService.changePassword(apiName, userData).then(
      user => {
        dispatch(
          commonAction.success(userConstants.CHANGE_PASSWORD_SUCCESS, user)
        );
        if (user.success == false) {
          dispatch(
            commonAction.failure(
              userConstants.CHANGE_PASSWORD_ERROR,
              user.message
            )
          );
          dispatch(alertActions.error(user.message));
          setTimeout(function () {
            dispatch(alertActions.clear())
        }, 3000);
        } else {
          dispatch(alertActions.success("Password Updated Successfully"));
        }
        //history.push('/login');
        //dispatch(alertActions.success('Secret Token sent on your mail box.'));
      },
      error => {
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

//-- Update pending user data
function updatePendingUser(apiName, userData, paramForgetUserList) {

  let getApi=paramForgetUserList.api;
  let postData={};
  postData.page=paramForgetUserList.page;
  postData.orderBy=paramForgetUserList.orderBy;
  postData.orderByAscDesc=paramForgetUserList.orderByAscDesc;
  postData.role=paramForgetUserList.roleType;
  postData.perPage=paramForgetUserList.perPage;
  postData.text=paramForgetUserList.text;

  return dispatch => {
    dispatch(
      commonAction.request(
        userConstants.UPDATE_USER_DETAILS_REQUEST,
        userData
      )
    );
    userService.updatePendingData(apiName, userData).then(
      user => {
        dispatch(alertActions.success("Status updated successfully"));
          setTimeout(function () {
            dispatch(alertActions.clear())
        }, 3000);

        dispatch(getUsersList(getApi,postData))
        // dispatch(
        //   commonAction.success(
        //     userConstants.UPDATE_PENDING_USER_DETAILS_SUCCESS,
        //     user
        //   )
        // );
        // if (user.success == false) {
        //   dispatch(
        //     commonAction.failure(
        //       userConstants.UPDATE_PENDING_USER_DETAILS_FAILURE,
        //       user.message
        //     )
        //   );
        //   dispatch(alertActions.error(user.message));
        // } else {
        //   dispatch(alertActions.success("Status updated successfully"));
        //   setTimeout(function () {
        //     dispatch(alertActions.clear())
        // }, 3000);
        // }
      },
      error => {
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

//-- getUsersList
function getUsersList(apiName, userData) {
  return dispatch => {
    dispatch(commonAction.request(userConstants.USER_LIST_REQUEST, userData));
    userService.getUsersList(apiName, userData).then(
      user => {

        dispatch(
          commonAction.success(userConstants.USER_LIST_SUCCESS, user.data)
        );
        if (user.success == false) {
          dispatch(
            commonAction.failure(userConstants.USER_LIST_ERROR, user.message)
          );
          dispatch(alertActions.error(user.message));
        }
      },
      error => {
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

//-- Update user status, admin can chagnge the status of any user
// function updateUserStatus(apiName, userData) {
//     return dispatch => {
//         dispatch(commonAction.request(userConstants.USER_UPDATE_STATUS_REQUEST, userData));
//         userService.updateUserStatus(apiName, userData)
//             .then(
//                 user => {
//                     dispatch(commonAction.success(userConstants.USER_UPDATE_STATUS_SUCCESS, user));
//                     dispatch(alertActions.success(user.data.message));
//                     setTimeout(function () {
//                         dispatch(alertActions.clear())
//                     }, 3000);
//                 },
//                 error => {
//                     dispatch(alertActions.error(error.response.data.error));
//                 }
//             );
//     };
// }

//-- Get user detail on profile page
function getUserDetails(apiName, userData) {
  return dispatch => {
    dispatch(
      commonAction.request(userConstants.USER_GET_PROFILE_REQUEST, userData)
    );
    commonService.withToken(apiName, userData).then(
      user => {
        dispatch(
          commonAction.success(
            userConstants.USER_GET_PROFILE_SUCCESS,
            user.data
          )
        );

        if (user.success == false) {
          dispatch(
            commonAction.failure(
              userConstants.USER_GET_PROFILE_FAILURE,
              user.message
            )
          );
          dispatch(alertActions.error(user.message));
        }
      },
      error => {
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

function getAdminDetails(apiName, userData) {
  return dispatch => {
    dispatch(
      commonAction.request(userConstants.USER_GET_PROFILE_REQUEST, userData)
    );
    userService.getAdminData(apiName, userData).then(
      user => {
        dispatch(
          commonAction.success(
            userConstants.USER_GET_PROFILE_SUCCESS,
            user.data
          )
        );

        if (user.success == false) {
          dispatch(
            commonAction.failure(
              userConstants.USER_GET_PROFILE_FAILURE,
              user.message
            )
          );
          dispatch(alertActions.error(user.message));
        }
      },
      error => {
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

//-- Update user Profile... currently we are using same table, so we are updating from common function
//-- might be will update in future
// function updateUser(apiName, userData)
// {
//     return updateAdminProfileInfo(apiName, userData);
// }

//-- Update Admin user Profile
function updateAdminProfileInfo(apiName, userData) {
  return dispatch => {
    dispatch(
      commonAction.request(userConstants.ADMIN_UPDATE_PROFILE_REQUEST, userData)
    );
    commonService.withTokenPut(apiName, userData).then(
      user => {
        dispatch(
          commonAction.success(userConstants.ADMIN_UPDATE_PROFILE_SUCCESS, user)
        );
        dispatch(alertActions.success(user.data.message));
        if (user.success == false) {
          dispatch(
            commonAction.failure(
              userConstants.ADMIN_UPDATE_PROFILE_FAILURE,
              user.message
            )
          );
          dispatch(alertActions.error(user.message));
        }
        // setTimeout(function() {
        //   dispatch(alertActions.clear());
        // }, 3000);
      },
      error => {
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

function updateAdminProfileData(apiName, userData) {
  return dispatch => {
    dispatch(
      commonAction.request(userConstants.ADMIN_UPDATE_PROFILE_REQUEST, userData)
    );
    userService.updateAdminData(apiName, userData).then(
      user => {
        dispatch(
          commonAction.success(userConstants.ADMIN_UPDATE_PROFILE_SUCCESS, user)
        );
    
        dispatch(alertActions.success(user.data.message));
        if (user.success == false) {
          dispatch(
            commonAction.failure(
              userConstants.ADMIN_UPDATE_PROFILE_FAILURE,
              user.message
            )
          );
          dispatch(alertActions.error(user.message));
        }
        dispatch(alertActions.success("Profile Updated Successfully"));
        setTimeout(function() {
          dispatch(alertActions.clear());
        }, 3000);
      },
      error => {
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

function getAllUserCount(apiName) {
  return dispatch => {
    dispatch(commonAction.request(userConstants.USER_COUNT_REQUEST));
    userService.getAllUserCount(apiName).then(
      user => {
        dispatch(commonAction.success(userConstants.USER_COUNT_SUCCESS, user));
    
        dispatch(alertActions.success(user.data.message));
        if (user.success == false) {
          dispatch(
            commonAction.failure(userConstants.USER_COUNT_ERROR, user.message)
          );
          dispatch(alertActions.error(user.message));
        }
        setTimeout(function() {
          dispatch(alertActions.clear());
        }, 3000);
      },
      error => {
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

//-- Upload Admin Profile Image
function uploadProfileImg(apiName, userData) {
  return dispatch => {
    dispatch(
      commonAction.request(userConstants.UPLOAD_IMAGE_REQUEST, userData)
    );
    userService.uploadAdminProfileImg(apiName, userData).then(
      user => {
        dispatch(
          commonAction.success(userConstants.UPLOAD_IMAGE_SUCCESS, user.data.data)
        );
        dispatch(alertActions.success("Image uploaded successfully"));
        setTimeout(function() {
          dispatch(alertActions.clear());
        }, 3000);
      },
      error => {
        dispatch(
          commonAction.failure(userConstants.UPLOAD_IMAGE_ERROR, user.message)
        );
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

//-- get document list
function getDocumentList(apiName, userData) {
  return dispatch => {
    dispatch(
      commonAction.request(userConstants.USER_GET_PROFILE_REQUEST, userData)
    );
    userService.getDocumentDetails(apiName, userData).then(
      user => {
        dispatch(
          commonAction.success(userConstants.USER_GET_PROFILE_SUCCESS, user)
        );
      },
      error => {
        dispatch(
          commonAction.failure(userConstants.USER_GET_PROFILE_ERROR, user.message)
        );
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

//-- update document list
function updateDocumentList(apiName, userData) {
 
  return dispatch => {
    dispatch(
      commonAction.request(userConstants.USER_GET_PROFILE_REQUEST, userData)
    );
    userService.updateDocumentDetails(apiName, userData).then(
      user => {
        dispatch(
          commonAction.success(userConstants.USER_GET_PROFILE_SUCCESS, user)
        );
        dispatch(alertActions.success("Document Updated Successfully"));
        setTimeout(function() {
          dispatch(alertActions.clear());
        }, 3000);
      },
      error => {
        dispatch(
          commonAction.failure(userConstants.USER_GET_PROFILE_ERROR, user.message)
        );
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

//-- forget password
function forgetpassword(apiName, userData) {
 
  return dispatch => {
    dispatch(
      commonAction.request(userConstants.UPDATE_USER_DETAILS_REQUEST, userData)
    );
    commonService.withTokenPut(apiName, userData).then(
      user => {
        dispatch(
          commonAction.success(userConstants.UPDATE_USER_DETAILS_SUCCESS, user)
        );
        dispatch(alertActions.success("Password Recovered Successfully"));
        setTimeout(function() {
          dispatch(alertActions.clear());
        }, 3000);
      },
      error => {
        dispatch(
          commonAction.failure(userConstants.UPDATE_USER_DETAILS_FAILURE, user.message)
        );
        dispatch(alertActions.error(error.response.data.error));
      }
    );
  };
}

function changeLanguage(language) {
  return { type: language };
}
