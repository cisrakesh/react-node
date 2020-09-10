//-- React Standard
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

//-- Custom
import TopBar from "../Common/TopBar/TopBar";
import SideBar from "../Common/SideBar/SideBar";
import Footer from "../Common/Footer/Footer";
import { userActions } from '../../_actions';
import { apiConstants } from '../../_constants/api.constants';
import Pagination from "../Common/Pagination/Pagination";
import PageLimit from "../Common/PageLimit/PageLimit"
import UsersDetail from "./UsersDetail";
import connectedPageLimit from "../Common/PageLimit/PageLimit";

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalPage: '',
            totalDataCount: '',
            currentPage: 1,
            getUsersList: [],
            roleType:3,
            perPage:10,
            varUserDetails: false,
            activeVal:"true"
        };
        this.handleChange = this.handleChange.bind(this);
    }

    /*
    * componentDidMount - Initially it will call and get the users data
    */
    componentDidMount() {
        const { dispatch } = this.props;
        let postData = {};
        postData.page = 1;
        postData.orderBy = "_id";
        postData.orderByAscDesc = "ASC";
        postData.perPage =this.state.perPage;
        postData.role=this.state.roleType;
        postData.text =''

        dispatch(userActions.getUsersList(apiConstants.GET_ALL_USERS, postData));
    }

    /*
    * componentWillReceiveProps - Whenever Props change, it will call and store data
    * update the state values with new props values, this method will get called whenever any change happens to props values
    * componenentDidUpdate()
    */
    componentWillReceiveProps(props) {
        if (props.getUsersList) {
            if (props.getUsersList.getUsersList) {
                if (props.getUsersList.getUsersList.data) {
                   
                    this.setState({
                         totalPage:props.getUsersList.getUsersList.data.totalPages,
                         totalDataCount: props.getUsersList.getUsersList.data.totalCount,
                         getUsersList: props.getUsersList.getUsersList.data.data,
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
        postData.orderBy = "_id";
        postData.orderByAscDesc = "ASC";
        postData.perPage =this.state.perPage;
        postData.role=this.state.roleType;
        postData.text =''

        dispatch(userActions.getUsersList(apiConstants.GET_ALL_USERS, postData));
    }

    /*
    * searchUsers - User can search data from the database and it will appear
    */
    searchUsers(keyword) {
        const { dispatch } = this.props;

        let postData = {};
        postData.page = this.state.currentPage;
        postData.orderBy = "_id";
        postData.orderByAscDesc = "ASC";
        // postData.perPage =this.state.perPage;
        postData.role=this.state.roleType;

        if (keyword.target.value !== '') {
         
            postData.text = keyword.target.value;
        }
        else{
            postData.text =''
        }
        
        dispatch(userActions.getUsersList(apiConstants.GET_ALL_USERS, postData));
    }


    /*
    *   User details- we can open seperate page for details
    */
    userDetails = (users) => {
        this.setState({
            users,
            varUserDetails: true
        });
    }

    /*
    *   Call from the Detail page
    */
    backButton = () => {
        this.setState({
            varUserDetails: false
        });
    }

      //handle change of checkbox
      handleChange(e,id)
      {
          const { dispatch } = this.props;
          this.setState({isChecked:e.target.checked})
          let postData={};
          postData.id= id;
          postData.status=e.target.checked;

          let getListData={};
          getListData.api=apiConstants.GET_ALL_USERS;
          getListData.page=this.state.currentPage;
          getListData.orderBy="_id";
          getListData.orderByAscDesc="ASC";
          getListData.roleType=this.state.roleType;
          getListData.perPage =this.state.perPage;
          getListData.text =''

          dispatch(userActions.updatePendingUser(apiConstants.ACTIVE_ACCOUNT, postData,getListData));
          
      }

      handlePageLimitChange=(e)=>
      {
        const { dispatch } = this.props;
        let postData = {};
        postData.page = 1;
        postData.orderBy = "_id";
        postData.orderByAscDesc = "ASC";
        postData.role=this.state.roleType;
        postData.text =''
        
        this.setState({perPage:parseInt(e.target.value)},()=>{        
          postData.perPage =this.state.perPage; 
          dispatch(userActions.getUsersList(apiConstants.GET_ALL_USERS, postData));
        })

      }

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
                        {/* Checking the condition for detail list */}
                        {!this.state.varUserDetails ?
                        <div className="container-fluid">

                            <h1 className="h3 mb-2 text-gray-800">{siteConstants.GEN_USERS}</h1>
                            <p className="mb-4">{siteConstants.GEN_USERS_DESCRIPTION}</p>


                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div className="row">
                                            <PageLimit limit={this.handlePageLimitChange}></PageLimit>
                                            <div className="col-sm-12 col-md-6">
                                                <div id="dataTable_filter" className="dataTables_filter">
                                                    <label>
                                                        <input type="search" palaceholder={siteConstants.GEN_SEARCH} 
                                                        className="form-control form-control-sm" placeholder="" 
                                                        aria-controls="dataTable" onChange={(e) => this.searchUsers(e)} />

                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table table-bordered" width="100%" cellSpacing="0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">{siteConstants.GEN_NUMBER}</th>
                                                    <th scope="col">{siteConstants.GEN_NAME}</th>
                                                    <th scope="col">{siteConstants.LABEL_EMAIL}</th>
                                                    <th scope="col">{siteConstants.LABEL_CELL_PHONE}</th>                                                
                                                    <th scope="col">{siteConstants.LABEL_STATUS}</th>
                                                    <th width="10%">{siteConstants.LABEL_ACTION}</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th scope="col">{siteConstants.GEN_NUMBER}</th>
                                                    <th scope="col">{siteConstants.GEN_NAME}</th>
                                                    <th scope="col">{siteConstants.LABEL_EMAIL}</th>
                                                    <th scope="col">{siteConstants.LABEL_CELL_PHONE}</th>
                                                    <th scope="col">{siteConstants.LABEL_STATUS}</th>
                                                    <th width="10%">{siteConstants.LABEL_ACTION}</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {
                                                    this.state.getUsersList != undefined && this.state.getUsersList.length > 0 ? this.state.getUsersList.map((users, index) => {
                                                   //  this.setState({['isChecked'+index]:false})
                                                    //  let activeVal=this.state['isChecked'+index];
                                                    //  if(users.account_activate==='active')
                                                    //  {
                                                    //      activeVal=true;
                                                    //  }

                                            
                                                        return (
                                                            <tr key={index}>
                                                                <td scope="row">{index+1}</td>
                                                                <td>{users.firstname +" "+ users.lastname}</td>
                                                                <td>{users.email}</td>
                                                                <td>{users.mobile_number}</td>
                                                                <td>
                                                                    <div className="custom-control custom-checkbox small">
                                                                        <input type="checkbox" className="form-check-input" htmlFor="customCheck" id="customCheck" 
                                                                        name={['isChecked'+index]} checked={users.account_activate==='active'}   
                                                                        onChange={(e)=>this.handleChange(e,users._id)}/>

                                                                       
                                                                        {/* <label className="custom-control-label" htmlFor="customCheck" name={['isChecked'+index]}></label> */}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a className="actionIcon" title="View" onClick={() => this.userDetails(users)}><span><img src="assets/img/svg/eye-icon.png" alt="View" /></span></a>
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
                        : <UsersDetail userData={this.state.users} backButton={this.backButton}/>}
                        {/* <!-- /.container-fluid --> */}

                    </div>
                    {/* <!-- End of Main Content --> */}

                    <Footer />
                </div>

            </div>
        );
    }
}


//-- Here we are adding Reducer names, so it can be get data from reducers using store
function mapStateToProps(state) {
    const { getUsersList, language } = state;
    return {
        getUsersList,
        language
    };
}

const connectedMembership = connect(mapStateToProps)(Users);
export { connectedMembership as Users };