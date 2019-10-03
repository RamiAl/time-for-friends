import React, {Component} from 'react';
import moment from 'moment-timezone';
import store from './utilities/Store';
import { conditionalExpression } from '@babel/types';


export default class Clock extends Component{

    offset = this.props.timeZone
    date = this.props.date
    
    
    state = {
        time : this.offset,
        date:  this.offset,
        lang: store.lang
    };
    
    sleep(ms){
        return new Promise ((resolve) => setTimeout(resolve, ms))
    }

    componentDidMount(){
        
        this._isMounted = true;        
        this.updateClock();
        this.storeListener = ()=>{
            this.setState({lang: store.lang});   
        };
        store.subscribeToChanges(this.storeListener);        
    }

    componentWillUnmount(){
        store.unsubscribeToChanges(this.storeListener);
        this._isMounted = false;
        
    }

    async updateClock(){        

        while(this._isMounted){
            if(!this.props.clock){
                let tz = this.props.timeZone;
                if(!this.props.timeZone){ tz =  'Europe/Stockholm'; }
                let stateChange = {
                    engTimeWithOffset: moment.tz(tz).format('hh:mm:ss a'),
                    engDateWithOffset: moment.tz(tz).format('YYYY-MM-DD'),
                    isoTimeWithOffset: moment.tz(tz).format('HH:mm:ss'),
                    isoDateWithOffset:  moment.tz(tz).format('YYYY-MM-DD')
                }
                stateChange.time = store.lang ? stateChange.engTimeWithOffset : stateChange.isoTimeWithOffset;
                stateChange.date = store.lang ? stateChange.engDateWithOffset : stateChange.isoDateWithOffset;
                this.setState(stateChange);
                await this.sleep(500);
            }
        }


       /* 
        while(this._isMounted){  
            if(this.props.clock){
                this.setState(store.lang ? {time: moment.tz(this.props.timeZone).format('hh:mm:ss a'), date: moment.tz(this.props.timeZone).format('YYYY-MM-DD')}
                : {time: moment.tz(this.props.timeZone).format('HH:mm:ss'), date: moment.tz(this.props.timeZone).format('YYYY-MM-DD')})
            }else{      
                if(!this.offset){                
                    this.setState(store.lang ? {time: moment.tz('Europe/Stockholm').format('hh:mm:ss a')}: {time: moment.tz('Europe/Stockholm').format('HH:mm:ss')})
                }else{                
                    this.setState(store.lang ? {time: moment.tz(this.props.timeZone).format('hh:mm:ss a'), date: moment.tz(this.props.timeZone).format('YYYY-MM-DD')}
                : {time: moment.tz(this.props.timeZone).format('HH:mm:ss'), date: moment.tz(this.props.timeZone).format('YYYY-MM-DD')})
                }
            }
            await this.sleep(500);
        }*/
    }


    checkTime(){
       if (this.state.isoTimeWithOffset > '06:00:00') {
           if(this.state.isoTimeWithOffset < '20:00:00'){
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
                {this.props.clock ? 
                [<h3 key="c"> {this.state.time} {this.checkTime()}</h3>,
                <p key = "d"><b>{this.state.date}</b></p>] 
                :
                !this.offset ? <p key="b"> {this.checkTime()} {store.lang ? 'Local time: ': 'Lokala tiden:'}  
                {this.state.time}
                </p>  : [
                <h3 key="c"> {this.state.time}</h3>,
                <p key = "d"><b>{this.state.date} {store.lang ? this.checkTime() : this.checkTime()}</b></p>
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