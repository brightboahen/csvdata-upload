import React from 'react';

/**
 * @name{Widget}
 * @constructor
 * Widget component with inline styling for portability - should there be the need to use it on a different platform
 * It receives two main props - A callback method to dismiss its modal and a content to display
 * The intention of this component is to meet the last specification in the test.
 * */
class Widget extends React.Component{
    constructor(props){
        super(props)
    }
    closeWidget(){
        const self = this;
        if(self.props.closeWidgetCallBack){
            self.props.closeWidgetCallBack();
        }
    }
    render(){
        const self = this,
                urlOrCode =  self.props.contentToDisplay !== undefined ? self.props.contentToDisplay.id : '';
        return(
            <div className="share-card" style={{position:'absolute', top:50+'%', left:50+'%', width:320+'px', height:400+'px', padding:10+'px'}}>
                {/*Not vigorously tested so may still contain some bug*/}
                <div style={{position:'relative', height:100+'%', width:100+'%', float:'left', border:1+'px solid #eee', background: '#fff', padding: 10+'px'}}>
                    <div style={{textAlign:'center', border:1+'px solid #eee'}}>
                        <img src="https://lostmy.name/static/eagle/2016-08-23/899597e57917ab328561033d30157a31239efb45/assets/mermaid/images/logo-148x35.png" alt="lostmyname"/>
                    </div>
                    <div style={{textAlign:'center', border:1+'px solid #eee', height: 100+'px', lineHeight: 40+'px'}}>
                        {/*Using the id field from the CSV data as the referral code - This could be any dynamic code or URL*/}
                       <div>URL/Referral code :  </div>
                        {urlOrCode}
                    </div>
                    <div style={{textAlign:'center', border:1+'px solid #eee', width:100+'%', height: 200+'px'}}>
                        <textarea defaultValue={"Type in here"} style={{resize:'none', width:96+'%', height: 96+'%', border: 'none'}}/>
                    </div>
                    {/*Actions - Only the close button is implemented but the share button could be supplied through the property {shareMethod}*/}
                    <div style={{textAlign:'center', border:1+'px solid #eee', width:100+'%', height: 30+'px'}}>
                        <span style={{display: 'inline-block',height: 24+'px', width: 60+'px', background: '#2979FF', cursor:'pointer'}} className="send-button">Share</span>
                        <span style={{display: 'inline-block',height: 24+'px', width: 60+'px', background: '#2979FF', marginLeft: 10+'px', cursor:'pointer'}} className="send-button" onClick={self.closeWidget.bind(this)}>Close</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Widget;

Widget.propTypes = {
    contentToDisplay : React.PropTypes.object,
    closeWidgetCallBack : React.PropTypes.func,
    shareMethod : React.PropTypes.func
};