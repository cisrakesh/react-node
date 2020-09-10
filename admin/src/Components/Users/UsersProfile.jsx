import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../_actions";

import TopBar from "../Common/TopBar/TopBar";
import SideBar from "../Common/SideBar/SideBar";
import Footer from "../Common/Footer/Footer";
import { apiConstants } from "../../_constants/api.constants";
import config from "config";

class UsersProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      user: {},
      file: "",
      imagePreviewUrl: "",
      profileUpdate: false,
      profileImgUpdate: false,
      //-- We are using for validation
      errors: {
        firstname: "",
        lastname: "",
        contact: ""
      }
    };
  }

  //-- handle validation for page
  handleValidation() {
    const { siteConstants } = this.props.language;

    let fields = this.state.user;
    // let errors = {};
    let formIsValid = true;

    //Name
    if (
      fields.firstname == "" ||
      fields.lastname == "" ||
      fields.mobile_number == ""
    ) {
      formIsValid = false;
      if (fields.firstname == "") {
        this.setState({
          errors: { firstname: siteConstants.ERR_CAN_NOT_BLANK }
        });
      }
      if (fields.lastname == "") {
        this.setState({
          errors: { lastname: siteConstants.ERR_CAN_NOT_BLANK }
        });
      }

      if (fields.mobile_number == "") {
        this.setState({ errors: { contact: siteConstants.ERR_CAN_NOT_BLANK } });
      }
    }

    if (fields.firstname !== "" && fields.firstname !== undefined) {
      if (fields.firstname.match(/^[a-zA-Z]+$/) === null) {
        formIsValid = false;
        this.setState({
          errors: { firstname: siteConstants.ERR_ONLY_LETTERS }
        });
      }
    }

    if (fields.lastname !== "" && fields.lastname !== undefined) {
      if (fields.lastname.match(/^[a-zA-Z]+$/) === null) {
        formIsValid = false;
        this.setState({ errors: { lastname: siteConstants.ERR_ONLY_LETTERS } });
      }
    }

    if (fields.mobile_number !== "" && fields.mobile_number !== undefined) {
      if (String(fields.mobile_number).match(/^[0-9]*$/) === null) {
        formIsValid = false;
        this.setState({ errors: { contact: siteConstants.ERR_ONLY_NUMBERS } });
      }
    }

    return formIsValid;
  }

  //-- update the user profile information
  updateAdminProfileInfo = e => {
    e.preventDefault();

    if (this.handleValidation()) {
      this.props.dispatch(
        userActions.updateAdminProfileData(
          apiConstants.ADMIN_PROFILE,
          this.state.user
        )
      );
      this.setState({ profileUpdate: true });
      sessionStorage.setItem("user", JSON.stringify(this.state.user));
    } else {
      //alert("Form has errors.");
    }
  };

  //-- we are setting the Values
  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  //-- Will need to fetch user data
  componentDidMount() {
    const { dispatch } = this.props;
    let obj = {};
    obj.id = JSON.parse(sessionStorage.getItem("user"))._id;
    dispatch(userActions.getAdminDetails(apiConstants.ADMIN_PROFILE, obj));
  }

  /*
   * componentWillReceiveProps - Whenever Props change, it will call and store data
   * update the state values with new props values, this method will get called whenever any change happens to props values
   */
  componentWillReceiveProps(props) {
    if (props.userDetails) {
      if (props.userDetails.userDetails) {
        if (props.userDetails.userDetails.data) {
          //-- profileUpdate - because only update list when we don't want to change the userlist
          if (this.state.profileUpdate === false) {
            this.setState({
              user: props.userDetails.userDetails.data
            });
          }
        }
      }
    }
    if (props.uploadimage.success) {
      if (
        props.uploadimage.data !== undefined &&
        props.uploadimage.data !== ""
      ) {
        this.setState(prevState => ({
          user: {
            ...prevState.user,
            profile_image: props.uploadimage.data
          }
        }));
      }
    }
  }

  handleProfileChange()
  {
    document.querySelector("input[type='file']").click();
  }
  handleImageChange(e) {
   
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
      });
    };

    reader.readAsDataURL(file);

    if(file)
    {
      let postData = {};
      postData.files = file;

      this.props.dispatch(
        userActions.uploadProfileImg(apiConstants.UPLOAD_IMAGE, postData)
      );

      this.setState({ profileUpdate: true });
    }
  }

  render() {
    const { user } = this.state;
    const { siteConstants } = this.props.language;

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    let value = "./assets/img/svg/user.svg";
    if (
      this.state.user.profile_image !== undefined &&
      this.state.user.profile_image !== ""
    ) {
      value = config.imgPath + "/" + this.state.user.profile_image;
    }


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
                  {siteConstants.LABEL_PROFILE}
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
                            <div className="text-center">
                              <div className="container profilePic">
                                <img
                                  className="img-profile rounded-circle"
                                  style={{ width: "150px" }}
                                  src={value}
                                />
                                <div className="overlay">
                                  <a
                                    href="#"
                                    class="icon"
                                    title="User Profile"
                                    onClick={this.handleProfileChange}
                                  >
                                    <i class="fas fa-edit"></i>
                                  </a>
                                </div>
                              </div>

                              <h1 className="h4 text-gray-900 mb-4">
                                {user.firstname + " " + user.lastname}
                              </h1>
                            </div>
                            <div className="form-group">
                              <label>{siteConstants.LABEL_F_NAME}</label>
                              <label className="my-error ml-3">
                                {this.state.errors.firstname}
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-user"
                                name="firstname"
                                value={user.firstname}
                                onChange={e => this.handleChange(e)}
                              />
                            </div>

                            <div className="form-group">
                              <label>{siteConstants.LABEL_L_NAME}</label>
                              <label className="my-error ml-3">
                                {this.state.errors.lastname}
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-user"
                                name="lastname"
                                value={user.lastname}
                                onChange={e => this.handleChange(e)}
                              />
                            </div>

                            <div className="form-group">
                              <label>{siteConstants.LABEL_CONTACT_NO}</label>
                              <label className="my-error ml-3">
                                {this.state.errors.contact}
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-user"
                                name="mobile_number"
                                value={user.mobile_number}
                                onChange={e => this.handleChange(e)}
                              />
                            </div>

                            <div className="form-group">
                              {/* <div className="col-sm-6 mb-3 mb-sm-0"> */}
                              <div>
                                <input
                                  className="fileInput form-control form-control-user"
                                  type="file"
                                  name="userImage"
                                  onChange={e => this.handleImageChange(e)}
                                  style={{ display: "none" }}
                                />

                                {/* <button
                              className="btn btn-primary btn-user mt-3"
                              type="submit"
                              id="submitbtn"
                              style={{display:"none"}}
                              onClick={e => this.handleImageSubmit(e)}
                            >
                            </button>  */}
                              </div>
                              {/* </div> */}

                              {/* <div className="col-sm-6"> */}
                              {/* <div className="imgPreview">{$imagePreview}</div> */}
                            </div>
                            {/* </div> */}

                            <div className="form-group">
                              <button
                                type="submit"
                                className="btn btn-primary btn-user btn-block"
                                onClick={this.updateAdminProfileInfo}
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

function mapStateToProps(state) {
  const { userDetails, language, uploadimage } = state;
  return {
    userDetails,
    language,
    uploadimage
  };
}

const connectedUsersProfile = connect(mapStateToProps)(UsersProfile);
export { connectedUsersProfile as UsersProfile };
