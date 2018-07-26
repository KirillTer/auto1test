import React, { Component } from 'react';
import axios from '../../../axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMerchant } from '../../../store/actions'
import './NewPost.css';

class NewPost extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        hasPremium: 'No'
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
                let passedMerchant = {...data};
                passedMerchant['id'] = response.data.name;
                this.props.onMerchantAdded(passedMerchant);
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
                    <option value="No">NO</option>
                    <option value="Yes">YES</option>
                </select>
                <button onClick={this.postDataHandler}>Add Merchant</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onMerchantAdded: (merchant) => dispatch(addMerchant(merchant))
    }
}

export default connect(null, mapDispatchToProps)(NewPost);