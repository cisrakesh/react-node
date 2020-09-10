import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { bindActionCreators } from 'redux';
import TopBar from "../Common/TopBar/TopBar";
import SideBar from "../Common/SideBar/SideBar";
import Footer from "../Common/Footer/Footer";
import { apiConstants } from '../../_constants/api.constants';


class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword:'',
            newPassword: '',
            confirmPassword: '',
            error: {
                errNewPassword: '',
                errConfirmPassword: '',
                errPasswordNotMatch: '',
                errOldPassword:''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //-- we are setting the Values
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    //-- Click on this function and data save into the database
    handleSubmit(e) {
        e.preventDefault();

        const { siteConstants } = this.props.language;

        const { oldPassword,newPassword, confirmPassword } = this.state;

        let errNewPassword = '';
        let errConfirmPassword = '';
        let errPasswordNotMatch = '';
        let errOldPassword ='';
        if(!oldPassword){
            errOldPassword = siteConstants.ERR_CAN_NOT_BLANK;
        }
        if (!newPassword) {
            errNewPassword = siteConstants.ERR_BLANK_NEW_PASSWORD;
        }
        if (!confirmPassword) {
            errConfirmPassword = siteConstants.ERR_BLANK_CONFIRM_PASSWORD;
        }

        if (newPassword != confirmPassword) {
            errPasswordNotMatch = siteConstants.ERR_BLANK_PASSWORD_NOT_MATCH;
        }
        if (newPassword && confirmPassword && oldPassword) {
            let postData = {};
            postData.oldPassword =oldPassword;
            postData.password = newPassword;
            postData.confPassword=confirmPassword;
            
            postData.id = JSON.parse(sessionStorage.getItem('user'))._id,
                this.props.actions.changePassword(apiConstants.CHANGE_ADMIN_PASSWORD, postData);
        }
        this.setState({ error: { errNewPassword: errNewPassword,
             errConfirmPassword: errConfirmPassword,
              errPasswordNotMatch: errPasswordNotMatch,
              errOldPassword:errOldPassword } })

    }

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
                                <h1 className="h3 mb-0 text-gray-800">{siteConstants.LABEL_CHANGE_PASSWORD}</h1>
                            </div>

                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div className="row">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-6">
                                                <form role="form" onSubmit={this.handleSubmit}>
                                                    <div className="p-5">
                                                        <label className="my-error">{this.state.error.errPasswordNotMatch}</label>

                                                        <div className="form-group">
                                                            <label>{siteConstants.LABEL_OLD_PASSWORD}</label>
                                                            <label className="my-error">{this.state.error.errOldPassword}</label>
                                                            <input type="password" className="form-control form-control-user" name="oldPassword"
                                                                onChange={(e) => this.handleChange(e)} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label>{siteConstants.LABEL_NEW_PASSWORD}</label>
                                                            <label className="my-error">{this.state.error.errNewPassword}</label>
                                                            <input type="password" className="form-control form-control-user" name="newPassword"
                                                                onChange={(e) => this.handleChange(e)} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>{siteConstants.LABEL_CONFIRM_PASSWORD}</label>
                                                            <label className="my-error">{this.state.error.errConfirmPassword}</label>
                                                            <input type="password" className="form-control form-control-user" name="confirmPassword"
                                                                onChange={(e) => this.handleChange(e)} />
                                                        </div>
                                                        <div className="form-group">
                                                            <button type="submit" className="btn btn-primary btn-user btn-block">{siteConstants.BTN_SAVE}</button>
                                                        </div>
                                                    </div>
                                                </form>
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

//-- Here we are adding Reducer names, so it can be get data from reducers using store
function mapStateToProps(state) {
    const { language } = state;
    return {
        language
    };
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, userActions), dispatch)
});

const connectedChangePassword = connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
export { connectedChangePassword as ChangePassword }; 