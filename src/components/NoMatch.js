import React, { Component } from 'react';
import store from '../utilities/Store';
export default class NoMatch extends Component {

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
                <div>{this.state.lang ? 'NO MATCH!' : 'Inga träffar funna!'}</div>
            </>
        );
    }
} 