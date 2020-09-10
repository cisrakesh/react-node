//-- React Standard
import React, { Component } from "react";
import { connect } from 'react-redux';

//-- Custom
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import Banner from "../Common/Banner/Banner";
import Testimonial from "../Common/Testimonial/Testimonial";

import config from 'config';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wrapper">
                <Header />
                <Banner />

                <div className="content">
                    <section className="section section-md bg-gray-100 text-center">
                        <div className="container">
                            <h3 className="heading-3">Our Services</h3>
                            <div className="row">
                                <div className="col-sm-4">

                                    <article className="box-modern">
                                        <div className="icon-box">
                                            <img src={config.imgPath + "images/icon1.png"} alt="" />
                                        </div>
                                        <p className="box-modern-title">Private Driver</p>
                                        <div className="box-modern-text">
                                            <p>Enjoy the best customer service from our professional drivers.</p>
                                        </div>
                                    </article>
                                </div>
                                <div className="col-sm-4">

                                    <article className="box-modern">
                                        <div className="icon-box">
                                            <img src={config.imgPath + "images/icon2.png"} alt="" />
                                        </div>
                                        <p className="box-modern-title">Airport transfer</p>
                                        <div className="box-modern-text">
                                            <p>Comfortable transfer services from airport to any chosen address.</p>
                                        </div>
                                    </article>
                                </div>
                                <div className="col-sm-4">

                                    <article className="box-modern">
                                        <div className="icon-box">
                                            <img src={config.imgPath + "images/icon3.png"} alt="" />
                                        </div>
                                        <p className="box-modern-title">Baggage Transfer</p>
                                        <div className="box-modern-text">
                                            <p>If you need to collect your baggage, we are ready to help you.</p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </section>

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

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };