//-- React Standard
import React, { Component } from "react";
import { connect } from 'react-redux';

//-- Custom
import TopBar from "../Common/TopBar/TopBar";
import SideBar from "../Common/SideBar/SideBar";
import Footer from "../Common/Footer/Footer";
import { commissionSettingsActions } from '../../_actions';
import { apiConstants } from '../../_constants/api.constants';

class CommissionSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            commission_amount: '',
            initial_amount:'',
            initial_distance:'',
            regular_fare:'',
            error: {
                errCommissionAmount: '',
                errInitialAmount:'',
                errInitialDistance:'',
                errRegularFare:''
            },
           
        };
        this.handleChange = this.handleChange.bind(this);
    }

    //-- we are setting the Values
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    /*
    * componentDidMount - Initially it will call and get the data
    */
    componentDidMount() {
        const { dispatch } = this.props;

        let postData = {};
        postData.id = 1;

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
                        id: props.getCommissionSettings.getCommissionSettings.data._id,
                        commission_amount: props.getCommissionSettings.getCommissionSettings.data.commision_per_km,
                        initial_amount:props.getCommissionSettings.getCommissionSettings.data.base_price,
                        initial_distance:props.getCommissionSettings.getCommissionSettings.data.base_kilometer,
                        regular_fare:props.getCommissionSettings.getCommissionSettings.data.rate_per_km
                    })
                }
            }
        }
    }

    createSelectItems()
    {
        let items=[];
        for (let i = 1; i <= 25; i++) { 
            items.push(<option key={i} value={i} selected={this.state.initial_distance===i?'selected':''}>{i}</option>);            
       }
       return items
    }

      //-- handle validation for page
      handleValidation() {
        
        const { siteConstants } = this.props.language;

        const fields = this.state;
        let formIsValid = true;
        let amount=fields.initial_amount;
        let fare=fields.regular_fare;
        let commission=fields.commission_amount;
       
        if ((fields.initial_amount == '') || (fields.initial_distance == '') ||(fields.regular_fare == '') ||(fields.commission_amount=='') ) {
            formIsValid = false;
            if (fields.initial_amount == '') {
                this.setState({error:{errInitialAmount:siteConstants.ERR_CAN_NOT_BLANK}})
                return false;
            }
            if (fields.initial_distance == ''){
               this.setState({error:{errInitialDistance:siteConstants.ERR_CAN_NOT_BLANK}})
               return false;
            }

            if (fields.regular_fare == ''){
                this.setState({error:{errRegularFare:siteConstants.ERR_CAN_NOT_BLANK}});
                return false;
            }

            if (fields.commission_amount == ''){
                this.setState({error:{errCommissionAmount:siteConstants.ERR_CAN_NOT_BLANK}});
                return false;
            }
        }

        if (fields.initial_amount!=='' && fields.initial_amount!==undefined) {
            if (String(fields.initial_amount).match(/^[0-9]*$/)===null) {
                formIsValid = false;
                this.setState({error:{errInitialAmount:siteConstants.ERR_ONLY_NUMBERS}});
            }
        }

        if (fields.regular_fare!=='' && fields.regular_fare!==undefined) {
            if (String(fields.regular_fare).match(/^[0-9]*$/)===null) {
                formIsValid = false;
                this.setState({error:{errRegularFare:siteConstants.ERR_ONLY_NUMBERS}});
            }
        }

        if (fields.commission_amount!=='' && fields.commission_amount!==undefined) {
            if (String(fields.commission_amount).match(/^[0-9]*$/)===null) {
                formIsValid = false;
                this.setState({error:{errCommissionAmount:siteConstants.ERR_ONLY_NUMBERS}});
            }
        }

        return formIsValid;
    }

    selectHandler(e)
    {
        this.setState({initial_distance:e.target.value});
    }

    //-- Click on this function and data save into the database
    updateCommissionSettings = (e) => {
        e.preventDefault();

        const { commission_amount,initial_amount,initial_distance,regular_fare,id } = this.state;

        if(this.handleValidation()){
            let postData = {};
            postData.commision_per_km = commission_amount;
            postData.base_price =initial_amount;
            postData.base_kilometer = initial_distance
            postData.rate_per_km =regular_fare
            postData.settingId = id;

            let obj={}
            this.props.dispatch(commissionSettingsActions.updateCommissionSettings(apiConstants.GET_COMMISSION_SETTING, postData ,apiConstants.GET_COMMISSION_SETTING,obj));
           // this.props.dispatch(commissionSettingsActions.getCommissionSettings(apiConstants.GET_COMMISSION_SETTING, postData));

        }
        else {
            //alert("Form has errors.")
         }

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

                        <div className="container-fluid">

                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">{siteConstants.MENU_COMMISSION_SETTING}</h1>
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
                                                            <label>{siteConstants.LABEL_INITIAL_AMOUNT}</label>
                                                            <label className="my-error ml-3">{this.state.error.errInitialAmount}</label>
                                                            <input type="text" className="form-control form-control-user" name="initial_amount"
                                                                maxlength="3"
                                                                onChange={(e) => this.handleChange(e)} value={this.state.initial_amount}/>
                                                        </div>

                                                        {/* <div className="form-group">
                                                            <label>{siteConstants.LABEL_INITIAL_DISTANCE}</label>
                                                            <label className="my-error ml-3">{this.state.error.errInitialDistance}</label>
                                                            <input type="text" className="form-control form-control-user" name="initial_distance"
                                                                onChange={(e) => this.handleChange(e)} value={this.state.initial_distance}/>
                                                        </div> */}
                                                         <label>{siteConstants.LABEL_INITIAL_DISTANCE} </label>
                                                            <select name="dataTable_length" aria-controls="dataTable" onChange={(e)=>this.selectHandler(e)} className="custom-select custom-select-sm form-control form-control-sm">
                                                              {this.createSelectItems()}
                                                            </select>
                                                        

                                                        <div className="form-group">
                                                            <label>{siteConstants.LABEL_REGULAR_FARE}</label>
                                                            <label className="my-error ml-3">{this.state.error.errRegularFare}</label>
                                                            <input type="text" className="form-control form-control-user" name="regular_fare"
                                                             maxlength="3"   onChange={(e) => this.handleChange(e)} value={this.state.regular_fare}/>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>{siteConstants.LABEL_COMMISSION_AMOUNT}</label>
                                                            <label className="my-error ml-3">{this.state.error.errCommissionAmount}</label>
                                                            <input type="text" className="form-control form-control-user" name="commission_amount"
                                                              maxlength="3" onChange={(e) => this.handleChange(e)} value={this.state.commission_amount}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <button type="submit" onClick={this.updateCommissionSettings} className="btn btn-primary btn-user btn-block">{siteConstants.BTN_SAVE}</button>
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

const connectedCommissionSettings = connect(mapStateToProps)(CommissionSettings);
export { connectedCommissionSettings as CommissionSettings };