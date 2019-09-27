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
            if(this.props.clock){
                this.setState({time: moment.tz(this.props.timeZone).format('HH:mm:ss'), date: moment.tz(this.props.timeZone).format('YYYY-MM-DD')})
            }else{      
                if(!this.offset){                
                    this.setState({time: new Date().toLocaleTimeString()})
                }else{                
                    this.setState({time: moment.tz(this.offset).format('HH:mm:ss'), date: moment.tz(this.offset).format('YYYY-MM-DD')})
                }
            }
            await this.sleep(500);
        }
    }


    checkTime(){
       if (this.state.time > '06:00:00') {
           if(this.state.time < '20:00:00'){
             return <i className="fas fa-sun"></i>;  
           }else{
            return <i className="fas fa-moon"></i>;
        }
       }else{
           return <i className="fas fa-moon"></i>;
       }
    }

    render(){
       
        return(
            <>
            {!this.offset ? <p key="b"> {this.checkTime()} Local time: {this.state.time}</p>  : [
            <h3 key="c"> {this.state.time}</h3>,
            <p key = "d"><b>{this.state.date} {this.checkTime()}</b></p>
            ]}

               
            </>
        );
    }
}

/*
{this.props.clock ? 
            [<h3 key="c"> {this.state.time}</h3>,
            <p key = "d"><b>{this.state.date}</b></p>] 
            :
             !this.offset ? <p key="a">Local time: {this.state.time}</p> : [
            <h3 key="c"> {this.state.time}</h3>,
            <p key = "d"><b>{this.state.date}</b></p>
            ]} */