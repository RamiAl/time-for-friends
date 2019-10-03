import React, {Component} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import FriendsList from './FriendsList'
import TimeRangeSlider from 'react-time-range-slider';
import ScrollTop from "react-scrolltop-button";
import store from './utilities/Store';
export default class SearchFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sortBy: 'firstName',
            value: {
                start: "00:00",
                end: "23:45",
            },
            engstart: "00:00",
            engend:"11:45",
            timeofday: true,
            lang: store.lang
        };
        this.timeChangeHandler = this.timeChangeHandler.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    } 
    componentDidMount(){
        this.toeng();
        this.storeListener = ()=>{
            this.setState({lang: store.lang});   
        };
        store.subscribeToChanges(this.storeListener);
        
    }

    componentWillUnmount(){
        store.unsubscribeToChanges(this.storeListener);
    }
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    
    timeChangeHandler(time){
        this.setState({
            value: time
        });
        this.toeng();
    }

    toeng(){
        let s = this.state.value.start;
        if(s[1] === ':'){
            s = '0'+s;
        }
        if (s < '12:00') {
         if(s < '01:00'){
             s = '12' + s.substr(2);
         }
         if(this.state.engstart !== s + 'am'){
             this.setState({
                 engstart: s + 'am'
                });
            }
        }else{
            if (this.state.engstart !== s + 'pm') {
                  if(s >= '13:00'){
                    let nr;
                    nr = parseInt(s,10);
                    nr = nr-12;
                    s = nr+s.substr(2); 
                    if (nr < 10) {
                        s = '0'+s;  
                    }
                  }
                  this.setState({
                    engstart: s + 'pm'
                  })
            }
        }

let e = this.state.value.end;
if(e[1] === ':'){
    e = '0'+e;
}

if (e < '12:00') {
 if(e < '01:00'){
     e = '12' + e.substr(2);
 }
 if(this.state.engend === e + 'am'){
  return;
 }
    this.setState({
    engend: e + 'am'
  });
}else{
    if (this.state.engend !== e + 'pm') {
          if(e >= '13:00'){
            let nr;
            nr = parseInt(e,10);
            nr = nr-12;
            e = nr+e.substr(2); 
            if (nr < 10) {
                e = '0'+e;  
            }
          }
          this.setState({
            engend: e + 'pm'
          })
    }
}     
    }
    render() {
        return (
            <>
                <ScrollTop
                text="Go to the top"
                distance={100}
                breakpoint={768}
                className="scroll-your-role scrollTop"
                speed={1000}
                />
                <Form className="searchPage">
                <div className="container-fluid ">
                    <div className="row ">

                        <Form.Group className="col-md-8" controlId="formGridName" value={this.state.name} 
                        onChange={this.handleUserInput} >
                        <Form.Label style = {{fontSize: 50}} >{store.lang ?'Search':'Sök'}</Form.Label>
                        <Form.Control name="name" placeholder="Name" />
                        </Form.Group>

                        <Form.Group className="col-md-4 sortBy" controlId="formGridState" value={this.state.timeZone} 
                        onChange={this.handleUserInput} >
                        <Form.Label >{store.lang ?'Sort by':'Sortera via'}</Form.Label>
                        <Form.Control as="select" name="sortBy" placeholder="Country">
                        <option value = "firstName">{store.lang ?'First name':'Förnamn'}</option>
                        <option value = "lastName">{store.lang ?'Last name':'Efternamn'}</option>
                        <option value = "timeZone">{store.lang ?'Time zon':'Tidszone'}</option>
                        </Form.Control >
                        </Form.Group>
                        </div>
                    </div>
                    <TimeRangeSlider 
                    format={24}
                    maxValue={"23:45"}
                    minValue={"00:00"}
                    name={"time_range"}
                    onChange={this.timeChangeHandler}
                    step={15}
                    value={this.state.value}/>
                        
                    <div className = "timeRange">
                        <h6>{store.lang ?'start: ':'start: '}  {store.lang ?  this.state.engstart : this.state.value.start}</h6>
                        <h6>{store.lang ?'end: ':'slut: '} {store.lang ?  this.state.engend : this.state.value.end}</h6>
                    </div>

                    <FriendsList {...this.state}/>
                </Form>
            </>
        );
    }
}