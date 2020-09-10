import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../_actions';
import { bindActionCreators } from 'redux';
import siteConstants from '../../languages';
import { apiConstants } from '../../_constants/api.constants';

class Login extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.actions.logout();

        this.state = {
            userName: '',
            password: '',
            submitted: false,
            error: {
                errUserName: '',
                errPassword: ''
            },
            selectedLanguage: localStorage.getItem('sltLanguage') || 'ENGLISH'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //-- we are setting the Values
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { siteConstants } = this.props.language;

        this.setState({ submitted: true });
        const { userName, password } = this.state;

        let errUserName = '';
        let errPassword = '';
        if (!userName) {
            errUserName = siteConstants.ERR_BLANK_USER_NAME;
        }
        if (!password) {
            errPassword = siteConstants.ERR_BLANK_USER_PASSWORD
        }

        const { dispatch } = this.props;
        if (userName && password) {
            this.props.actions.login(apiConstants.ADMIN_LOGIN, userName, password);

        }
        this.setState({ error: { errUserName: errUserName, errPassword: errPassword } })

    }

    /* we are changeing the language using this function */
    changeLanguage = (e) => {
        this.setState({ selectedLanguage: e.target.value }, () => this.props.actions.changeLanguage(this.state.selectedLanguage));
    }

    componentWillMount() {
        document.getElementById('page-top').className = 'bg-gradient-primary'
    }

    render() {
        const { loggingIn } = this.props;
        const { userName, password, submitted, selectedLanguage } = this.state;
        const { siteConstants } = this.props.language;

        return (
            <div className="container">

                {/* <!-- Outer Row --> */}
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* <!-- Nested Row within Card Body --> */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form className="user" onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <select className="form-control" onChange={this.changeLanguage} value={selectedLanguage}><option value="ENGLISH">English</option><option value="HINDI">Hindi</option></select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="my-error">{this.state.error.errUserName}</label>
                                                    <input type="text" className="form-control form-control-user" id="userName" name="userName" aria-describedby="emailHelp" placeholder={siteConstants.LABEL_EMAIL} autoFocus onChange={this.handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="my-error">{this.state.error.errPassword}</label>
                                                    <input type="password" className="form-control form-control-user" id="password" name="password" placeholder={siteConstants.LABEL_PASSWORD} onChange={this.handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" for="customCheck">{siteConstants.LABEL_REMEMBER_ME}</label>
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary btn-user btn-block">{siteConstants.LABEL_LOGIN}</button>
                                                <hr />

                                            </form>
                                            <div className="text-center">
                                                <Link className="small" to="/forget-password">{siteConstants.LABEL_FORGET_PASSWORD}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { language } = state;
    return {
        loggingIn,
        language
    };
}

//-- We can collect all action methods under the bind creator and use "actions" as a globally on page.
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, userActions), dispatch)
});

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export { connectedLogin as Login };