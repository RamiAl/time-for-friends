import React, {Component} from 'react';
import moment from 'moment-timezone';

export default class Clock extends Component{

    offset = this.props.timeZone

    state = {
        time : []
    };

    sleep(ms){
        return new Promise ((resolve) => setTimeout(resolve, ms))
    }

    componentDidMount(){
        this._isMounted = true;
        console.log(this.offset);
        
        //console.log(this.state.time);
        //this.updateClock();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    async updateClock(){
        while(this._isMounted){
            this.offset.map(item =>
                this.setState({time: moment.tz(item.timeZone).format()})
            )
            await this.sleep(500);
        }
    }

    render(){
        return(
            <>
                <h6>Time zone: </h6>
                <p> {this.offset.time}</p>
            </>
        );
    }
}