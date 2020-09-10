import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiConstants } from '../../../_constants/api.constants';

class SideBar extends Component {
    logout() {
        sessionStorage.setItem("user", null);
    }

    render() {
        const { siteConstants } = this.props.language;
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/* <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">{siteConstants.SITE_NAME}</div>
                </a>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                    <Link className="nav-link" to="/dashboard"><i className="fas fa-fw fa-tachometer-alt"></i> <span>{siteConstants.MENU_DASHBOARD}</span></Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>{siteConstants.GEN_USERS}</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/users">{siteConstants.MENU_USER_LIST}</Link>
                            <Link className="collapse-item" to="/driver-users">{siteConstants.MENU_DRIVER_LIST}</Link>
                        </div>
                    </div>
                </li>


                {/* <!-- Nav Item - Tables --> */}

                <li className="nav-item">
                    <Link className="nav-link" to="/document-verification"><i className="fas fa-fw fa-table"></i> <span>{siteConstants.MENU_DOCUMENT_VERIFICATION}</span></Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/coupon"><i className="fas fa-ticket-alt"></i> <span>{siteConstants.MENU_COUPON}</span></Link>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseThree">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>{siteConstants.MENU_SETTING}</span>
                    </a>
                    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/commission-settings">{siteConstants.MENU_COMMISSION_SETTING}</Link>
                            <Link className="collapse-item" to="/general-settings">{siteConstants.MENU_GENERAL_SETTING}</Link>
                        </div>
                    </div>
                </li>


                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                        <i className="far fa-file"></i>
                        <span>{siteConstants.MENU_REPORTS}</span>
                    </a>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/reports">{siteConstants.MENU_USER_REPORT}</Link>
                            <Link className="collapse-item" to="/revenue">{siteConstants.MENU_REVENUE}</Link>
                            <Link className="collapse-item" to="/ride">{siteConstants.MENU_RIDE}</Link>
                        </div>
                    </div>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <Link className="nav-link" to="/login"><i className="fas fa-sign-out-alt"></i> <span>{siteConstants.MENU_LOGOUT}</span></Link>
                </li>

            </ul>

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

const connectedSideBar = connect(mapStateToProps)(SideBar);
export default connectedSideBar;