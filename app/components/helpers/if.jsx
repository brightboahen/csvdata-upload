'use strict';
import React from 'react';

/**
 * @name If
 * @constructor
 * @property{Boolean} condition
 * Helper component that renders the child based on the supplied condition
 * */
class If extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        if(this.props.condition === true){
            return this.props.children;
        }else{
            return null;
        }
    }
}
If.propTypes = {
    condition : React.PropTypes.bool.isRequired
};
export default If;