import React from 'react';

/**
 * @name Hub
 * @constructor
 * This component displays message to an unauthenticated user
 * */
class Hub extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="hub">
                {"Log in to access data."}
                {this.props.children}
            </div>
        )
    }
}
export  default Hub;