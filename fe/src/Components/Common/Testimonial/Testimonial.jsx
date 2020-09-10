import React, { Component } from 'react';
import config from 'config';

class Testimonial extends Component {
    render() {
        return (
            <section className="section section-md bg-gray-100 text-center">
                <div className="container">
                    <h3 className="heading-3">Testimonials</h3>
                    <div className="testimonial-slider owl-carousel">
                        <div className="item">
                            <div className="testimonials-user">
                                <img src={config.imgPath + "images/testimonials-user-1.jpg"} alt="" />
                            </div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged.</p>
                            <h4>Jane Williams
          <span>Regular Client</span>
                            </h4>
                        </div>

                        <div className="item">
                            <div className="testimonials-user">
                                <img src={config.imgPath + "images/testimonials-user-2.jpg"} alt="" />
                            </div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                              into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                              release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <h4>John Doe
          <span>Regular Client</span>
                            </h4>
                        </div>

                        <div className="item">
                            <div className="testimonials-user">
                                <img src={config.imgPath + "images/testimonials-user-3.jpg"} alt="" />
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur.</p>
                            <h4>Kate Peterson
          <span>Regular Client</span>
                            </h4>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Testimonial;
