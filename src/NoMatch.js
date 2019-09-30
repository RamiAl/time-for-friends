import React, { Component } from  'react';
import store from './utilities/Store';
export default class NoMatch extends Component{
    render(){
        store.subscribeToChanges(this.storeSubscriber);
        return(
            <>
            {store.lang ?<div>NO MATCH!</div> : <div>Inga träffar funna!</div> }  
            
            </>
        );
    }
} 