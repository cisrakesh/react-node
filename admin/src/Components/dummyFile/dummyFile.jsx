//-- React Standard
import "regenerator-runtime/runtime";
import React, { Component } from "react";
import { connect } from 'react-redux';

//-- Custom
import TopBar from "../Common/TopBar/TopBar";
import SideBar from "../Common/SideBar/SideBar";
import Footer from "../Common/Footer/Footer";
import {DropzoneArea} from 'material-ui-dropzone'
import { reportActions } from "../../_actions";
// var fs = require('fs');
// var sizeOf = require('image-size');
const elem = document.createElement('canvas');

class DummyFile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []  ,
            maxSize:4     
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveHandler =this.saveHandler.bind(this);
        this.createThumbnail=this.createThumbnail.bind(this);
    }

    handleChange(files){
        this.setState({
          files: files
        });
      }

    /*
    * componentDidMount - Initially it will call and get the data
    */
    componentDidMount() {


    }

    createThumbnail()
    {

        // var canvas, ctx, thumbnail, thumbnailScale, thumbnailWidth, thumbnailHeight;
        // // create an off-screen canvas
        // canvas = document.createElement('canvas');
        // ctx = canvas.getContext('2d');
    
        // //Calculate the size of the thumbnail, to best fit within max/width (cropspadding)
        // thumbnailScale = (image.width / image.height) > (thumbnailMaxWidth / thumbnailMaxHeight) ?
        //     thumbnailMaxWidth / image.width :
        //     thumbnailMaxHeight / image.height;
        // thumbnailWidth = image.width * thumbnailScale;
        // thumbnailHeight = image.height * thumbnailScale;
    
        // // set its dimension to target size
        // canvas.width = thumbnailWidth;
        // canvas.height = thumbnailHeight;
    
        // // draw source image into the off-screen canvas:
        // ctx.drawImage(image, 0, 0, thumbnailWidth, thumbnailHeight);
    
        // //Draw border (optional)
        // ctx.rect(0, 0, thumbnailWidth, thumbnailHeight - 1);
        // ctx.strokeStyle = "#555555";
        // ctx.stroke();
    
        // // encode image to data-uri with base64 version of compressed image
        // thumbnail = new Image();
        // thumbnail.src = canvas.toDataURL('image/jpeg', 70);
        // return thumbnail;
    }

    saveHandler(maxSize,minWidth,minHeight,maxWidth,maxHeight,thumbnail)
    {
        const {dispatch}=this.props

        let files=this.state.files;
        if(files.length!==0)
        {
        let fileArray=[];
        let fileLength=files.length;
        for(let i=0;i<files.length;i++)
        {
            let fileName=files[i].name;
            let fileType = files[i].type;
            let fileSize = Math.round((files[i].size/1000) * 10) / 10
            let extension = files[i].name.split('.').pop().toLowerCase();
            let accepeted_Extensions=['jpg', 'jpeg', 'png','svg']

            if(accepeted_Extensions.includes(extension)===true && fileSize <= maxSize)
            {
            let height='',width='';
            
                var reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = function (e) {
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function () {
                    
                        height = this.height;
                        width = this.width;

                        if(thumbnail===1)
                        {
                            // pass width and height according to thumnail size maxWidth=100 ,maxHeight=100
                            thumbMaxWidth=100,thumbMaxHeight=100;
                            let thumbnailScale = (width / height) > (thumbMaxWidth / thumbMaxHeight) ? thumbMaxWidth / width : thumbMaxHeight / height;
                            let thumbnailWidth = width * thumbnailScale;
                            let thumbnailHeight = height * thumbnailScale;
                            elem.width = thumbnailWidth;
                            elem.height = thumbnailHeight;
                            const ctx = elem.getContext('2d')
                            ctx.drawImage(image, 0, 0, thumbnailWidth, thumbnailHeight);

                            ctx.canvas.toBlob((blob) => {                          

                                const file = new File([blob], fileName, {
                                    type:fileType ,
                                    lastModified: Date.now()
                                });

                                
                                fileArray.push(file);
                               
                                if(i===fileLength-1)
                                {                                 
                                let postData={};
                                postData.files=fileArray;   
                               // dispatch(reportActions.DummyFileUpload('/admin/thumbnail',postData)); 
                                }
                            }, fileType, 1);
                        }

                    
                        if (height > minWidth || width > minHeight) {
                            
                            let newImgScale = (width / height) > (maxWidth / maxHeight) ? maxWidth / width : maxHeight / height;
                            let newImgWidth = width * newImgScale;
                            let newImgHeight = height * newImgScale;

                           
                            elem.width = newImgWidth;
                            elem.height = newImgHeight;
                            const ctx = elem.getContext('2d')
                            ctx.drawImage(image, 0, 0, newImgWidth, newImgHeight);

                            ctx.canvas.toBlob((blob) => {                          

                                const file = new File([blob], fileName, {
                                    type:fileType ,
                                    lastModified: Date.now()
                                });

                                
                                fileArray.push(file);
                               
                                if(i===fileLength-1)
                                {                                 
                                let postData={};
                                postData.files=fileArray;   
                                dispatch(reportActions.DummyFileUpload('/admin/dummy-file-upload',postData)); 
                                }
                            }, fileType, 1);
                            
                            return false;
                        }
                        else{
                            fileArray.push(files[i])

                            let postData={};
                            postData.files=fileArray;   
                            dispatch(reportActions.DummyFileUpload('/admin/dummy-file-upload',postData)); 

                            alert("Uploaded image has valid Height and Width."); 
                        }
                        return true;
                    };           
            }.bind(this);
            }
            else{
                fileLength=fileLength-1;
                alert( fileName + " image can't be uploaded due to size or filetype");
            } } 
                
            }
            else{
                alert("File not selected")
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

                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div className="row">
                                        <DropzoneArea 
                                        id="file"
                                        onChange={this.handleChange.bind(this)}
                                        maxSize={this.state.maxSize}
                                        />

                                        <button onClick={()=>this.saveHandler(50,100,100,300,300,0)} className="mt-3 btn btn-primary">Save</button>
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

const connectedDummyFile = connect(mapStateToProps)(DummyFile);
export { connectedDummyFile as DummyFile };