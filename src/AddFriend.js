import React, {Component} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default class AddFriend extends Component {

    async componentDidMount(){
        /*let friend = new Friend ({name: 'Rami', age: 23, emailAddress: ['Rami.almhana@yahoo.com', 'yjftyukjyukyk'],
                                phoneNumber: ['0700455645','9569976867'], city: 'Malmö',
                                country: 'Sverige', timeZone: 'UTM -01:00'});
        await friend.save();
        console.log('friend', friend);

        let allFriends = await Friend.find().catch(console.error());
        allFriends.delete();
        console.log('All friends', allFriends);*/
        //let mom = moment().tz("America/New_York").format();
        //console.log(mom);
    
    }
    gotEmail(event){
        event.preventDefault();
        console.log(event.target);
    }
    
    

    render() {
        return (
            <Form style = {{margin: 50}} onClick={this.gotEmail}>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName" >
                <Form.Label >First name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Phone number</Form.Label>
                <Form.Control placeholder="Phone number" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control placeholder="Phone number" />
            </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Country</Form.Label>
                <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Time zone</Form.Label>
                <Form.Control as="select">
                    <option>Choose...</option>
                    <option>...</option>
                </Form.Control>
                </Form.Group>

            </Form.Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        );
    }
}