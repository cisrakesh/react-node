import React, { Component } from "react";
import { connect } from 'react-redux';

class UsersDetail extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const userDetails = this.props.userData;
      
        const { siteConstants } = this.props.language;

        return (
            <div className="container-fluid">

                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">{siteConstants.LABEL_USER_DETAILS}</h1>
                    <a href="#" onClick={this.props.backButton} className="btn btn-secondary btn-icon-split">
                        <span className="icon text-white-50">
                            <i className="fas fa-arrow-left"></i>
                        </span>
                        <span className="text">{siteConstants.BTN_BACK}</span>
                    </a>
                </div>

                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="table-responsive">
                            <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <img className="img-profile rounded-circle" style={{width:"150px"}} src={userDetails.profile_image? userDetails.profile_image :"./assets/img/svg/user.svg"} />
                                            <h1 className="h4 text-gray-900 mb-4">{userDetails.firstname +" "+ userDetails.lastname}</h1>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12 mb-3 mb-sm-0">
                                                <label>{siteConstants.GEN_NAME}</label>
                                                <input type="text" className="form-control form-control-user" id="exampleFirstName" 
                                                    placeholder={userDetails.firstname +" "+ userDetails.lastname} />
                                            </div>
                                        </div>
                                        
                                        <div className="form-group row">
                                            <div className="col-sm-12 mb-3 mb-sm-0">
                                                <label>{siteConstants.LABEL_EMAIL}</label>
                                                <input type="text" className="form-control form-control-user" id="exampleLastName"
                                                    placeholder={userDetails.email} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <label>{siteConstants.LABEL_CONTACT_NO}</label>
                                                <input type="text" className="form-control form-control-user" id="exampleInputPassword"
                                                    placeholder={userDetails.mobile_number} />
                                            </div>
                                            <div className="col-sm-6">
                                                <label>{siteConstants.LABEL_USER_CREATED_DATE}</label>
                                                <input type="text" className="form-control form-control-user" id="exampleRepeatPassword"
                                                    placeholder={userDetails.created_date} />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-sm-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//-- Here we are adding Reducer names, so it can be get data from reducers using store
function mapStateToProps(state) {
    const { language } = state;
    return {
        language
    };
}

const connectedUsersDetail = connect(mapStateToProps)(UsersDetail);
export default connectedUsersDetail;