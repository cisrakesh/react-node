//-- React Standard
import React, { Component } from "react";
import { connect } from 'react-redux';

//-- Custom
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import Testimonial from "../Common/Testimonial/Testimonial";

import config from 'config';

class Contact extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wrapper">
                <Header />

                {/* ---banner start-- */}
                <div className="inner-banner" style={{ backgroundImage: `url(${config.imgPath + 'images/header_image.jpg'})` }}>
                    <div className="inner-banner-content">
                        <div className="container">
                            <h1>Contact Us</h1>
                            <ul className="breadcrumb">
                                <li><a href="#">Home</a></li>
                                <li>Contact us</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* ---banner end-- */}

                <div className="content">
                    <div className="about-box section-md">
                        <div className="container">
                            <div className="row flexrow align-center">

                                {/* <!--left start--> */}
                                <div className="col-sm-6 about-left">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14716.686157255826!2d75.86481905!3d22.759014399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1581072320287!5m2!1sen!2sin"
                                        width="100%" height="550" frameborder="0" allowfullscreen=""></iframe>
                                </div>
                                {/* <!--left end--> */}

                                {/* <!--right start--> */}
                                <div className="col-sm-6 about-right">
                                    <h2>Contact Info</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim a corehenderit in cupidatat non
                                proident.</p>
                                    <ul className="address-info">
                                        <li><span><img src={config.imgPath + "images/contact-icon1.jpg"} alt="" /></span>Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit, sed do eiusmod</li>
                                        <li><span><img src={config.imgPath + "images/contact-icon2.jpg"} alt="" /></span>+91 000 00000</li>
                                        <li><span><img src={config.imgPath + "images/contact-icon3.jpg"} alt="" /></span>+91 000 00000</li>
                                        <li><span><img src={config.imgPath + "images/contact-icon4.jpg"} alt="" /></span><a
                                            href="mailto:demo@gmail.com">demo@gmail.com</a></li>
                                    </ul>
                                </div>
                                {/* <!--right end--> */}


                            </div>
                        </div>
                    </div>

                    <section className="section bg-accent section-md">
                        <div className="container">
                            <div className="row">


                                <div className="col-md-7 col-sm-6">
                                    <h3 className="heading-3">Download the app</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                      scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                                      into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                                      release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                                    <div className="group">
                                        <a href="#"><img src={config.imgPath + "images/button-1-170x53.png"} alt="" /></a>
                                        <a href="#"><img src={config.imgPath + "images/button-2-170x53.png"} alt="" /></a>
                                    </div>
                                </div>

                                <div className="col-md-5 col-sm-6">
                                    <div className="phone-frame text-right">
                                        <img src={config.imgPath + "images/frame-1-533x868.png"} alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>


                    <section className="section section-1 text-center section-md">
                        <div className="container">
                            <div className="row bordered-1">
                                <div className="col-sm-4">
                                    <div className="box-default">
                                        <p className="box-default-title">Standard</p>
                                        <p className="box-default-text">$2,7 /km</p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="box-default">
                                        <p className="box-default-title">Business</p>
                                        <p className="box-default-text">$5,7 /km</p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="box-default">
                                        <p className="box-default-title">Premium</p>
                                        <p className="box-default-text">$7,7 /km</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Testimonial />

                </div>

                <Footer />
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

const connectedContact = connect(mapStateToProps)(Contact);
export { connectedContact as Contact };