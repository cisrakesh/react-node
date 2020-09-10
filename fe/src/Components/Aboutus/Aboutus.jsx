//-- React Standard
import React, { Component } from "react";
import { connect } from 'react-redux';

//-- Custom
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import Testimonial from "../Common/Testimonial/Testimonial";

import config from 'config';

class Aboutus extends Component {

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
                            <h1>About Us</h1>
                            <ul className="breadcrumb">
                                <li><a href="#">Home</a></li>
                                <li>About</li>
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
                                    <img src={config.imgPath + "images/promo-3.jpg"} alt="" />
                                </div>
                                    {/* <!--left end--> */}

                                    {/* <!--right start--> */}
                                    <div className="col-sm-6 about-right">
                                        <h2>About Our Taxi Company</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Ut enim a corehenderit in cupidatat non
                                            proident, sunt in culpa qui officia. deserunt mollit anim id est laborum. Sed ut
                                            perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                laudantium.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Ut enim a corehenderit in cupidatat non
                                proident, sunt in culpa qui officia. deserunt mollit anim id est laborum.</p>
                                    </div>
                                    {/* <!--right end--> */}


                                </div>
                            </div>
                        </div>


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
    const {language} = state;
    return {
                    language
                };
            }

            const connectedAboutus = connect(mapStateToProps)(Aboutus);
export {connectedAboutus as Aboutus};