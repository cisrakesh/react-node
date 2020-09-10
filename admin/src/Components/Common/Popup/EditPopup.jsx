import React, { Component,useState,Fragment } from "react";
import { connect } from "react-redux";

//-- Material
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { userActions } from "../../../_actions";
import { apiConstants } from "../../../_constants/api.constants";
import DatePicker from "react-datepicker";

//-- CSS for Material
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#269abc"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey
  },
  contentRoot: {
    padding: theme.spacing(2),
    fontSize: 14,
    width: 600
  },
  actionRoot: {
    margin: 0,
    padding: theme.spacing(1)
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h4">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(styles)(props => {
  const { children, classes } = props;
  return (
    <MuiDialogContent dividers className={classes.contentRoot}>
      {children}
    </MuiDialogContent>
  );
});

const DialogActions = withStyles(styles)(props => {
  const { children } = props;
  return <MuiDialogActions>{children}</MuiDialogActions>;
});
class EditPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultData: {},
      couponStatus: true,
      updateData:false
    };
  }

  /*
   * componentWillReceiveProps - Whenever Props change, it will call and store data
   * update the state values with new props values, this method will get called whenever any change happens to props values
   */
  componentWillReceiveProps(props) {

    const { defaultData } = props;
    this.setState({
      defaultData
    });

    if(!props.editOpen) {
      this.setState({
          validated: { errors: {}}
      });
    }

     if (props.userData!==undefined && props.userData!=='') {
       let Data  =  props.userData
       let statusData='';
       if(props.userData.status==='active')
       {statusData=true}
       else{statusData=false}
   
        var d=Date.parse(props.userData.expiry);
       this.setState({defaultData:{...Data,["selectedDate"]: d},couponStatus:statusData,updateData:true})
     }
     else{
       this.setState({updateData:false});
     }
  }
  
  /*
   *   we are setting the Values
   */
  handleChange = e => {
    const { name, value } = e.target;
    const { defaultData } = this.state;
    this.setState({
      defaultData: {
        ...defaultData,
        [name]: value
      }
    });
  };

  handleDateChange= date => {
    const { defaultData } = this.state;
    this.setState({
      defaultData:{...defaultData,["selectedDate"]: date}
    });
  }

  handleStatusChange(e) {
    this.setState({ couponStatus: e.target.checked });
  }

  render() {

    const { siteConstants } = this.props.language;
    let popupType = this.props.popupType;
    
    if (popupType === 'CouponComponent') {

      if(this.props.addButton){
      //-- check Add/Edit label
      let addEditTitle = siteConstants.LABEL_ADD_COUPON;
       if(this.state.updateData){
         addEditTitle =siteConstants.LABEL_EDIT_COUPON
       }
      //-- Popup will open on terms page for add/edit the terms
      return (
          <Dialog onClose={() => this.props.funPopupClose('editOpen')} aria-labelledby="customized-dialog-title" open={this.props.editOpen}>
              <DialogTitle id="customized-dialog-title" onClose={() => this.props.funPopupClose('editOpen')}>
                  {addEditTitle}
              </DialogTitle>
              <DialogContent>
                  <div className="row">
                      <div className="col-lg-12">
                          <div className="panel panel-default">
                              <div className="panel-body">
                                  <div className="row">
                                   <div className="col">
                                      <form role="form">
                                      <div className="col-lg-12 mt-3">
                                            <div className="form-group">
                                              <label>{siteConstants.GEN_TITLE}</label>
                                              <input
                                                className="form-control"
                                                name="coupon_title"
                                                placeholder={siteConstants.GEN_TITLE}
                                                value={this.state.defaultData.coupon_title}
                                                onChange={this.handleChange}
                                              />
                                              <span className="my-error">
                                                {this.state.validated.errors["coupon_title"]}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-lg-12">
                                            <div className="form-group">
                                              <label>{siteConstants.GEN_DESCRIPTION}</label>
                                              <textarea
                                                className="form-control"
                                                placeholder={siteConstants.GEN_DESCRIPTION}
                                                name="description"
                                                onChange={this.handleChange}
                                                value={this.state.defaultData.description}
                                              >
                                              
                                              </textarea>
                                              <span className="my-error">
                                                {this.state.validated.errors["description"]}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-lg-12">
                                            <div className="form-group">
                                              <label>{siteConstants.GEN_EXPIRY_DATE}</label>
                                              <br/>
                                            
                                              <DatePicker
                                              name="selectedDate"
                                              selected={this.state.defaultData.selectedDate}
                                              onChange={this.handleDateChange}
                                              className="form-control"
                                              popperPlacement='top-start'
                                            />
                                              <br/>
                                              <span className="my-error">
                                                {this.state.validated.errors["selectedDate"]}
                                              </span>
                                            </div>
                                          </div>

                                          {this.state.updateData===true?
                                              <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>{siteConstants.LABEL_STATUS}</label>
                                                    <div className="custom-control custom-checkbox small">
                                                      <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        htmlFor="customCheck"
                                                        id="customCheck"
                                                        name="status"
                                                        checked={this.state.couponStatus}
                                                        onChange={e => this.handleStatusChange(e)}
                                                      />
                                                    </div>
                                                </div>
                                                </div>
                                           :''}

                                          <div className="col-lg-12">
                                            <div className="form-group">
                                               <button type="button" className="btn btn-primary"
                                                onClick={(event) =>{if(this.state.updateData){this.setState({ validated: this.props.funCouponUpdate(event, this.state) })}else{ this.setState({ validated: this.props.funCouponAction(event, this.state) }) } } }>
                                                {siteConstants.BTN_SAVE}</button>&nbsp;
                                              &nbsp;
                                              <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() =>
                                                  this.props.funPopupClose("editOpen")
                                                }
                                              >
                                                {siteConstants.BTN_CANCEL}
                                              </button>
                                            </div>
                                          </div>
                                      </form>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </DialogContent>
          </Dialog>
      );
  }
  else{
    return ('');
  }
 }
  else {
      return (
          <div>No Popup</div>
      );
  }
  }
}

//-- Here we are adding Reducer names, so it can be get data from reducers using store
function mapStateToProps(state) {
  const { language } = state;
  return {
    language
  };
}

const connectedEditPopup = connect(mapStateToProps)(EditPopup);
export default connectedEditPopup;
