import React, { Component } from 'react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { PrivateRoute } from '../Components/PrivateRoute';
import { Home } from '../Components/Home';
import { Aboutus } from '../Components/Aboutus';
import { alertActions } from '../_actions';
import { NotFound } from '../Components/NotFound';
import { Contact } from '../Components/Contact/Contact';

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
                            <Route exact path="/" component={Home} />
                            <Route path="/home" component={Home} />
                            <Route path="/aboutus" component={Aboutus} />
                            <Route path="/contact" component={Contact} />
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