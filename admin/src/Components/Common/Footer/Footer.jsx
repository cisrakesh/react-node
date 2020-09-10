import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Footer extends Component {
    logout() {
        sessionStorage.setItem("user", null);
    }

    render() {
        const { siteConstants } = this.props.language;

        return (
            <Fragment>
                {/* <!-- Footer --> */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Your Website 2019</span>
                        </div>
                    </div>
                </footer>
                {/* <!-- End of Footer --> */}

                {/* <!-- Scroll to Top Button--> */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>

                {/* <!-- Logout Modal--> */}
                <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{siteConstants.MSG_LOGOUT_WINDOW_READY}</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">{siteConstants.MSG_LOGOUT_WINDOW_DESCRIPTION}</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">{siteConstants.BTN_CANCEL}</button>
                                <a className="btn btn-primary" href="/login" onClick={this.logout}>{siteConstants.MENU_LOGOUT}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
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

const connectedFooter = connect(mapStateToProps)(Footer);
export default connectedFooter;
