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
            {store.lang ? <> <p style = {welcomStyle}>Welcome!</p><p style = {infoStyle}>Here you can see where your friends are on the map</p> </> :
             <> <p style = {welcomStyle}>Välkommen!</p><p style = {infoStyle}>Här kan du se var dina vänner är på kartan</p> </>}

                <Maps />
            </>
        ); 
    }
}