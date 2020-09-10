import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { userProfile, getUsersList, userDetails ,updatedAccountDetails,getUserCount } from './userProfile.reducer';
import { getCommissionSettings } from './commissionSettings.reducer';
import{alert} from'./alert.reducer';
import { language } from './language.reducer';
import {uploadimage} from './uploadimage.reducer';
import {getCoupounList} from './coupon.reducer';
import {getDriverList,getActivatedUser,getPendingCounts} from './report.reducer';

const rootReducer = combineReducers({
  authentication,
  userProfile,
  getUsersList,
  getUserCount,
  userDetails,
  updatedAccountDetails,
  getCoupounList,
  getCommissionSettings,
  getPendingCounts,
  alert,
  language,
  uploadimage,
  getDriverList,
  getActivatedUser
});

export default rootReducer;