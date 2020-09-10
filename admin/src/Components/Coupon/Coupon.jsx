//-- React Standard
import React, { Component } from "react";
import { connect } from 'react-redux';

//-- Custom
import TopBar from "../Common/TopBar/TopBar";
import SideBar from "../Common/SideBar/SideBar";
import Footer from "../Common/Footer/Footer";
import { apiConstants } from '../../_constants/api.constants';
import Pagination from "../Common/Pagination/Pagination";
import PageLimit from "../Common/PageLimit/PageLimit";
import DeletePopup from "../Common/Popup/DeletePopup";
import ViewPopup from "../Common/Popup/ViewPopup";
import EditPopup from "../Common/Popup/EditPopup";
import { couponActions } from "../../_actions";

class Coupon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: {
                sortKey: null,
                direction: 'desc',
            },
            totalPage: '',
            totalDataCount: '',
            currentPage: 1,
            getCouponList: [],
            viewOpen: false,
            editOpen: false,
            deleteOpen: false,
            popupType:'CouponComponent',
            addButton: false,
            perPage:10,
            couponDetails:{
                coupon_title:'',
                description:'',
                selectedDate:''
            }
        };
    }

    /*
    * componentDidMount - Initially it will call and get the coupon data
    */
    componentDidMount() {
        const { dispatch } = this.props;
        let postData = {};
        postData.page = 1;
        postData.orderBy = "id";
        postData.orderByAscDesc = "ASC";
        postData.perPage=this.state.perPage;
        postData.text='';

       dispatch(couponActions.getCoupounList(apiConstants.GET_COUPOUN, postData));
    }

    /*
    * componentWillReceiveProps - Whenever Props change, it will call and store data
    * update the state values with new props values, this method will get called whenever any change happens to props values
    */
    componentWillReceiveProps(props) {
        if (props.getCoupounList) {
            if (props.getCoupounList.getCoupounList) {
                if (props.getCoupounList.getCoupounList.data.data) {
                    this.setState({
                        totalPage: props.getCoupounList.getCoupounList.data.data.totalPages,
                        totalDataCount: props.getCoupounList.getCoupounList.data.data.totalCount,
                        getCouponList: props.getCoupounList.getCoupounList.data.data.data,
                    })
                }
            }
        }
    }

    /*
    *   Pagination function: It will call from pagination section and change data in table
    */
    makeHttpRequestWithPage = (pageNumber) => {
        const { dispatch } = this.props;
        this.setState({
            currentPage: pageNumber
        });

        let postData = {};
        postData.page = pageNumber;
        postData.orderBy = "id";
        postData.orderByAscDesc = "ASC";
        postData.perPage=this.state.perPage;
        postData.text = '';

        dispatch(couponActions.getCoupounList(apiConstants.GET_COUPOUN, postData));
    }

    /*
    * searchCoupon - User can search data from the database and it will appear
    */
    searchCoupon(keyword) {
        const { dispatch } = this.props;
        let postData = {};
        postData.page = 1;
        postData.orderBy = "id";
        postData.orderByAscDesc = "ASC";
        postData.perPage=this.state.perPage

        if (keyword.target.value !== '') {
            postData.text = keyword.target.value;
        }
        else{
            postData.text ='';
        }
        dispatch(couponActions.getCoupounList(apiConstants.GET_COUPOUN, postData));
    }

    //-- Popup Handler
    /*
    *   Modal open-close functionality
    */
    popupOpen = ( type, btnClick) => {
        //-- check add button clicked
        if (btnClick === 'addButton') {
            this.setState({ addButton: true ,data:''});
        }
        this.setState({  [type]: true })
    };

    EditPopupOpen = (couponData,type) => {
        this.setState({
            data:couponData,
            addButton: true
        });

        this.setState({ [type]: true })
    }


    DeletePopupOpen = (couponId,type) => {
        this.setState({
           deleteId:couponId
        });

        this.setState({ [type]: true })
    }
    /*
    *   Close the popup
    */
    popupClose = (type) => {
        this.setState({
            addButton: false,
            [type]: false
        });
    };

    /*
    *   We are handling validation from this function
    */
    handleValidation(data) {
        const { siteConstants } = this.props.language;

        let fields = data.defaultData;
        let errors = {};
        let formIsValid = true;

        if ((fields["coupon_title"] == '')) {
            formIsValid = false;
            if (fields["coupon_title"] == '') {
                errors["coupon_title"] = siteConstants.ERR_CAN_NOT_BLANK;
            }
        }

        if ((fields["description"] == '')) {
            formIsValid = false;
            if (fields["description"] == '') {
                errors["description"] = siteConstants.ERR_CAN_NOT_BLANK;
            }
        }


        if ((fields["selectedDate"] == '')) {
            formIsValid = false;
            if (fields["selectedDate"] == '') {
                errors["selectedDate"] = siteConstants.ERR_CAN_NOT_BLANK;
            }
        }

        return ({ errors, formIsValid });
    }

    makeid(length) {

        let result = "";
        let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
        let lower = upper.toLowerCase();
    
        let digits = "0123456789";
    
          for (var i = 0; i < 2; i++) {
            result += upper.charAt(Math.floor(Math.random() * (upper.length)));}
          for (var i = 0; i < 2; i++) {
               result += lower.charAt(Math.floor(Math.random() * (lower.length))); }
          for (var i = 0; i < 4; i++) { result += digits.charAt(Math.floor(Math.random() * (digits.length))); }
    
          let shuffledString=''
          while (result.length != 0)
            {
                let index =  Math.floor(Math.random() * result.length);
                let c = result.charAt(index);
                result = result.substring(0,index)+result.substring(index+1);
                shuffledString += c;
            }
          return shuffledString;
      }

       
  handleUpdate = (e,data) => {
    e.preventDefault();
    console.log("data is=========",data);

    if (this.handleValidation(data).formIsValid) {
      let obj = {};
      obj.page = this.props.currentPage;
      obj.orderBy = "id";
      obj.orderByAscDesc = "ASC";
      obj.perPage = 10;
      obj.text='';

      let statusValue = "active";
  
      if (data.couponStatus === true) {
        statusValue = "active";
      } else {
        statusValue = "pending";
      }

      let postData = {};
      postData.id = data.defaultData._id;
      postData.title = data.defaultData.coupon_title;
      postData.description = data.defaultData.description;
      postData.expiry_date = data.defaultData.selectedDate;
      postData.status = statusValue;
      postData.couponToken = data.defaultData.coupon_token;

      this.props.dispatch(
        couponActions.updateCoupon(
          apiConstants.EDIT_COUPON,
          postData,
          apiConstants.GET_COUPOUN,
          obj
        )
      );

      this.popupClose('editOpen');

      return ({ errors: {}, formIsValid: true });
    } 
    else {
        return this.handleValidation(data);
    }
  };


    /* 
        we can remove the selected data, using the below function 
    */
    deleteCoupon = (couponId) => {
        let postData = {};
        postData.page = this.state.currentPage;
        postData.orderBy = "id";
        postData.orderByAscDesc = "ASC";
        postData.perPage=this.state.perPage;
        postData.text = '';

        let obj = {};
        obj.id = couponId;
        this.props.dispatch(couponActions.deleteCoupon(apiConstants.DELETE_COUPON, obj, apiConstants.GET_COUPOUN, postData));
        this.popupClose('deleteOpen');
    }

    handlePageLimitChange=(e)=>
    {
        const { dispatch } = this.props;
        let postData = {};
        postData.page = 1;
        postData.orderBy = "_id";
        postData.orderByAscDesc = "ASC";
        postData.role=this.state.roleType;
        postData.text = '';

        this.setState({perPage:parseInt(e.target.value)},()=>{
        postData.perPage =this.state.perPage;
        dispatch(couponActions.getCoupounList(apiConstants.GET_COUPOUN, postData));
      })

    }

    handleSubmit = (e, data) => {
        e.preventDefault();
        
        if (this.handleValidation(data).formIsValid) {
          let couponToken = this.makeid(8);
          let obj = {};
          obj.page = this.props.currentPage;
          obj.orderBy = "id";
          obj.orderByAscDesc = "ASC";
          obj.perPage = 10;
          obj.text='';
    
          let postData = {};
          postData.title = data.defaultData.coupon_title;
          postData.description = data.defaultData.description;
          postData.expiry_date = data.defaultData.selectedDate;
          postData.couponToken = couponToken;
          this.props.dispatch(
            couponActions.addCoupon(
              apiConstants.ADD_COUPON,
              postData,
              apiConstants.GET_COUPOUN,
              obj
            )
          );
    
          this.popupClose('editOpen');

          return ({ errors: {}, formIsValid: true });
        } else {
          //alert("Form has errors.")
          return this.handleValidation(data);
        }
      };
    


    //-- Main function
    render() {
        const { siteConstants } = this.props.language;
        return (
            <div id="wrapper">
                <SideBar />

                <div id="content-wrapper" className="d-flex flex-column">
                    {/* <!-- Main Content --> */}
                    <div id="content">

                        <TopBar />

                        {/* <!-- Begin Page Content --> */}
                        <div className="container-fluid">


                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                              
                            <h1 className="h3 mb-2 text-gray-800">{siteConstants.GEN_COUPON}</h1>
                           
                                <a href="#" onClick={() => this.popupOpen('editOpen', 'addButton')}>
                                    <span className="text">
                                        <button className="btn btn-primary">{siteConstants.BTN_ADD}</button>
                                    </span>
                                </a>
                            </div>


                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div className="row">
                                            
                                            <PageLimit currentPage={this.state.currentPage} limit={this.handlePageLimitChange}></PageLimit>

                                            <div className="col-sm-12 col-md-6">
                                                <div id="dataTable_filter" className="dataTables_filter">
                                                    <label>
                                                        <input type="search" palaceholder={siteConstants.GEN_SEARCH} className="form-control form-control-sm" placeholder="" aria-controls="dataTable" onChange={(e) => this.searchCoupon(e)} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table table-bordered" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">{siteConstants.GEN_NUMBER}</th>
                                                    <th scope="10%">{siteConstants.GEN_COUPON_TOKEN}</th>
                                                    <th scope="col">{siteConstants.GEN_TITLE}</th>
                                                    <th scope="col">{siteConstants.GEN_DESCRIPTION}</th>
                                                    <th scope="col">{siteConstants.GEN_EXPIRY_DATE}</th>
                                                    <th scope="col">{siteConstants.LABEL_STATUS}</th>
                                                    <th width="10%">{siteConstants.LABEL_ACTION}</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th scope="col">{siteConstants.GEN_NUMBER}</th>
                                                    <th scope="10%">{siteConstants.GEN_COUPON_TOKEN}</th>
                                                    <th scope="col">{siteConstants.GEN_TITLE}</th>
                                                    <th scope="col">{siteConstants.GEN_DESCRIPTION}</th>
                                                    <th scope="col">{siteConstants.GEN_EXPIRY_DATE}</th>
                                                    <th scope="col">{siteConstants.LABEL_STATUS}</th>
                                                    <th width="10%">{siteConstants.LABEL_ACTION}</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {
                                                    this.state.getCouponList != undefined && this.state.getCouponList.length > 0 ? this.state.getCouponList.map((coupon, index) => {
                                                        let d = new Date(coupon.expiry);
                                                        let expiryDate=d.toLocaleDateString();
                                                        return (
                                                            <tr key={index}>
                                                                <td scope="row">{index+1}</td>
                                                                <td>{coupon.coupon_token}</td>
                                                                <td>{coupon.coupon_title}</td>
                                                                <td>{coupon.description}</td>
                                                                <td>{expiryDate}</td>
                                                                <td>{coupon.status}</td>
                                                                <td>
                                                                    <a className="actionIcon" title="Edit" href="javascript:void(0)" onClick={() => this.EditPopupOpen(coupon,'editOpen')}><span><img src="assets/img/svg/EditIcon.png" alt="Edit" /></span></a>
                                                                    <a className="actionIcon" title="Delete" href="javascript:void(0)" onClick={() => this.DeletePopupOpen(coupon._id, 'deleteOpen','deleteClick')}><span><img src="assets/img/svg/Bin.png" alt="Delete" /></span></a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) : <tr>
                                                            <td colSpan="5">{siteConstants.GEN_NO_RECORD}</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                    {/* calling the another componenet */}
                                    <Pagination totalPage={this.state.totalPage} currentPage={this.state.currentPage} currentPage={this.state.currentPage} funPagination={this.makeHttpRequestWithPage} />



                                </div>
                            </div>

                        </div>
                        {/* <!-- /.container-fluid --> */}

                    </div>
                    {/* <!-- End of Main Content --> */}

                    <Footer />
                </div>

                {/* Start Popup -Edit coupon details  */}
                <EditPopup popupType={this.state.popupType} userData={this.state.data} funCouponUpdate={(e, data) => this.handleUpdate(e, data)} funCouponAction={(e, data) => this.handleSubmit(e, data)}  currentPage={this.state.currentPage} defaultData={this.state.couponDetails} addButton={this.state.addButton} editOpen={this.state.editOpen} funPopupClose={this.popupClose}/>
                {/* End Popup -Edit coupon details  */}
                {/* Delete popup */}
                <DeletePopup deleteOpen={this.state.deleteOpen} deleteId={this.state.deleteId} funPopupClose={this.popupClose} funDelete={this.deleteCoupon} />
            </div>
        );
    }
}


//-- Here we are adding Reducer names, so it can be get data from reducers using store
function mapStateToProps(state) {
    const { getCoupounList, language } = state;
    return {
        getCoupounList,
        language
    };
}

const connectedCoupon = connect(mapStateToProps)(Coupon);
export { connectedCoupon as Coupon };