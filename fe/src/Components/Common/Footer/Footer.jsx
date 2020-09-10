import React, { Component } from 'react';
import config from 'config';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-top clearfix">
                    <div className="container">
                        <div className="row bordered-1">
                            <div className="col-sm-4 footer-col">
                                <h5 className="widget-title">Address</h5>
                                <div className="widget-text">123, Lorem Street,<br /> Chicago, IL, 60606</div>
                            </div>

                            <div className="col-sm-4 footer-col">
                            <h5 className="widget-title">Socials</h5>
                            <ul className="widget-social">
                                {/* <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li> */}

                                <li><a href="#"><img style={{marginTop: "13px"}} src={config.imgPath + "images/fb.png"} alt="" /></a></li>
                                <li><a href="#"><img style={{marginTop: "13px"}} src={config.imgPath + "images/tw.png"} alt="" /></a></li>
                                <li><a href="#"><img style={{marginTop: "13px"}} src={config.imgPath + "images/in.png"} alt="" /></a></li>
                            </ul>
                            </div>

                            <div className="col-sm-4 footer-col">
                                <h5 className="widget-title">Contacts</h5>
                                <div className="widget-text">
                                    <a href="#">(123) 456-78-90</a><br /> <a href="#">sales@yoursite.com</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="copyright-bar">
                    © 2020 All rights reserved.
                </div>
            </footer>
        );
    }
}
export default Footer;
