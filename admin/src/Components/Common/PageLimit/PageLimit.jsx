import React, { Component } from 'react';
import { connect } from 'react-redux';

class PageLimit extends Component {


    render() {
        const { siteConstants } = this.props.language;
        return (
            <div className="col-sm-12 col-md-6">
                <div className="dataTables_length" id="dataTable_length">
                    <label>
                        <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm" onClick={(e) => this.props.limit(e)}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </label>
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

const connectedPageLimit = connect(mapStateToProps)(PageLimit);
export default connectedPageLimit;