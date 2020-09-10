//-- React Standard
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

//-- Custom
import TopBar from "../Common/TopBar/TopBar";
import SideBar from "../Common/SideBar/SideBar";
import Footer from "../Common/Footer/Footer";
import { userActions } from '../../_actions';
import { apiConstants } from '../../_constants/api.constants';
import Pagination from "../Common/Pagination/Pagination";
import DeletePopup from "../Common/Popup/DeletePopup";
//import ViewPopup from "../Common/Popup/ViewPopup";
import UsersDetail from "./UsersDetail";
//import EditPopup from "../Common/Popup/EditPopup";


class Users extends Component {
    //-- Main function
    render() {
        const { siteConstants } = this.props.language;
        return (
            <div id="wrapper">
                <SideBar />

                <div id="content-wrapper" className="d-flex flex-column">
                    {/* <!-- Main Content --> */}
                    <div id="content">

                        <TopBar />

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
                                                        <h1 className="h4 text-gray-900 mb-4">{userDetails.name}</h1>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <label>{siteConstants.GEN_NAME}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleFirstName"
                                                                placeholder={userDetails.name} />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label>{siteConstants.LABEL_COMPANY_NAME}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleLastName"
                                                                placeholder={userDetails.company_name} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>{siteConstants.LABEL_CERTIFICATION_NO}</label>
                                                        <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                                            placeholder={userDetails.dealer_certification_number} />
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <label>{siteConstants.LABEL_ADDRESS}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleInputPassword"
                                                                placeholder={userDetails.address} />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label>{siteConstants.LABEL_EMAIL}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleRepeatPassword"
                                                                placeholder={userDetails.email} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <label>{siteConstants.LABEL_CONTACT_NO}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleInputPassword"
                                                                placeholder={userDetails.phone_number} />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label>{siteConstants.LABEL_USER_CREATED_DATE}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleRepeatPassword"
                                                                placeholder={userDetails.createdAt} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <label>{siteConstants.LABEL_USER_APPROVAL_DATE}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleInputPassword"
                                                                placeholder={userDetails.createdAt} />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label>{siteConstants.LABEL_NUMBER_OF_BUYING}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleRepeatPassword"
                                                                placeholder="dummy" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <label>{siteConstants.LABEL_NUMBER_OF_SELLING}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleInputPassword"
                                                                placeholder="dummy" />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label>{siteConstants.LABEL_NUMBER_OF_SATISFACTION}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleRepeatPassword"
                                                                placeholder="dummy" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <label>{siteConstants.LABEL_BANK_ACCOUNTS}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleInputPassword"
                                                                placeholder="dummy" />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label>{siteConstants.LABEL_BANK}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleRepeatPassword"
                                                                placeholder="dummy" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <label>{siteConstants.LABEL_ACCOUNT}</label>
                                                            <input type="text" className="form-control form-control-user" id="exampleInputPassword"
                                                                placeholder="dummy" />
                                                        </div>

                                                    </div>
                                                    <button className="btn btn-primary btn-user btn-block">{siteConstants.LABEL_LOGIN}</button>
                                                </div>
                                            </div>
                                            <div className="col-sm-3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <!-- End of Main Content --> */}

                    <Footer />
                </div>
            </div>
        );
    }
}