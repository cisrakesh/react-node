//-- React Standard
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//-- Custom
import TopBar from "../Common/TopBar/TopBar";
import SideBar from "../Common/SideBar/SideBar";
import Footer from "../Common/Footer/Footer";
import { userActions } from "../../_actions";
import { apiConstants } from "../../_constants/api.constants";
import { Bar, HorizontalBar } from "react-chartjs-2";

class Revenue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allUSer: "0",
      normalUser: "0",
      driverUser: "0"
    };
  }

  /*
   * componentDidMount - Initially it will call and get the users data
   */
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(userActions.getAllUserCount(apiConstants.GET_ALL_USERS_COUNT));
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
            allUser: props.getUsersList.getUsersList.data.allUSer,
            normalUser: props.getUsersList.getUsersList.data.normalUser,
            driverUser: props.getUsersList.getUsersList.data.driverUser
          });
        }
      }
    }
  }

  //-- Main function
  render() {
    const state = {
        labels: ["A", "B", "C", "D", "E"],
        datasets: [
          {
            label: "Data",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
          }
        ]
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
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-6">
                         
                        <div style={{ width: "600px", height: "500px" }}>
                        <Bar
                            data={state}
                            options={{
                            title: {
                                display: true,
                                text: "Average user per month",
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: "right"
                            }
                            }}
                        />
                      </div>

                      </div>
                      <div className="col-sm-3"></div>
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
  const { language } = state;
  return {
    language
  };
}

const connectedMembership = connect(mapStateToProps)(Revenue);
export { connectedMembership as Revenue };
