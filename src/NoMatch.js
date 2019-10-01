import React, { Component } from  'react';
import store from './utilities/Store';
export default class NoMatch extends Component{
    render(){
        store.subscribeToChanges(this.storeSubscriber);
        return(
            <>
            <div>{store.lang ? 'NO MATCH!' : 'Inga träffar funna!'}</div>  
            </>
        );
    }
} 