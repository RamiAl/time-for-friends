import React, { Component } from 'react';
import '../css/layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Friend } from 'the.rest/dist/to-import';
import moment from 'moment-timezone';
import store from '../utilities/Store';

export default class AddFriend extends Component {
    allTimeZone = moment.tz.names();
    emailCounter = 0;
    phoneCounter = 0;
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumbers: [String],
            emailAddresses: [''],
            city: '',
            country: '',
            timeZone: '',
            showFirstName: false,
            showLastName: false,
            showTimeZone: false,
            lang: store.lang
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleAddEmailOrPhoneInput = this.handleAddEmailOrPhoneInput.bind(this);
        this.handleEmailOrPhoneInput = this.handleEmailOrPhoneInput.bind(this);
        this.handleRemoveEmailOrPhone = this.handleRemoveEmailOrPhone.bind(this);
    }
    async componentDidMount() {
        this.storeListener = () => {
            this.setState({ lang: store.lang });
        };
        store.subscribeToChanges(this.storeListener);
    }

    componentWillUnmount() {
        store.unsubscribeToChanges(this.storeListener);
    }
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    check() {
        function filterItems(allTimeZone, city) {
            return allTimeZone.filter(function (el) {
                return el.toLowerCase().indexOf(city.toLowerCase()) !== -1;
            })
        }
    }
    showTimeZoneList() {
        let c = this.allTimeZone.filter(item => this.state.city !== "" && item.toLowerCase().includes(this.state.city.toLowerCase()));
        if (c.length > 0) {
            if (c.map(item => (<option key={item}>{item}</option>).length > 0)) {
                setTimeout(() => {
                    const v = this.refs.timeZone.value;
                    if (this.state.timeZone !== v) {
                        this.setState({ timeZone: v })
                    }
                }, 0);
                return c.map(item => (<option key={item}>{item}</option>));
            }
        } else {
            return this.allTimeZone.map(item => (
                <option key={item}>{item}</option>
            ));
        }

    }
    async onSubmit(e) {
        e.preventDefault();
        if (await this.vald() === true) {
            const { firstName, lastName, phoneNumbers, emailAddresses, city, country, timeZone } = this.state
            let friend = new Friend({ firstName, lastName, phoneNumbers, emailAddresses, city, country, timeZone });
            await friend.save();
            this.props.history.push(`/friendPage/${friend._id}`)
        }
    }

    async vald() {
        await this.valFirstName();
        await this.valLastName();
        await this.valTimeZone();
        if (this.state.showFirstName === false
            && this.state.showLastName === false
            && this.state.showTimeZone === false) {
            return true
        } else {
            return false
        }
    }

    valFirstName() {
        this.state.firstName === '' ? this.setState({ showFirstName: true }) : this.setState({ showFirstName: false })
    }
    valLastName() {
        this.state.lastName === '' ? this.setState({ showLastName: true }) : this.setState({ showLastName: false })
    }
    valTimeZone() {
        (this.state.timeZone === '') ? this.setState({ showTimeZone: true })
            : this.setState({ showTimeZone: false })
    }

    handleAddEmailOrPhoneInput(e) {
        let { name } = e.target;
        this.setState({ [name]: this.state[name].concat([""]) });
        name === 'phoneNumbers' ? this.phoneCounter++ : this.emailCounter++;
    }

    handleEmailOrPhoneInput(e, index) {
        let { name } = e.target;
        let { value } = e.target;
        name = this.state[name];
        name[index] = value;
        this.setState({ name })

    }
    handleRemoveEmailOrPhone(e, index) {
        let { name } = e.target;
        const propName = this.state[name];
        propName.splice(index, 1);

        this.setState({ propName });
        name === 'phoneNumbers' ? this.phoneCounter-- : this.emailCounter--;
    }

    render() {
        return (
            <>
                <Form className="addFriendForm" onSubmit={(e) => this.onSubmit(e)} ref="form">
                    <h2>{this.state.lang ? 'Add New Friend' : 'Lägg till ny vän'}</h2>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstName" value={this.state.name}
                            onChange={e => this.handleUserInput(e)} >
                            <Form.Label >{this.state.lang ? 'First name' : 'Förnamn'}</Form.Label>
                            <Form.Control name="firstName" placeholder={this.state.lang ? 'File in name' : 'Fyll in namn'} />
                            {(this.state.showFirstName ? <Form.Label className="error">{this.state.lang ? 'File in name' : 'Fyll in namn'}</Form.Label> : null)}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridLastName" value={this.state.lastName}
                            onChange={e => this.handleUserInput(e)}>
                            <Form.Label>{this.state.lang ? 'Last name' : 'Efternamn'}</Form.Label>
                            <Form.Control name="lastName" placeholder={this.state.lang ? 'File in lastName' : 'Fyll in efternamn'} />
                            {(this.state.showLastName ? <Form.Label className="error">{this.state.lang ? 'File in lastName' : 'Fyll in efternamn'}</Form.Label> : null)}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <div className="col-md-6">
                            <Form.Row style={{ justifyContent: 'space-between' }}>
                                <Form.Label className="inputStyle">{this.state.lang ? 'Phone number' : 'Telefonnumer'}</Form.Label>
                                <button type="button" onClick={e => this.handleAddEmailOrPhoneInput(e)} name="phoneNumbers" className="btn btn-info plusButton">
                                    +
                                </button>
                            </Form.Row>
                            {this.state.phoneNumbers.map((item, index) => (
                                <div key={index}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail" value={this.state.phoneNumbers}
                                            onChange={e => this.handleEmailOrPhoneInput(e, index)}>
                                            <Form.Control name="phoneNumbers" placeholder={this.state.lang ? 'Enter phone number' : 'Skriv in telefonnumer'} />
                                        </Form.Group>
                                        <div>
                                            {this.phoneCounter === 0 ? null :
                                                <button type="button" onClick={e => this.handleRemoveEmailOrPhone(e, index)} name="phoneNumbers"
                                                    className="btn btn-info">
                                                    -
                                                </button>
                                            }
                                        </div>
                                    </Form.Row>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-6">
                            <Form.Row style={{ justifyContent: 'space-between' }}>
                                <Form.Label className="inputStyle">{this.state.lang ? 'Email address' : 'Email address'}</Form.Label>
                                <button type="button" onClick={e => this.handleAddEmailOrPhoneInput(e)} name="emailAddresses" className="btn btn-info plusButton">
                                    +
                                </button>
                            </Form.Row>
                            {this.state.emailAddresses.map((item, index) => (
                                <div key={index}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail" value={this.state.emailAddresses}
                                            onChange={e => this.handleEmailOrPhoneInput(e, index)}>
                                            <Form.Control name="emailAddresses" placeholder={this.state.lang ? 'Enter email address' : 'Skriv in email address'} />
                                        </Form.Group>
                                        <div>
                                            {this.emailCounter === 0 ? null :
                                                <button type="button" onClick={e => this.handleRemoveEmailOrPhone(e, index)} name="emailAddresses"
                                                    className="btn btn-info">
                                                    -
                                                </button>
                                            }
                                        </div>
                                    </Form.Row>
                                </div>
                            ))}
                        </div>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity" value={this.state.city}
                            onChange={e => this.handleUserInput(e)}>
                            <Form.Label>{this.state.lang ? 'City' : 'Stad'}</Form.Label>
                            <Form.Control name="city" placeholder={this.state.lang ? 'City' : 'Stad'} ref="city" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCountry" value={this.state.country}
                            onChange={e => this.handleUserInput(e)}>
                            <Form.Label>{this.state.lang ? 'Country' : 'Land'}</Form.Label>
                            <Form.Control name="country" placeholder={this.state.lang ? 'Country' : 'Land'} ref="country" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTimeZone" value={this.state.timeZone}
                            onChange={e => this.handleUserInput(e)} >
                            <Form.Label>{this.state.lang ? 'Time zone' : 'Tidzon'}</Form.Label>
                            <Form.Control as="select" name="timeZone" ref="timeZone">
                                {this.showTimeZoneList()}
                            </Form.Control >
                            {(this.state.showTimeZone ? <Form.Label className="error">{this.state.lang ? 'Choose timezone' : 'Välj en tidzon'}</Form.Label> : null)}
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        {this.state.lang ? 'Add' : 'Lägg till'}
                    </Button>
                </Form>
            </>
        );
    }
}