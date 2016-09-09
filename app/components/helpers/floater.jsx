import React from 'react';
import Baby from 'babyparse';

/**
 * @name Floater
 * @constructor
 * @property{Function} callBackFunc
 * @property{Function} filterCallBack
 * A helper component presents a file upload element for the user to upload CSV data to the system
 * It processes the data and sends it back to App for storage.
 * */

class Floater extends React.Component{
    constructor(props){
        super(props);
        this.state = { toggleInput: false }
    }
    fileUploadChanged(e){
        const self = this;
        let file = e.target.files[0];
        let reader = new FileReader();
        let input = '';
        //HTML5 API may not work in some browsers
        reader.addEventListener('load',function(){
            input = reader.result;
            var res = Baby.parse(input, {header : true});
            self.processCsvDataForStorage(res.data);
        });
        if(file){
            reader.readAsText(file);
        }
    }
    processCsvDataForStorage(data){
        let newData = [];
        for(var i = 0; i < data.length; i++){
            let newObj = {},
                currentObj = data[i];
            for(var prop in currentObj){
                if(currentObj.hasOwnProperty(prop)){
                    let cloneProp = prop.replace(/ /gi,"_").replace(/\?/gi,"-").replace(/#/gi,"id");
                    Object.defineProperty(newObj,cloneProp,{
                        value : currentObj[prop],
                        enumerable : true,
                        writable : true,
                        configurable : true
                    });
                }
            }
            newData.push(newObj);
        }
        if(this.props.callBackFunc !== undefined){
            this.props.callBackFunc(newData);
            this.setState({toggleInput:false});
        }
    }
    toggleFileUpload(){
        const   self = this,
            toggleState = self.state.toggleInput;
        self.setState({toggleInput:!toggleState});
    }
    toggleFilter(){
        const self = this;
        if(self.props.filterCallBack){
            self.props.filterCallBack();
        }
    }
    render(){
        const self = this;
        return (
            <div className="floating-button">
                <div className="floating-container">
                    <div className={self.state.toggleInput === true ? "file-upload-box show" :"file-upload-box hide"}>
                        <label htmlFor="csvUpload">Upload CSV file</label>
                        <input onChange={self.fileUploadChanged.bind(self)} ref="fileUpload" id="csvUpload" type="file"/>
                    </div>
                    <span className="upload-button" onClick={self.toggleFileUpload.bind(self)}>
                        <span title="upload file" className="upload-icon"/>
                    </span>
                    <span className="upload-button" onClick={self.toggleFilter.bind(self)}>
                        <span title="filter" className="filter-icon"/>
                    </span>
                </div>
            </div>
        )
    }
}
Floater.propTypes = {
    callBackFunc : React.PropTypes.func,
    filterCallBack : React.PropTypes.func
};
export default Floater;