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

    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
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

class DeletePopup extends Component {
    render() {
        const { siteConstants } = this.props.language;
        return (
            <Dialog
                open={this.props.deleteOpen}
                onClose={() => this.props.funPopupClose('deleteOpen')}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {siteConstants.BTN_DELETE}
                </DialogTitle>
                <DialogContent>
                    {siteConstants.GEN_ARE_YOU_SURE}
                </DialogContent>
                <DialogActions>
                    <button type="button" className="btn btn-primary" onClick={() => this.props.funDelete(this.props.deleteId)}>{siteConstants.BTN_DELETE}</button>&nbsp;
                    <button type="button" className="btn btn-info" onClick={() => this.props.funPopupClose('deleteOpen')}>{siteConstants.BTN_CANCEL}</button>
                </DialogActions>
            </Dialog>          
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

const connectedDeletePopup = connect(mapStateToProps)(DeletePopup);
export default connectedDeletePopup;