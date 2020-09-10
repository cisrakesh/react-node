import React, { Component } from 'react';
import { connect } from 'react-redux';

class Pagination extends Component {
    render() {
        const { siteConstants } = this.props.language;
        const pageNumbers = [];
        if (this.props.totalPage !== null && this.props.totalPage != undefined) {
 
             if (this.props.totalPage === 1) { pageNumbers.push(1); }
             else {
                 for (let i = 1; i <= Math.ceil(this.props.totalPage); i++) {
 
                     if (i == (this.props.currentPage)) {
                         var j = i - 1;
                         var k = i + 1;
                         if (i == 1) {
                             pageNumbers.push(i);
                             pageNumbers.push(k);
                         }
                         else if (i == Math.ceil(this.props.totalPage)) {
                             pageNumbers.push(j);
                             pageNumbers.push(i);
                         }
                         else {
                             pageNumbers.push(j);
                             pageNumbers.push(i);
                             pageNumbers.push(k);
                         }
                     }
 
 
                 }
             }
 
             var renderPageNumbers = pageNumbers.map(number => {
                 let tempClass = this.props.currentPage === number ? 'paginate_button page-item active' : 'paginate_button page-item';
                 return (
                    //  <li key={number} className={tempClass} onClick={() => this.props.funPagination(number)}>{number}</li>
                     <li className={tempClass}><a key={number} href="#" aria-controls="dataTable" data-dt-idx="1" tabindex="0" className="page-link" onClick={() => this.props.funPagination(number)}>{number}</a></li>
                 );
             });
        }
        //-- first page
        let firstPageClass = this.props.currentPage === 1 ? 'paginate_button page-item next disabled' : 'paginate_button page-item next';
        //-- last page
        let lastPageClass = this.props.currentPage === this.props.totalPage ? 'paginate_button page-item next disabled' : 'paginate_button page-item next';
        return (

            <div className="row">
                <div className="col-sm-12 col-md-5">
                    {/* <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">
                        Showing 0 to 0 of 0 entries
                    </div> */}
                </div>
                <div className="col-sm-12 col-md-7">
                    <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                        <ul className="pagination">
                            <li class={firstPageClass} id="dataTable_previous">
                                <a key={0} href="#" aria-controls="dataTable" data-dt-idx="0" tabindex="0" className="page-link" onClick={() => this.props.funPagination(1)}>{siteConstants.GEN_FIRST}</a>
                            </li>
                            {renderPageNumbers !== undefined && renderPageNumbers}
                            <li class={lastPageClass} id="dataTable_next">
                                <a key={this.props.totalPage} href="#" aria-controls="dataTable" data-dt-idx="1" tabindex="0" className="page-link" onClick={() => this.props.funPagination(this.props.totalPage)}>{siteConstants.GEN_LAST}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            // <div className="row">
            //     <div className="col-lg-12">
            //         <ul className="paginateLinksDatabaseTables">
            //             <li key={0} className="btn-info" onClick={() => this.props.funPagination(1)}>{siteConstants.GEN_FIRST}</li>
            //             {renderPageNumbers !== undefined && renderPageNumbers}
            //             <li key={this.props.totalPage} className="btn-info" onClick={() => this.props.funPagination(this.props.totalPage)}>{siteConstants.GEN_LAST}</li>
            //         </ul>
            //     </div>
            // </div>            
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

const connectedPagination = connect(mapStateToProps)(Pagination);
export default connectedPagination;