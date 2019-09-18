import React, {Component} from 'react';
import moment from 'moment-timezone';

export default class Clock extends Component{

    offset = this.props.timeZone
    date = this.props.date
    
    
    state = {
        time : this.offset
    };

    sleep(ms){
        return new Promise ((resolve) => setTimeout(resolve, ms))
    }

    componentDidMount(){
        this._isMounted = true;
        //console.log(this.offset);
        
        //console.log(this.state.time);
        this.updateClock();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    async updateClock(){
        while(this._isMounted){
            console.log(this.offset);
            
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
            {!this.offset ? <p>Local time: {this.state.time}</p> :
            [<b>Time zone: </b>, <p> {this.state.time}</p>]}
            </>
        );
    }
}