import React from 'react';

/**
 * @name Content
 * @constructor
 * @property{Object} contentData - Data for the content component to display
 * This component renders rows of data - each row on the UI is a content component
 * */
export default class Content extends React.Component{
    constructor(props){
        super(props);
    }
    renderCellOfContents(){
        const self = this;
        let cells = [];
        if(self.props.contentData !== undefined){
            for(var prop in self.props.contentData){
                cells.push(<div key={prop} className="main-page-entry-item">{self.props.contentData[prop]}</div>);
            }
        }
        return cells;
    }
    render(){
        const self = this;
        return(
            <div style={{cursor:'pointer'}} onClick={this.props.onClick} className="content-container">
                <div className="content-row">
                    {self.renderCellOfContents()}
                </div>
            </div>
        )
    }
}
Content.propTypes = {
    contentData : React.PropTypes.object.isRequired
};