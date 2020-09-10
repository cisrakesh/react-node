//-- React Standard
import React, { Component } from "react";
import { connect } from "react-redux";

//-- Custom
import TopBar from "../Common/TopBar/TopBar";
import SideBar from "../Common/SideBar/SideBar";
import Footer from "../Common/Footer/Footer";
import { commissionSettingsActions } from "../../_actions";
import { apiConstants } from "../../_constants/api.constants";

class GeneralSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id:'',
      adminDetails:{},
      error: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  //-- we are setting the Values
  handleChange(e) {
    const { name, value } = e.target;

    const { adminDetails } = this.state;
    this.setState({
        adminDetails: {
        ...adminDetails,
        [name]: value
      }
    });

  }

  /*
   * componentDidMount - Initially it will call and get the data
   */
  componentDidMount() {
    const { dispatch } = this.props;
    let postData = {};
     dispatch(commissionSettingsActions.getCommissionSettings(apiConstants.GET_COMMISSION_SETTING, postData));
  }

  /*
   * componentWillReceiveProps - Whenever Props change, it will call and store data
   * update the state values with new props values, this method will get called whenever any change happens to props values
   */
  componentWillReceiveProps(props) {

    if (props.getCommissionSettings) {
      if (props.getCommissionSettings.getCommissionSettings) {
        if (props.getCommissionSettings.getCommissionSettings.data) {
          this.setState({
            adminDetails:props.getCommissionSettings.getCommissionSettings.data,
            id:props.getCommissionSettings.getCommissionSettings.data._id
          });
        }
      }
    }
  }

  //-- handle validation for page
  handleValidation() {
    const { siteConstants } = this.props.language;

    const fields = this.state.adminDetails;
    let formIsValid = true;
    // let amount=fields.initial_amount;
    // let fare=fields.regular_fare;
    // let commission=fields.commission_amount;
  
    if (
      fields.admin_contact == "" ||
      fields.admin_email == "" ||
      fields.office_address == "" ||
      fields.office_city == ""
    ) {
      formIsValid = false;
      if (fields.admin_contact == "") {
        this.setState({
          error: { admin_contact : siteConstants.ERR_CAN_NOT_BLANK }
        });
        return false;
      }
      if (fields.admin_email == "") {
        this.setState({
          error: { admin_email: siteConstants.ERR_CAN_NOT_BLANK }
        });
        return false;
      }

      if (fields.office_address == "") {
        this.setState({
          error: { office_address: siteConstants.ERR_CAN_NOT_BLANK }
        });
        return false;
      }

      if (fields.office_city == "") {
        this.setState({
          error: { office_city: siteConstants.ERR_CAN_NOT_BLANK }
        });
        return false;
      }
    }

    if (fields.admin_contact !== "" && fields.admin_contact !== undefined) {
        if (String(fields.admin_contact).match(/^[0-9]*$/) === null) {
          formIsValid = false;
          this.setState({ errors: { admin_contact: siteConstants.ERR_ONLY_NUMBERS } });
        }
      }
      
    return formIsValid;
  }

  selectHandler(e) {
    this.setState({ initial_distance: e.target.value });
  }

  //-- Click on this function and data save into the database
  updateCommissionSettings = e => {
    e.preventDefault();


    const {adminDetails} = this.state;
  
    if (this.handleValidation()) {

      let obj = {};
      this.props.dispatch(
        commissionSettingsActions.updateGeneralSettings(apiConstants.UPDATE_GENERAL_SETTINGS, this.state.adminDetails,apiConstants.GET_COMMISSION_SETTING,obj));
    
    } else {
      //alert("Form has errors.")
    }
  };

  //-- Main function
  render() {
    const { siteConstants } = this.props.language;
    const {adminDetails}=this.state;

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
                  {siteConstants.MENU_GENERAL_SETTING}
                </h1>
              </div>

              <div className="card shadow mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-6">
                        <form role="form">
                          <div className="p-5">
                            <div className="form-group">
                              <label>{siteConstants.LABEL_ADMIN_CONTACT}</label>
                              <input
                                type="text"
                                className="form-control form-control-user"
                                name="admin_contact"
                                onChange={e => this.handleChange(e)}
                                value={adminDetails.admin_contact}
                              />
                                <label className="my-error ml-3">
                                {this.state.error.admin_contact}
                              </label>
                            </div>

                            <div className="form-group">
                              <label>{siteConstants.LABEL_ADMIN_EMAIL}</label>
                              <input
                                type="text"
                                className="form-control form-control-user"
                                name="admin_email"
                                onChange={e => this.handleChange(e)}
                                value={adminDetails.admin_email}
                              />
                               <label className="my-error ml-3">
                                {this.state.error.admin_email}
                              </label>
                            </div>

                            <div className="form-group row">

                              <div className="col-sm-6 mb-3 mb-sm-0">
                                <label> {siteConstants.LABEL_SUPPORT_EMAIL1} </label>
                                <input
                                    type="text"
                                    className="form-control form-control-user"
                                    name="support_email1"
                                    onChange={e => this.handleChange(e)}
                                    value={adminDetails.support_email1}
                                />
                             
                              </div>
                              <div className="col-sm-6">
                                <label> {siteConstants.LABEL_SUPPORT_EMAIL2} </label>
                                <input
                                    type="text"
                                    className="form-control form-control-user"
                                    name="support_email2"
                                    onChange={e => this.handleChange(e)}
                                    value={adminDetails.support_email2}
                                />
                                
                              </div>
                            </div>

                            <div className="form-group row">

                            <div className="col-sm-8 mb-3 mb-sm-0">
                            <label> {siteConstants.LABEL_OFFICE_ADDRESS} </label>
                            <input
                                type="text"
                                className="form-control form-control-user"
                                name="office_address"
                                onChange={e => this.handleChange(e)}
                                value={adminDetails.office_address}
                            />
                             <label className="my-error ml-3"> {this.state.error.office_address} </label>
                            </div>

                            <div className="col-sm-4">
                            <label> {siteConstants.LABEL_OFFICE_CITY} </label>
                            <input
                                type="text"
                                className="form-control form-control-user"
                                name="office_city"
                                onChange={e => this.handleChange(e)}
                                value={adminDetails.office_city}
                            />
                              <label className="my-error ml-3"> {this.state.error.office_city} </label>
                            </div>
                            </div>

                            <div className="form-group row">

                            <div className="col-sm-6 mb-3 mb-sm-0">
                            <label> {siteConstants.LABEL_CONTACT1} </label>
                            <input
                                type="text"
                                className="form-control form-control-user"
                                name="contact1"
                                onChange={e => this.handleChange(e)}
                                value={adminDetails.contact1}
                            />
                           
                            </div>

                            <div className="col-sm-6">
                            <label> {siteConstants.LABEL_CONTACT2} </label>
                            <input
                                type="text"
                                className="form-control form-control-user"
                                name="contact2"
                                onChange={e => this.handleChange(e)}
                                value={adminDetails.contact2}
                            />
                           
                            </div>
                            </div>

                            <div className="form-group">
                              <button
                                type="submit"
                                onClick={this.updateCommissionSettings}
                                className="btn btn-primary btn-user btn-block"
                              >
                                {siteConstants.BTN_SAVE}
                              </button>
                            </div>
                          </div>
                        </form>
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
  const { getCommissionSettings, language } = state;
  return {
    getCommissionSettings,
    language
  };
}

const connectedGeneralSettings = connect(mapStateToProps)(GeneralSettings);
export { connectedGeneralSettings as GeneralSettings };
