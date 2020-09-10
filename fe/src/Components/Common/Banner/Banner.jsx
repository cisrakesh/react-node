import React, { Component } from 'react';
import config from 'config';

class Banner extends Component {
    render() {
        return (
            <div className="banner">
                <div className="home-banner owl-carousel">
                    <div className="item" style={{ backgroundImage: `url(${config.imgPath + 'images/home1_1.jpg'})` }}></div>
                    <div className="item" style={{ backgroundImage: `url(${config.imgPath + 'images/home1_2.jpg'})` }}></div>
                    <div className="item" style={{ backgroundImage: `url(${config.imgPath + 'images/home1_3.jpg'})` }}></div>
                </div>
                <div className="banner-content">
                    <h1>Get a taxi now</h1>
                    <a href="#">1-000-123-1234</a>
                    <p>Trust the leading and the most <br /> reliable US taxi operator.</p>
                </div>

            </div>
        );
    }
}
export default Banner;
