import React, {Component} from 'react';
import Maps from './Maps'
//import Clock from './Clock'
import store from './utilities/Store';
export default class Home extends Component {
    render() {
        store.subscribeToChanges(this.storeSubscriber);
        const infoStyle = {
            fontSize: '3vw',
            textAlign: 'center',
        }
        const welcomStyle = {
            marginTop: '2vh',
            fontSize: '4vw',
            textAlign: 'center',
        }
        return(
            <>
            <p style = {welcomStyle}>{store.lang ? 'Welcome!': 'Välkommen!'}</p><p style = {infoStyle}> {store.lang ? 'Here you can see where your friends are on the map' : 'Här kan du se var dinna vänner befiner sig på kartan'} </p>
                <Maps />
            </>
        ); 
    }
}