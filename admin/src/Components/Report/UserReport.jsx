//-- React Standard
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//-- Custom
import TopBar from "../Common/TopBar/TopBar";
import SideBar from "../Common/SideBar/SideBar";
import Footer from "../Common/Footer/Footer";
import { userActions,reportActions } from "../../_actions";
import { apiConstants } from "../../_constants/api.constants";
import { Doughnut,Pie } from "react-chartjs-2";

class UserReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalUser: "0",
      userCount: "0",
      driverCount: "0",
      activatedUser:'0',
      activatedDriver:'0'
    };
  }

  /*
   * componentDidMount - Initially it will call and get the users data
   */
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(userActions.getAllUserCount(apiConstants.GET_ALL_USERS_COUNT));
    dispatch(reportActions.getActivatedUser(apiConstants.GET_ACTIVATED_USER));
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
            //totalUser: props.getUsersList.getUsersList.data.data.totalUsers,
            userCount: props.getUsersList.getUsersList.data.data.userCount,
            driverCount: props.getUsersList.getUsersList.data.data.driverCount
          });
        }
      }
    }

    if (props.getActivatedUser) {
      if (props.getActivatedUser.getActivatedUser) {
        if (props.getActivatedUser.getActivatedUser.data) {
          this.setState({
            activatedUser: props.getActivatedUser.getActivatedUser.data.userCount,
            activatedDriver: props.getActivatedUser.getActivatedUser.data.driverCount
          });
        }
      }
    }



  }

  //-- Main function
  render() {
    const { userCount, driverCount,activatedUser,activatedDriver } = this.state;

    let nonActiveUser=userCount-activatedUser;
    let nonActiveDriver=driverCount-activatedDriver;

    const data = {
      labels: [
        'User',
        'Driver'
      ],
      datasets: [{
        data: [userCount, driverCount],
        backgroundColor: [
        '#FF6384',
        '#36A2EB'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB'
        ]
      }]
    };

    const userData = {
      labels: [
        'Activated',
        'Not Activated',
      ],
      datasets: [{
        data: [activatedUser, nonActiveUser],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        ]
      }]
    };

    const driverData = {
      labels: [
        'Activated',
        'Not Activated',
      ],
      datasets: [{
        data: [activatedDriver,nonActiveDriver],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        ]
      }]
    };
   
    

    const { siteConstants } = this.props.language;

    return (
      <div id="wrapper">
        <SideBar />

        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            <TopBar />

            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">
                  {siteConstants.MENU_USER_REPORT}
                </h1>
              </div>

              <div className="card shadow mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    {/* <!-- Content Row --> */}
                    <div className="row">
                      {/* <!-- Earnings (Monthly) Card Example --> */}
                      
                      <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card py-2 border-0">
                          <div className="card-body">
                            <div className="row no-gutters text-center d-block">
                            <div className="col-auto">
                                <div className="rounded-circle bg-primary text-white userReport-block"><b>4</b></div>
                              </div> 
                              <div className="col mr-2 mt-3">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                  Total Members
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-5 col-md-6 mb-4">
                        <div className="card py-2 border-0">
                          <div className="card-body">
                            <div className="row no-gutters text-center d-block">
                            <div className="col-auto">
                                <div className="rounded-circle bg-primary text-white userReport-block"><b>4</b></div>
                              </div> 
                              <div className="col mr-2 mt-3">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                  Total Drivers
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Earnings (Monthly) Card Example --> */}
                     
                      <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card py-2 border-0">
                          <div className="card-body">
                            <div className="row no-gutters text-center d-block">
                            <div className="col-auto">
                                <div className="rounded-circle bg-primary text-white userReport-block"><b>4</b></div>
                              </div> 
                              <div className="col mr-2 mt-3">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                  Total Users
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="space-50"></div>
                    <div className="row mb-5">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-5">
                        <div style={{ width: "600px" }}>
                          <Doughnut data={data} />
                        </div>
                      </div>
                      <div className="col-sm-4"></div>
                    </div>

                   
                    <div className="row mt-5">
                    <div className="col-sm-12"><h4>{siteConstants.ACCTIVATED_USER}</h4> </div>

                      <div className="col-sm-6"> 
                      <div style={{ width: "600px" }}>
                      <Pie
                            data={userData}
                            width={100}
                            height={50}
                          />
                      </div>
                      </div>

                      <div className="col-sm-6">
                        <div style={{ width: "600px" }}>
                        <Pie
                            data={driverData}
                            width={100}
                            height={50}
                          />
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
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
  const { getUsersList,getActivatedUser, language } = state;
  return {
    getUsersList,
    getActivatedUser,
    language
  };
}

const connectedMembership = connect(mapStateToProps)(UserReport);
export { connectedMembership as UserReport };
