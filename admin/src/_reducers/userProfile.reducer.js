import { userConstants } from '../_constants';

//-- Save user Profile
export function userProfile(state = {}, action) {
  switch (action.type) {
    case userConstants.USER_PROFILE_REQUEST:
      return {
        userProfile: false
      };
    case userConstants.USER_PROFILE_SUCCESS:
      return {
        userProfile: true,
      };
    case userConstants.USER_PROFILE_FAILURE:
      return {
        userProfile: false,
      };
    default:
      return state
  }
}



export function getUsersList(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case userConstants.USER_LIST_REQUEST:
      return {
        getUsersList: false
      };

    case userConstants.USER_LIST_SUCCESS:
      return { isgetUserList:true , getUsersList:action.successAction};

    case userConstants.USER_LIST_FAILURE:
      return {
        getUsersList: false,
      };

    case userConstants.USER_SEARCH_REQUEST:
      return { isgetUserList:true , getUsersList:successAction.data};

    default:
      return state
  }
}

//-- We are updating user status in admin area
// export function updateUserStatus(state = {}, action) {
//   let newState = {};
//   switch (action.type) {
//     case userConstants.USER_UPDATE_STATUS_REQUEST:
//       return {
//         updateUserStatus: false
//       };
//     case userConstants.USER_UPDATE_STATUS_SUCCESS:
//       newState = Object.assign({}, state);
//       newState[action.type] = action.successAction.data;
//       return newState;

//     case userConstants.USER_UPDATE_STATUS_FAILURE:
//       return {
//         updateUserStatus: false,
//       };
//     default:
//       return state
//   }
// }

//-- manage user profile detail
export function userDetails(state = {}, action) {
  switch (action.type) {
    case userConstants.USER_GET_PROFILE_REQUEST:
      return {
        userDetails: false
      };
    case userConstants.USER_GET_PROFILE_SUCCESS:
      return {
        userDetails: true,
        userDetails:action.successAction
      };
    case userConstants.USER_GET_PROFILE_FAILURE:
      return {
        userDetails: false,
      };
    default:
      return state
  }
}

//-- update the admin profile detail
export function updateAdminProfile(state = {}, action) {
  switch (action.type) {
    case userConstants.ADMIN_UPDATE_PROFILE_REQUEST:
      return {
        adminProfileDetails: false
      };
    case userConstants.ADMIN_UPDATE_PROFILE_SUCCESS:
      return {
        adminProfileDetails: true,
        adminProfileDetail:action.successAction
      };
    case userConstants.ADMIN_UPDATE_PROFILE_FAILURE:
      return {
        adminProfileDetails: false,
      };
    default:
      return state
  }
}

export function updatedAccountDetails(state = {}, action) {
  switch (action.type) {
    case userConstants.UPDATE_USER_DETAILS_REQUEST:
      return {
        updatedAccountDetails: false
      };
    case userConstants.UPDATE_USER_DETAILS_SUCCESS:
      return {
        updatedAccountDetails: true,
        updatedAccountDetails:action.successAction
      };
    case userConstants.UPDATE_USER_DETAILS_FAILURE:
      return {
        updatedAccountDetails: false,
      };
    default:
      return state
  }
}

export function getUserCount(state = {}, action) {
  switch (action.type) {
    case userConstants.USER_COUNT_REQUEST:
      return {
        getUserCount: false
      };
    case userConstants.USER_COUNT_SUCCESS:
      return {
        getUserCount: true,
        getUserCount:action.successAction
      };
    case userConstants.USER_COUNT_ERROR:
      return {
        getUserCount: false,
      };
    default:
      return state
  }
}

