import React from 'react';
import Header from './dashboard-helpers/header';
import Content from './dashboard-helpers/content';
import Widget from './dashboard-helpers/widget';
import If from '../helpers/if';

/**
 * @name Dashboard
 * @constructor
 * @property{Array} data - survey data retrieved from the database
 * @property{Boolean} filter - indicates when to notify the header component to toggle filter inputs
 * @property{Function} queryBack - callback for the App component, called when the content component need to notify the
 * component of filtering queries
 * */

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showWidget: false,
        };
        this.widgetProps = {};
    }
    renderContents(){
        const self = this;
        let contents = [];
        if(self.props.data !== undefined && self.props.data.length >= 1){
            self.props.data.forEach( (item, index) => {
                contents.push(<Content key={index} contentData={item} onClick={self.onContentItemClicked.bind(self,item)}/>);
            })
        }
        return contents;
    }
    onContentItemClicked(contentData){
        const self = this,
            currentItemState = self.state.showWidget;
        self.setState({showWidget:!currentItemState});
        self.widgetProps = contentData;
    }
    render(){
        const self = this;
        let defaultTemplateForHeader = self.props.data[0] !== undefined ? self.props.data[0] : {};
        let fullData = self.props.data !== undefined ? self.props.data : [];
        return (
            <div style={{position:'relative'}}>
                <div className="main-page">
                    <div className="content-row">
                        <Header queryCallBack={self.props.queryBack} fullData={fullData} filterToggle={self.props.filter} dataTemplate={defaultTemplateForHeader}/>
                    </div>
                    <div>
                        {self.renderContents()}
                    </div>
                </div>
                <If condition={self.state.showWidget === true}>
                    <Widget closeWidgetCallBack={self.onContentItemClicked.bind(self)} contentToDisplay={self.widgetProps}/>
                </If>
                {this.props.children}
                <If condition={(self.props.data === undefined || self.props.data.length <= 0)}>
                    <div>{"Please wait while we fetch the data requested!"}</div>
                </If>
            </div>
        )
    }
}
Dashboard.propTypes = {
    data : React.PropTypes.array.isRequired,
    filter : React.PropTypes.bool,
    queryBack : React.PropTypes.func
};
export  default Dashboard;