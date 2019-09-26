import React, {Component} from 'react';
import Maps from './Maps'
//import Clock from './Clock'
export default class Home extends Component {
    render() {
        const textStyle = {
            margin: '2vh 0vw 0 27vw' 
        }
        const welcomStyle = {
            margin: '2vh 0 0 40vw'
        }
        return(
            <>
                <h1 style = {welcomStyle}>Welcome!</h1>
                <h3 style = {textStyle}>Here you can see where your friends are on the map</h3>
                <Maps />
            </>
        ); 
    }
}