import { commissionSettingsConstants } from '../_constants';

//-- get the list of terms
export function getCommissionSettings(state = {}, action) {
  switch (action.type) {
    case commissionSettingsConstants.C_SETTINGS_REQUEST:
      return {
        getCommissionSettings: false
      };

    case commissionSettingsConstants.C_SETTINGS_SUCCESS:
      return { getCommissionSettings:action.successAction};

    case commissionSettingsConstants.C_SETTINGS_FAILURE:
      return {
        getCommissionSettings: false,
      };

    default:
      return state
  }
}
