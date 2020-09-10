import React, { Component } from 'react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { PrivateRoute } from '../Components/PrivateRoute';
import { Dashboard } from '../Components/Dashboard';
import { Login } from '../Components/Login';
import { alertActions } from '../_actions';
import { ForgetPassword } from '../Components/ForgetPassword';
import { ChangePassword } from '../Components/ChangePassword';
import { NotFound } from '../Components/NotFound';
import { Users, UsersProfile } from '../Components/Users';
import { CommissionSettings } from '../Components/CommissionSettings/CommissionSettings';
import { DriverUser } from '../Components/DriverUser/DriverUser';
import {UserReport,Revenue,Ride} from '../Components/Report';
import {DocumentVerfication} from '../Components/DocumentVerification';
import {Coupon} from '../Components/Coupon';
import {GeneralSettings} from '../Components/GeneralSetting';
import {DummyFile} from '../Components/dummyFile';
class App extends Component {

    constructor(props) {
        super(props);
        
        const { dispatch } = this.props;        
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });  
    }
    render() {
        const { alert } = this.props;
        return (
        	<div>
                {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
				<Router history={history}>
                    <div>
                        
                        {/* <PrivateRoute exact path="/tables" component={Tables} />
                        <PrivateRoute exact path="/users" component={Users} />
                        <PrivateRoute exact path="/profile" component={UsersProfile} /> */}
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/login" component={Login} />
                            <Route exact path="/forget-password" component={ForgetPassword} />
                            <PrivateRoute path="/dashboard" component={Dashboard} />
                            <PrivateRoute exact path="/users" component={Users} />
                            <PrivateRoute exact path="/reports" component={UserReport} />
                            <PrivateRoute exact path="/revenue" component={Revenue} />
                            <PrivateRoute exact path="/document-verification" component={DocumentVerfication} />
                            <PrivateRoute exact path="/coupon" component={Coupon} />
                            <PrivateRoute exact path="/ride" component={Ride} />
                            <PrivateRoute exact path="/driver-users" component={DriverUser} />
                            <PrivateRoute exact path="/commission-settings" component={CommissionSettings} />       
                            <PrivateRoute exact path="/general-settings" component={GeneralSettings} />                          
                            <PrivateRoute exact path="/profile" component={UsersProfile} />
                            <PrivateRoute exact path="/change-password" component={ChangePassword} />
                            <PrivateRoute exact path="/file-upload" component={DummyFile} />
                            <Route path="*" exact={true} component={NotFound} />
                        </Switch>
                    </div>
                </Router>
			</div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 