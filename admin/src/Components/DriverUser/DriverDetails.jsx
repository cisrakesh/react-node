import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../../_actions";
import { apiConstants } from "../../_constants/api.constants";
import config from "config";

class DriverDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getDriverDetails: [],
      verifyIdentity: false,
      verifyLicense: false
    };
  }

  /*
   * componentDidMount - Initially it will call and get the users data
   */
  componentDidMount() {
    const { dispatch } = this.props;
    let postData = {};
    postData.id = this.props.userData._id;
    dispatch(userActions.getDocumentList(apiConstants.GET_DOCUMENT, postData));
  }

  /*
   * componentWillReceiveProps - Whenever Props change, it will call and store data
   * update the state values with new props values, this method will get called whenever any change happens to props values
   * componenentDidUpdate()
   */
  componentWillReceiveProps(props) {
    if (props.userDetails.userDetails.data) {
      if (props.userDetails.userDetails.data.driverProfile) {
        this.setState({
          getDriverDetails: props.userDetails.userDetails.data.driverProfile
        });
      }
    }
  }

  handleChange(e, id, data) {
    const { dispatch } = this.props;
    this.setState({ [data]: e.target.checked }, () => {
      let postData = {};
      postData.id = id;
      postData.licence_verified = this.state.verifyLicense;
      postData.identity_verified = this.state.verifyIdentity;
      dispatch(
        userActions.updateDocumentList(apiConstants.GET_DOCUMENT, postData)
      );
    });
  }

  // handleDownload(data)
  // {
  //   $("<a>")
  //   .attr("href", data)
  //   .attr("download", data)
  //   .appendTo("body")
  //   .click()
  //   .remove();

  //   // console.log("data is======",data);
  //   // let imageURL = "https://cdn.glitch.com/4c9ebeb9-8b9a-4adc-ad0a-238d9ae00bb5%2Fmdn_logo-only_color.svg?1535749917189";
 
  //   // let downloadedImg = new Image;
  //   // downloadedImg.crossOrigin = "Anonymous";
  //   // downloadedImg.addEventListener("load", imageReceived, false);
  //   // downloadedImg.src = imageURL;


  // }

    imageReceived() {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
  
    canvas.width = 200;
    canvas.height = 300;
   
    context.drawImage(downloadedImg, 0, 0);
    imageBox.appendChild(canvas);
   
    try {
      localStorage.setItem("saved-image-example", canvas.toDataURL("image/png"));
    }
    catch(err) {
      console.log("Error: " + err);
    }  
  }

  render() {
    const userDetails = this.props.userData;
    const { siteConstants } = this.props.language;
    const driverData = this.state.getDriverDetails;
    let d = new Date(userDetails.created_date);
    let createdDate = d.toLocaleDateString();

    let imgValue='';
     if(driverData.identity_image) {imgValue= config.imgPath +"/uploads/profiles/" +userDetails._id +"/" + driverData.identity_image}
     else{
       imgValue="./assets/img/svg/aadhar-dummy.png"
     }

    return (
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              {siteConstants.LABEL_USER_DOCUMENT}
            </h1>
            <a
              href="#"
              onClick={this.props.backButton}
              className="btn btn-secondary btn-icon-split"
            >
              <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
              </span>
              <span className="text">{siteConstants.BTN_BACK}</span>
            </a>
          </div>

          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <div className="row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-6">
                    <div className="p-5">
                      <div className="text-center">
                        <img
                          className="img-profile rounded-circle"
                          style={{ width: "140px" }}
                          src={
                            userDetails.profile_image
                              ? config.imgPath + "/" + userDetails.profile_image
                              : "./assets/img/svg/user.svg"
                          }
                        />
                        <h1 className="h4 text-gray-900 mb-4">
                          {userDetails.firstname + " " + userDetails.lastname}
                        </h1>
                      </div>

                      <div className="mb-4 mt-4">
                        <h3>Personal Information</h3>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12 mb-3 mb-sm-0">
                          <label>{siteConstants.GEN_NAME}</label>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleFirstName"
                            placeholder={
                              userDetails.firstname + " " + userDetails.lastname
                            }
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-sm-12 mb-3 mb-sm-0">
                          <label>{siteConstants.LABEL_EMAIL}</label>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleLastName"
                            placeholder={userDetails.email}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <label>{siteConstants.LABEL_CONTACT_NO}</label>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder={userDetails.mobile_number}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label>{siteConstants.LABEL_USER_CREATED_DATE}</label>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleRepeatPassword"
                            placeholder={createdDate}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3"></div>
                </div>

                <div className="row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-6">
                    {driverData.length !== 0 ? (
                      <div className="p-5">
                        <div className="mb-4">
                          <h3>Driver Document</h3>
                        </div>

                        <div className="form-group row">
                          <div className="col-sm-7 mb-3 mb-sm-0">
                            <label>
                              <b>{siteConstants.LABEL_IDENTITY_PROOF}</b>
                            </label>
                            <div>
                              <img
                                className="identityImage"
                                src={
                                  driverData.identity_image
                                    ? config.imgPath +
                                      "/uploads/profiles/" +
                                      userDetails._id +
                                      "/" +
                                      driverData.identity_image
                                    : "./assets/img/svg/aadhar-dummy.png"
                                }
                              ></img>
                            </div>
                          </div>
                          <div className="col-sm-5 mb-3 mb-sm-0 d-block">
                            <label>
                              <b>{siteConstants.LABEL_DETAILS}</b>
                            </label>{" "}
                            <br />
                            <table class="table table-borderless">
                              <tbody>
                                <tr>
                                  <td>{siteConstants.LABEL_Type}</td>
                                  <td>{driverData.identity_proof}</td>
                                </tr>
                                <tr>
                                  <td>{siteConstants.LABEL_IDENTIFY_VERIFIED}</td>
                                  <td>
                                    {driverData.identity_verified !== undefined
                                      ? driverData.identity_verified === false
                                        ? "not verified"
                                        : "verified"
                                      : "not verified"}
                                  </td>
                                </tr> 
                                <tr>
                                  <td>{siteConstants.LABEL_DOWNLOAD}
                                  <a style={{color:'#858796'}} href={imgValue} download={imgValue}> 
                                  <i className="fas fa-download download-identity ml-3"></i> </a></td>
                                </tr>
                              </tbody>
                            </table>

                          </div>
                        
                        </div>

                        <div className="form-group row">
                          <div className="col-sm-7 mb-3 mb-sm-0">
                            <label>
                              <b>{siteConstants.LABEL_IDENTITY_PROOF}</b>
                            </label>
                            <div>
                              <img
                                className="identityImage"
                                src={
                                  driverData.licence_image
                                    ? config.imgPath +
                                      "/uploads/profiles/" +
                                      userDetails._id +
                                      "/" +
                                      driverData.licence_image
                                    : "./assets/img/svg/dummy-license.jpg"
                                }
                              ></img>
                            </div>
                          </div>
                          <div className="col-sm-5 mb-3 mb-sm-0">
                            <label>
                              <b>{siteConstants.LABEL_DETAILS}</b>
                            </label>
                            <br />

                            <table class="table table-borderless">
                              <tbody>
                                <tr>
                                  <td>{siteConstants.LABEL_Type}</td>
                                  <td>{siteConstants.LABEL_LICENSE}</td>
                                </tr>
                                <tr>
                                  <td>{siteConstants.LABEL_LICENSE_NUMBER}</td>
                                  <td>{driverData.licence_number}</td>
                                </tr>
                                <tr>
                                  <td>{siteConstants.LABEL_IDENTIFY_VERIFIED}</td>
                                  <td> {driverData.licence_verified !== undefined
                                  ? driverData.licence_verified === false
                                    ? "not verified"
                                    : "verified"
                                  : "not verified"}</td>
                                </tr>
                                <tr>
                                  <td>{siteConstants.LABEL_DOWNLOAD} 
                                  <a style={{color:'#858796'}} href={licenseImg} download={licenseImg}> 
                                  <i className="fas fa-download download-identity ml-3"></i></a></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5">
                        <h3>Driver Document</h3>
                        <div className="text-center mt-5">
                          <div>
                            <h6>No Records Added Yet</h6>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-sm-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

//-- Here we are adding Reducer names, so it can be get data from reducers using store
function mapStateToProps(state) {
  const { userDetails, language } = state;
  return {
    userDetails,
    language
  };
}

const connectedDriverDetails = connect(mapStateToProps)(DriverDetails);
export default connectedDriverDetails;
