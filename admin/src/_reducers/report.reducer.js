import { reportConstants } from '../_constants';

//-- get the list of driver
export function getDriverList(state = {}, action) {
  switch (action.type) {
    case reportConstants.GET_DRIVER_LIST_REQUEST:
      return {
        getDriverList: false
      };

    case reportConstants.GET_DRIVER_LIST_SUCCESS:
      return { getDriverList:action.successAction};

    case reportConstants.GET_DRIVER_LIST_FAILURE:
      return {
        getDriverList: false,
      };

    default:
      return state
  }
}

//-- get the list of activated user
export function getActivatedUser(state = {}, action) {
  switch (action.type) {
    case reportConstants.GET_ACTIVATED_USER_REQUEST:
      return {
        getActivatedUser: false
      };

    case reportConstants.GET_ACTIVATED_USER_SUCCESS:
      return { getActivatedUser:action.successAction};

    case reportConstants.GET_ACTIVATED_USER_FAILURE:
      return {
        getActivatedUser: false,
      };

    default:
      return state
  }
}

//-- get the list of activated user
export function getPendingCounts(state = {}, action) {
  switch (action.type) {
    case reportConstants.GET_PENDING_COUNTS_REQUEST:
      return {
        getPendingCounts: false
      };

    case reportConstants.GET_PENDING_COUNTS_SUCCESS:
      return { getPendingCounts:action.successAction};

    case reportConstants.GET_PENDING_COUNTS_FAILURE:
      return {
        getPendingCounts: false,
      };

    default:
      return state
  }
}
