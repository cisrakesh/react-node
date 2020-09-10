export function request(REQUEST, requestAction) { 
    return { 
        type: REQUEST, 
        requestAction 
    } 
}

export function success(SUCCESS, successAction) {
    return { 
        type: SUCCESS, 
        successAction 
    } 
}

export function failure(FAILURE, errorAction) { 
    //console.log("REST ",errorAction.response);
    //errorAction = errorAction.response;
    return { 
        type: FAILURE, 
        errorAction 
    } 
}