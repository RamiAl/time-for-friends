import React, { Component } from 'react';
import Maps from './Maps'

export default class Home extends Component {
    render() {
        const infoStyle = {
            fontSize: '3vw',
            textAlign: 'center',
        }
        const welcomStyle = {
            marginTop: '2vh',
            fontSize: '4vw',
            textAlign: 'center',
        }
        return (
            <>
                <p style={welcomStyle}>Welcome!</p>
                <p style={infoStyle}>Here you can see where your friends are on the map</p>
                <Maps />
            </>
        );
    }
}