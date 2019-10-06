import React, { Component } from 'react';
import Maps from './Maps'
import store from '../utilities/Store';
import '../css/layout.css';

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = { lang: store.lang };
    }

    componentDidMount() {
        this.storeListener = () => {
            this.setState({ lang: store.lang });
        };
        store.subscribeToChanges(this.storeListener);
    }

    componentWillUnmount() {
        store.unsubscribeToChanges(this.storeListener);
    }

    render() {
        return (
            <>
                <p className="homeWelcomStyle">{store.lang ? 'Welcome!' : 'Välkommen!'}</p>
                <p className="homeInfoStyle"> {store.lang ? 'Here you can see where your friends are on the map'
                    : 'Här kan du se var dinna vänner befiner sig på kartan'} </p>
                <Maps {...{ friendPage: true }} />
            </>
        );
    }
}