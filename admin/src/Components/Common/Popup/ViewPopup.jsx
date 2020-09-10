import React, { Component } from 'react';
import { connect } from 'react-redux';

//-- Material
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

//-- CSS for Material
const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        backgroundColor: '#269abc'

    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey,
    },
    contentRoot: {
        padding: theme.spacing(2),
        fontSize: 14,
        width: 600,

    },
    actionRoot: {
        margin: 0,
        padding: theme.spacing(1),
    }
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h4">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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
    return (
        <MuiDialogActions>
            {children}
        </MuiDialogActions>
    );
});

class ViewPopup extends Component {
    render() {
        const { siteConstants } = this.props.language;
        
        let popupType = this.props.popupType;
        if(popupType === 'TermsComponenet') {
            //-- Popup will open on terms page for view the terms
            return (
                <Dialog onClose={() => this.props.funPopupClose('viewOpen')} aria-labelledby="customized-dialog-title" open={this.props.viewOpen}>
                    <DialogTitle id="customized-dialog-title" onClose={() => this.props.funPopupClose('viewOpen')}>
                        {this.props.terms.title}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_TITLE}</label>
                                                    <p>{this.props.terms.title}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_TYPE}</label>
                                                    <p>{this.props.terms.type}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_DESCRIPTION}</label>
                                                    <p>{this.props.terms.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button type="button" className="btn btn-info" onClick={() => this.props.funPopupClose('viewOpen')}>{siteConstants.LABEL_CLOSE}</button>
                    </DialogActions>
                </Dialog>       
            );
        } else if(popupType === 'BadDealerComponenet') {
            //-- Popup will open on terms page for view the Bad Dealer
            return (
                <Dialog onClose={() => this.props.funPopupClose('viewOpen')} aria-labelledby="customized-dialog-title" open={this.props.viewOpen}>
                    <DialogTitle id="customized-dialog-title" onClose={() => this.props.funPopupClose('viewOpen')}>
                        {this.props.badDealers.dealer_id}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_TITLE}</label>
                                                    <p>{this.props.badDealers.user_id}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_TYPE}</label>
                                                    <p>{this.props.badDealers.dealer_id}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_DESCRIPTION}</label>
                                                    <p>{this.props.badDealers.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button type="button" className="btn btn-info" onClick={() => this.props.funPopupClose('viewOpen')}>{siteConstants.LABEL_CLOSE}</button>
                    </DialogActions>
                </Dialog>       
            );
        } else if(popupType === 'NoticesComponenet') {
            //-- Popup will open on terms page for view the Notice
            return (
                <Dialog onClose={() => this.props.funPopupClose('viewOpen')} aria-labelledby="customized-dialog-title" open={this.props.viewOpen}>
                    <DialogTitle id="customized-dialog-title" onClose={() => this.props.funPopupClose('viewOpen')}>
                        {this.props.notices.title}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_TITLE}</label>
                                                    <p>{this.props.notices.title}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label>{siteConstants.LABEL_WRITTEN_DATE}</label>
                                                    <p>{this.props.notices.createdAt}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_DESCRIPTION}</label>
                                                    <p>{this.props.notices.description}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>{siteConstants.LABEL_PUSH_MESSAGE}</label>
                                                    <p>{this.props.notices.push_message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button type="button" className="btn btn-info" onClick={() => this.props.funPopupClose('viewOpen')}>{siteConstants.LABEL_CLOSE}</button>
                    </DialogActions>
                </Dialog>       
            );  
        } else if(popupType === 'AdvertismentsComponenet') {
            //-- Popup will open on terms page for view the Advertisments
            return (
                <Dialog onClose={() => this.props.funPopupClose('viewOpen')} aria-labelledby="customized-dialog-title" open={this.props.viewOpen}>
                    <DialogTitle id="customized-dialog-title" onClose={() => this.props.funPopupClose('viewOpen')}>
                        {this.props.advertisments.title}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_TITLE}</label>
                                                    <p>{this.props.advertisments.title}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_IMAGE}</label>
                                                    <p>{this.props.advertisments.advertisment_image}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button type="button" className="btn btn-info" onClick={() => this.props.funPopupClose('viewOpen')}>{siteConstants.LABEL_CLOSE}</button>
                    </DialogActions>
                </Dialog>       
            );  
        } else if(popupType === 'UsersComponenet') {
            //-- Popup will open on terms page for view the Users
            return (
                <Dialog onClose={() => this.props.funPopupClose('viewOpen')} aria-labelledby="customized-dialog-title" open={this.props.viewOpen}>
                    <DialogTitle id="customized-dialog-title" onClose={() => this.props.funPopupClose('viewOpen')}>
                        {this.props.users.first_name} {this.props.users.last_name}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_NAME}</label>
                                                    <p>{this.props.users.first_name} {this.props.users.last_name}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>{siteConstants.LABEL_COMPANY_NAME}</label>
                                                    <p>{this.props.users.company_name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button type="button" className="btn btn-info" onClick={() => this.props.funPopupClose('viewOpen')}>{siteConstants.LABEL_CLOSE}</button>
                    </DialogActions>
                </Dialog>       
            );   
        } else if(popupType === 'NotificationsComponenet') {
            //-- Popup will open on terms page for view the Notifications
            return (
                <Dialog onClose={() => this.props.funPopupClose('viewOpen')} aria-labelledby="customized-dialog-title" open={this.props.viewOpen}>
                    <DialogTitle id="customized-dialog-title" onClose={() => this.props.funPopupClose('viewOpen')}>
                        {this.props.notifications.title}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_TITLE}</label>
                                                    <p>{this.props.notifications.title}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label>{siteConstants.LABEL_WRITTEN_DATE}</label>
                                                    <p>{this.props.notifications.createdAt}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>{siteConstants.GEN_MESSAGE}</label>
                                                    <p>{this.props.notifications.notification_message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button type="button" className="btn btn-info" onClick={() => this.props.funPopupClose('viewOpen')}>{siteConstants.LABEL_CLOSE}</button>
                    </DialogActions>
                </Dialog>       
            );                  
        } else {
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

const connectedViewPopup = connect(mapStateToProps)(ViewPopup);
export default connectedViewPopup;