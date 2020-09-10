import { userConstants } from "../_constants";

//-- get the list of terms
export function uploadimage(state = {}, action) {
  switch (action.type) {
    case userConstants.UPLOAD_IMAGE_REQUEST:
      return {
        success: false
      };

    case userConstants.UPLOAD_IMAGE_SUCCESS:
      return { success: true, data: action.successAction.profile_image };

    case userConstants.UPLOAD_IMAGE_ERROR:
      return {
        success: false
      };

    default:
      return state;
  }
}
