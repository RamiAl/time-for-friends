import React, {Component} from 'react';
import moment from 'moment-timezone';

export default class Clock extends Component{

    offset = this.props.timeZone

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
            await this.sleep(500);
        }
    }

    render(){
        return(
            <>
                <h1>{this.state.time}</h1>
                <p><b>{this.state.date}</b></p>
            </>
        );
    }
}