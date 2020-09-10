import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { apiConstants } from "../../_constants/api.constants";

class ForgetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: ''
            },
            error: {
                errEmail: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      
        this.setState({
            email:event.target.value
        });
    }

    handleSubmit(event) {
      
        event.preventDefault();
        const { siteConstants } = this.props.language;

        this.setState({ submitted: true });
        const { email } = this.state;

        let errEmail = '';
        if (!email) {
            errEmail = siteConstants.ERR_BLANK_EMAIL;
        }

        const { dispatch } = this.props;
        if (email) {
            let postData={};
            postData.email=email
            dispatch(userActions.forgetpassword(apiConstants.RECOVER_PASSWORD,postData));
        }
        this.setState({ error: { errEmail: errEmail } })
    }

    componentWillMount() {
        document.getElementById('page-top').className = 'bg-gradient-primary'
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
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
                                                <h1 className="h4 text-gray-900 mb-4">{siteConstants.LABEL_FORGET_PASSWORD}</h1>
                                                <p className="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
                                            </div>
                                            <form className="user" onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user" name="email" aria-describedby="emailHelp" placeholder="Enter Email Address..." autoFocus onChange={this.handleChange}/>
                                                </div>
                                                <button className="btn btn-primary btn-user btn-block">Reset Password</button>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <Link className="small" to="/login">{siteConstants.LABEL_LOGIN}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            // <div className="container">
            //     <div className="row">
            //         <div className="col-md-4 col-md-offset-4">
            //             <div className="login-panel panel panel-default">
            //                 <div className="panel-heading">
            //                     <h3 className="panel-title">{siteConstants.LABEL_FORGET_PASSWORD}</h3>
            //                 </div>
            //                 <div className="panel-body">
            //                     <form role="form" onSubmit={this.handleSubmit}>
            //                         <fieldset>
            //                             <p className="lead_txt">{siteConstants.LABEL_FORGET_PASSWORD_MESSAGE}</p>
            //                             <div className="form-group">
            //                                 <label className="error">{this.state.error.errEmail}</label>
            //                                 <input className="form-control" placeholder="E-mail" name="userName" type="text" autoFocus onChange={this.handleChange} />
            //                             </div>
            //                             <button className="btn btn-lg btn-success btn-block">Submit</button>
            //                             <div className="back_login" style={{paddingLeft:"120px",marginTop:"10px"}}>
            //                                 <p>{siteConstants.LABEL_BACK_TO} <a href="/login">{siteConstants.LABEL_LOGIN} </a></p>
            //                             </div>
            //                         </fieldset>
            //                     </form>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div> 
        );
    }
}

function mapStateToProps(state) {
    const { language } = state;
    return {
        language
    };
}

const connectedForgetPassword = connect(mapStateToProps)(ForgetPassword);
export { connectedForgetPassword as ForgetPassword };