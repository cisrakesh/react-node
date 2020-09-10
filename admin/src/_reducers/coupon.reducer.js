import { CouponConstants } from '../_constants';

//-- add coupons
export function addCoupouns(state = {}, action) {
  switch (action.type) {
    case CouponConstants.COUPON_ADDED_REQUEST:
      return {
        addCoupouns: false
      };

    case CouponConstants.COUPON_ADDED_SUCCESS:
      return { addCoupouns:action.successAction};

    case CouponConstants.COUPON_ADDED_FAILURE:
      return {
        addCoupouns: false,
      };

    default:
      return state
  }
}


//-- get coupons list
export function getCoupounList(state = {}, action) {
  switch (action.type) {
    case CouponConstants.GET_COUPON_LIST_REQUEST:
      return {
        getCoupounList: false
      };

    case CouponConstants.GET_COUPON_LIST_SUCCESS:
      return { getCoupounList:action.successAction};

    case CouponConstants.GET_COUPON_LIST_FAILURE:
      return {
        getCoupounList: false,
      };

    default:
      return state
  }
}

