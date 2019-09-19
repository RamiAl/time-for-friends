import React, {Component} from 'react';
import moment from 'moment-timezone';

export default class Clock extends Component{

    offset = this.props.timeZone
    date = this.props.date
    
    
    state = {
        time : this.offset,
        date:  this.offset
    };

    sleep(ms){
        return new Promise ((resolve) => setTimeout(resolve, ms))
    }

    componentDidMount(){
        this._isMounted = true;
        this.updateClock();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    async updateClock(){
        while(this._isMounted){
            this.setState({time: moment.tz(this.offset).format('HH:mm:ss'), date: moment.tz(this.offset).format('YYYY-MM-DD')})
            //console.log(this.offset);
            
            if(!this.offset){
                this.setState({time: new Date().toLocaleTimeString()})
            }else{
                this.setState({time: moment.tz(this.offset).format()})
            }
            await this.sleep(500);
        }
    }


    render(){
       
        return(
            <>
            {!this.offset ? <p key="a">Local time: {this.state.time}</p> : [<b key ="b">Time zone: </b>, <p key="c"> {this.state.time}</p>]}
                <h1>{this.state.time}</h1>
                <p><b>{this.state.date}</b></p>
            </>
        );
    }
}