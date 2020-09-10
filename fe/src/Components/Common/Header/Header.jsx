import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    
    render() {
        const { siteConstants } = this.props.language;
        return (
            <div className="header">
              <div className="container">
        
                <div className="logo">
                  <a href="#">RIDE ALONG</a>
                </div>
        
                <div className="menu">
                  <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/aboutus">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                  </ul>
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

const connectedHeader = connect(mapStateToProps)(Header);
export default connectedHeader;