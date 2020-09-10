
import { CouponConstants } from '../_constants';
import * as commonAction from './commonAction';
import { commonService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { apiConstants } from '../_constants/api.constants';


export const couponActions = {
    addCoupon,
    getCoupounList,
    updateCoupon,
    deleteCoupon
};


//-- insert coupon
function addCoupon(apiName, userData,getApi,postData) {
 
    return dispatch => {
      dispatch(
        commonAction.request(CouponConstants.COUPON_ADDED_REQUEST, userData)
      );
      commonService.withTokenPut(apiName, userData).then(
        user => {
         
          dispatch(alertActions.success("Coupon Added Successfully"));
          setTimeout(function() {
            dispatch(alertActions.clear());
          }, 3000);
  
          dispatch(getCoupounList(getApi,postData));
        },
        error => {
          dispatch(
            commonAction.failure(CouponConstants.COUPON_ADDED_FAILURE,user.message)
          );
          dispatch(alertActions.error(error.response.data.error));
        }
      );
    };
  }
  
  //-- get coupon list
  function getCoupounList(apiName, userData) {
  
    return dispatch => {
    
      dispatch(
        commonAction.request(CouponConstants.GET_COUPON_LIST_REQUEST, userData)
      );
      commonService.withTokenPut(apiName, userData).then(
        user => {
          
          dispatch(
            commonAction.success(CouponConstants.GET_COUPON_LIST_SUCCESS, user)
          );
        },
        error => {
          dispatch(
            commonAction.failure(CouponConstants.GET_COUPON_LIST_FAILURE, user.message)
          );
          dispatch(alertActions.error(error.response.data.error));
        }
      );
    };
  }
  
  //-- update coupon data
  function updateCoupon(apiName, userData,getApi,postData) {
    return dispatch => {
      dispatch(
        commonAction.request(CouponConstants.UPDATE_COUPON_REQUEST, userData)
      );
      commonService.withTokenPut(apiName, userData).then(
        user => {
  
          dispatch(alertActions.success("Coupon Updated successfully"));
          setTimeout(function () {
            dispatch(alertActions.clear())
          }, 3000);
  
          dispatch(getCoupounList(getApi,postData));
  
  
        },
        error => {
          dispatch(
            commonAction.failure(CouponConstants.UPDATE_COUPON_FAILURE, user.message)
          );
          dispatch(alertActions.error(error.response.data.error));
        }
      );
    };
  }
  
  //-- delete coupon data
  function deleteCoupon(apiName, couponData,getApi,postData) {
    return dispatch => {
      dispatch(
        commonAction.request(CouponConstants.DELETE_COUPON_REQUEST, couponData)
      );
      commonService.withTokenPut(apiName, couponData).then(
        user => {
          // dispatch(
          //   commonAction.success(CouponConstants.DELETE_COUPON_SUCCESS, user)
          // );
          dispatch(alertActions.success("Coupon Deleted successfully"));
          setTimeout(function () {
            dispatch(alertActions.clear())
          }, 3000);
  
          dispatch(getCoupounList(getApi,postData));
  
        },
        error => {
          dispatch(
            commonAction.failure(CouponConstants.DELETE_COUPON_FAILURE, user.message)
          );
          dispatch(alertActions.error(error.response.data.error));
        }
      );
    };
  }