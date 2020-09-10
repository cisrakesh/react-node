//-- React Standard
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//-- Custom
import TopBar from "../Common/TopBar/TopBar";
import SideBar from "../Common/SideBar/SideBar";
import Footer from "../Common/Footer/Footer";
import { userActions, reportActions } from "../../_actions";
import { apiConstants } from "../../_constants/api.constants";
import { Bar, HorizontalBar } from "react-chartjs-2";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { DateRange } from "react-date-range";
import moment from "moment";
import { addDays } from "date-fns";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Ride extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rideValue: "1",
      roleType: 2,
      driverList: [],
      open: false,
      dateData: [
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: "selection"
        }
      ],
      dateArray:'',
      optionData:[0,1,2,3,4,5,6,7]
    };

    this.graphHandler = this.graphHandler.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.dateRange=this.dateRange.bind(this);
    this.handleDateRange=this.handleDateRange.bind(this);
  }

  /*
   * componentDidMount - Initially it will call and get the users data
   */
  componentDidMount() {
    const { dispatch } = this.props;
    this.dateRange();

    let postData = {};
    postData.role = this.state.roleType;

    dispatch(reportActions.getDriverList(apiConstants.GET_DRIVER_LIST, postData));
    dispatch(userActions.getAllUserCount(apiConstants.GET_ALL_USERS_COUNT));
  }

  /*
   * componentWillReceiveProps - Whenever Props change, it will call and store data
   * update the state values with new props values, this method will get called whenever any change happens to props values
   * componenentDidUpdate()
   */
  componentWillReceiveProps(props) {

    if (props.getDriverList) {
      if (props.getDriverList.getDriverList) {
        if (props.getDriverList.getDriverList.data) {
          this.setState({
            driverList: props.getDriverList.getDriverList.data
          });
        }
      }
    }

    if(props.getUsersList){
      if (props.getUsersList.getUsersList) {
        if (props.getUsersList.getUsersList.data) {
          this.setState({
            driverCount: props.getUsersList.getUsersList.data.data.driverCount
          });
        }
      }
    }
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  graphHandler(event) {
    this.setState({ rideValue: event.target.value });
  }

  userGraphHandler(event) {
    // this.setState({rideValue:event.target.value});
    let postData = {};
    postData.id = event.target.value;

    // dispatch(reportActions.getDriverList(apiConstants.GET_DRIVER_LIST,postData));
  }

  handleExport() {
    window.print();
  }

  createSelectItems() {
    let items = [];
    if (this.state.driverList !== undefined) {
      this.state.driverList.map((item, index) => {
        items.push(
          <option key={index} value={item._id}>
            {item.firstname + " " + item.lastname}
          </option>
        );
      });
    }
    return items;
  }

  handleDateRange(e)
  {
     this.setState({ dateData: [e] },()=>{this.dateRange()});
  }

  daysHandler(e){
      
    if(e.target.value==1){
      let value=addDays(this.state.dateData[0].startDate, -7);
      let startDate=this.state.dateData[0].startDate
      let EndDate=this.state.dateData[0].endDate;
      this.setState({dateData:[{startDate:value,endDate:startDate}]},()=>{ this.dateRange()}); 
    }
      else if(e.target.value==2)
      {
        let value=addDays(this.state.dateData[0].startDate, -15);
        let startDate=this.state.dateData[0].startDate
        let EndDate=this.state.dateData[0].endDate;
        this.setState({dateData:[{startDate:value,endDate:startDate}]},()=>{ this.dateRange()}); 
      }
      else if(e.target.value==3)
      {
        let value=addDays(this.state.dateData[0].startDate, -30);
        let startDate=this.state.dateData[0].startDate
        let EndDate=this.state.dateData[0].endDate;
        this.setState({dateData:[{startDate:value,endDate:startDate}]},()=>{ this.dateRange()}); 
      }

  } 

  dateRange()
  {
    let startDate=this.state.dateData[0].startDate;
    let endDate=this.state.dateData[0].endDate;

    let dateArray=[];
    while (startDate <= endDate) {
        dateArray.push(new Date (startDate));
        startDate = addDays(startDate,1);
    }
   
    this.setState({dateArray:dateArray});
    let options=[];
    for(let i=0;i<dateArray.length;i++)
    {
        options.push(i);
    }

    this.setState({optionData:options});

  }


  //-- Main function
  render() {
    let startDate=this.state.dateData[0].startDate;
    let endDate=this.state.dateData[0].endDate;
    let optionData=this.state.optionData;

    const MonthlyData = {
      labels: ["1", "2", "3", "4", "5"],
      datasets: [
        {
          label: "Data",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          data: [65, 59, 80, 81, 56]
        }
      ]
    };

    const YearlyData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "Data",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          data: [65, 59, 80, 81, 56]
        }
      ]
    };

    const dataForDate = {
      labels:this.state.dateArray,
      datasets: [
        {
          label: "Data",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          data: optionData
        }
      ]
    };

    const { siteConstants } = this.props.language;
    const { rideValue, dateData } = this.state;

    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    };

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
                  {siteConstants.MENU_RIDE}
                </h1>
              </div>

              <div className="card shadow mb-4" id="export-data">
                <div className="card-body">
                  <div className="table-responsive">
                    <div className="row" id="select-data">
                      <div className="col">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded">
                          <div className="card-body">
                            <div className="row no-gutters d-block">
                              <div className="col-auto">
                                <div className="col-sm-6 d-inline-flex ">
                                  <div className="col-sm-3">
                                    <div
                                      className="dataTables_length"
                                      id="dataTable_length"
                                    >
                                      <label>
                                        <select
                                          name="dataTable_length"
                                          aria-controls="dataTable"
                                          onChange={e => this.graphHandler(e)}
                                          className="custom-select custom-select-sm form-control form-control-sm"
                                        >
                                          <option value="1">Monthly</option>
                                          <option value="2">Yearly</option>
                                        </select>
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-sm-3">
                                    <div
                                      className="dataTables_length"
                                      id="dataTable_length"
                                    >
                                      <label>
                                        <select
                                          name="dataTable_length"
                                          aria-controls="dataTable"
                                          onChange={e => this.daysHandler(e)}
                                          className="custom-select custom-select-sm form-control form-control-sm"
                                        >
                                          <option>-Select-</option>
                                          <option value="1">last 7 days</option>
                                          <option value="2">
                                            last 15 days
                                          </option>
                                          <option value="3">
                                            last 30 days
                                          </option>
                                        </select>
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-sm-3">
                                    <div
                                      className="dataTables_length"
                                      id="dataTable_length"
                                    >
                                      <label>
                                        <select
                                          name="dataTable_length"
                                          aria-controls="dataTable"
                                          onChange={e =>
                                            this.userGraphHandler(e)
                                          }
                                          className="custom-select custom-select-sm form-control form-control-sm"
                                        >
                                          <option value="1">All User</option>
                                          {this.createSelectItems()}
                                        </select>
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-sm-3">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      style={{height:'31px'}}
                                      type="text"
                                      placeholder="select date..."
                                      onClick={this.handleClickOpen}
                                    />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-sm-6 float-right">
                                  <div className="col-sm-3 float-right">
                                    <button
                                      className="btn btn-info btn-user"
                                      onClick={this.handleExport}
                                    >
                                      {siteConstants.LABEL_EXPORT}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {/* <!-- Earnings (Monthly) Card Example --> */}

                      <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card py-2 border-0">
                          <div className="card-body">
                            <div className="row no-gutters text-center d-block">
                            <div className="col mr-2 mt-3">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1 count-block">
                                  Total Ride
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                              </div>
                              <div className="col-auto">
                                <div className="rounded-circle bg-info text-white userReport-block">
                                  <b>4</b>
                                </div>
                              </div>
                            
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-5 col-md-6 mb-4">
                        <div className="card py-2 border-0">
                          <div className="card-body">
                            <div className="row no-gutters text-center d-block">
                            <div className="col mr-2 mt-3">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1 count-block">
                                  Total Earning
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                              </div>
                              <div className="col-auto">
                                <div className="rounded-circle bg-info text-white userReport-block">
                                  <b>4</b>
                                </div>
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
                            <div className="col mr-2 mt-3">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1 count-block">
                                  Total Drivers
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                              </div>

                              <div className="col-auto">
                                <div className="rounded-circle bg-info text-white userReport-block">
                                  <b>{this.state.driverCount!==undefined && this.state.driverCount!=='' ? this.state.driverCount : 0}</b>
                                </div>
                              </div>
                            
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="report-container ml-5 ">
                      <div className="row mt-5" style={{ height: "250px" }}>
                        <div className="col-sm-3 shadow text-white text-center ride-block rounded-circle">
                          <div className="col" style={{ top: "45%" }}>
                            <h4>{siteConstants.LABEL_RIDENUMBER}</h4>{" "}
                          </div>
                        </div>
                        <div className="col-sm-8 ml-5">
                          <div style={{ width: "800px", height: "250px" }}>
                            <Bar
                              height={100}
                              data={
                                rideValue === "1"
                                  ? MonthlyData
                                  : YearlyData
                              }
                              options={{
                                title: {
                                  display: true,
                                  text: "Average Ride",
                                  fontSize: 20
                                },
                                legend: {
                                  display: true,
                                  position: "right"
                                },
                                scales:{
                                  xAxes:[{
                                    barPercentage: 0.4
                                  }]
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-50"></div>
                      <div className="row mt-5" style={{ height: "250px" }}>
                        <div className="col-sm-3 shadow text-white text-center ride-block rounded-circle">
                          <div className="col" style={{ top: "45%" }}>
                            <h4>{siteConstants.LABEL_EARNING}</h4>{" "}
                          </div>
                        </div>
                        <div className="col-sm-8 ml-5">
                          <div style={{ width: "800px", height: "250px" }}>
                            <Bar
                              height={100}
                              data={
                                rideValue === "1"
                                  ? MonthlyData
                                  : YearlyData
                                 
                              }
                              options={{
                                title: {
                                  display: true,
                                  text: "Average Ride",
                                  fontSize: 20
                                },
                                legend: {
                                  display: true,
                                  position: "right"
                                },
                                scales:{
                                  xAxes:[{
                                    barPercentage: 0.4
                                  }]
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-50"></div>

                      <div className="row mt-5" style={{ height: "250px" }}>
                        <div className="col-sm-3 shadow text-white text-center ride-block rounded-circle">
                          <div className="col" style={{ top: "45%" }}>
                            <h4>{siteConstants.LABEL_EARNING}</h4>{" "}
                          </div>
                        </div>
                        <div className="col-sm-8 ml-5">
                          <div style={{ width: "800px", height: "250px" }}>
                            <Bar
                              height={100}
                              data={dataForDate}
                              // options={{
                              //   title: {
                              //     display: true,
                              //     text: "Average Ride",
                              //     fontSize: 20
                              //   },
                              //   legend: {
                              //     display: true,
                              //     position: "right"
                              //   }
                              // }}

                              options={{
                                legend: {
                                  display: false
                                },
                                scales: {
                                  yAxes: [{
                                    ticks: {
                                       max: 1,
                                       min: 0,
                                       stepSize: 3
                                     }
                                   }]
                                  },
                                 title: {
                                  display: this.props.display,
                                  text: this.props.title
                                 }
                              }}
                            />
                          </div>
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
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <DateRangePicker
                format="DD/MM/YYYY"
                // onChange={item => this.setState({ dateData: [item.selection] })}
                onChange={item=>this.handleDateRange(item.selection)}
                ranges={dateData}
                months={2}
                moveRangeOnFirstSelection={false}
                showSelectionPreview={true}
                direction="horizontal"
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

//-- Here we are adding Reducer names, so it can be get data from reducers using store
function mapStateToProps(state) {
  const { language, getDriverList,getUsersList } = state;
  return {
    getDriverList,
    getUsersList,
    language
  };
}

const connectedMembership = connect(mapStateToProps)(Ride);
export { connectedMembership as Ride };
