import React, { Component, Fragment } from 'react';

class InnerFooter extends Component {
    render() {
        return (
            <Fragment>
                {/* <!-- Footer --> */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Your Website 2019</span>
                        </div>
                    </div>
                </footer>
                {/* <!-- End of Footer --> */}
            </Fragment>
        );
    }
}

export default InnerFooter;
