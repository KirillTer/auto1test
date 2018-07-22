import React, { Component } from 'react';
import axios from '../../../axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        hasPremium: false
    }

    componentDidMount () {
        // If unauth => this.props.history.replace('/posts');
        console.log( this.props );
    }

    postDataHandler = () => {
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
            hasPremium: this.state.hasPremium
        };
        axios.post( '/merchants.json', data )
            .then( response => {
                console.log( response );
                this.props.history.replace('/posts');
                // this.setState( { submitted: true } );
            } );
    }

    render () {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/posts" />;
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Merchant</h1>
                <label>Firstname</label>
                <input type="text" value={this.state.firstname} onChange={( event ) => this.setState( { firstname: event.target.value } )} />
                <label>Lastname</label>
                <input rows="4" value={this.state.lastname} onChange={( event ) => this.setState( { lastname: event.target.value } )} />
                <label>Email</label>
                <input type="text" value={this.state.email} onChange={( event ) => this.setState( { email: event.target.value } )} />
                <label>Phone</label>
                <input type="text" value={this.state.phone} onChange={( event ) => this.setState( { phone: event.target.value } )} />
                <label>Premium</label>
                <select value={this.state.hasPremium} onChange={( event ) => this.setState( { hasPremium: event.target.value } )}>
                    <option value="false">NO</option>
                    <option value="true">YES</option>
                </select>
                <button onClick={this.postDataHandler}>Add Merchant</button>
            </div>
        );
    }
}

export default NewPost;