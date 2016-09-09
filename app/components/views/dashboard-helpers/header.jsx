import React from 'react';
import If from '../../helpers/if';

/**
 * @name Header
 * @constructor
 * @property{Object} dataTemplate
 * @property{Boolean} filterToggle
 * @property{Array} fullData -  seems redundant
 * @property{Function} queryCallBack
 * This component renders the header section of the application and accepts queries as a delegate to App
 * Header titles are dynamic and represent the original fields/headers found in the CSV data. The assumption is that,
 * the system may be used for more than one survey and the header title may need changing.
 * */
export default class Header extends React.Component{
    constructor(props){
        super(props);
    }
    makeHeaderTitles(){
        const   self        =   this;
        let     headerItems =   [];
        if(self.props.dataTemplate !== undefined){
            for(var prop in self.props.dataTemplate){
                if(self.props.dataTemplate.hasOwnProperty(prop)){
                    let propWithoutDashes = prop.replace(/\_/gi," ").replace(/\-/gi,"?");
                    headerItems.push(<div key={prop} className="header-item">{propWithoutDashes}</div>)
                }
            }
        }
        return headerItems;
    }
    makeSearchInputCells(){
        const self = this;
        let searchFields = [];
        if(self.props.dataTemplate !== undefined){
            for(var prop in self.props.dataTemplate){
                if(self.props.dataTemplate.hasOwnProperty(prop)){
                    searchFields.push(<div key={prop} className="search-entry-item"><input placeholder="enter search" onChange={self.queryInput.bind(this,prop)}/></div>);
                }
            }
        }
        return searchFields;
    }
    queryInput(prop,evt){
        const   self    = this,
            query   = evt.target.value;
        if(self.props.queryCallBack){
            self.props.queryCallBack({key:prop, value:query});
        }
    }
    render(){
        const self = this;
        return (
            <div className="main-page-header">
                <div className="content-row">
                    {self.makeHeaderTitles()}
                </div>
                <If condition={self.props.filterToggle === true}>
                    <div className="content-row">
                        {self.makeSearchInputCells()}
                    </div>
                </If>
            </div>
        )
    }
}
Header.propTypes = {
    dataTemplate : React.PropTypes.object.isRequired,
    filterToggle : React.PropTypes.bool,
    fullData : React.PropTypes.array,
    queryCallBack : React.PropTypes.func
};