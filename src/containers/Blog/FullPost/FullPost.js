import React, { Component } from 'react';
import axios from '../../../axios';
import { connect } from 'react-redux';
import { removeMerchant } from '../../../store/actions'

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            hasPremium: 'No'
        },
        isEditing: false
    }

    componentDidMount () {
        // console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.id ) {
            // console.log('this.props.match.params.id',this.props.match.params.id);
            // console.log('this.state.loadedPost',this.state.loadedPost);
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id) ) {
                axios.get( '/merchants/' + this.props.match.params.id + '.json' )
                    .then( response => {
                        // console.log('response',response);
                        let post = response.data;
                        post['id'] = this.props.match.params.id;
                        this.setState( { loadedPost: post } );
                    } );
            }
        }
    }

    editPostHandler = () => {
        this.setState( { isEditing: !this.state.isEditing } );
    }

    deletePostHandler = () => {
        axios.delete('/merchants/' + this.props.match.params.id + '.json')
            .then(response => {
                // console.log(response);
                this.props.onMerchantRemoved(this.props.match.params.id);
                this.props.history.replace('/posts');
            });
    }

    savePostHandler = () => {
        this.setState( { isEditing: !this.state.isEditing } );
        this.setState( {
            loadedPost: delete this.state.loadedPost.id
        } );
        axios.put( '/merchants/' + this.props.match.params.id + '.json', this.state.loadedPost )
            .then( response => {
                // console.log('From New Post data', data );
                console.log('From New PUT response', response );
                // this.props.history.replace('/posts');
            } );
    }

    cancelPostHandler = () => {
        this.setState( { isEditing: !this.state.isEditing } );
    }

    handleChangeFirstname = (event) => {
        // console.log('event.target.value', event.target.value);
        const value = event.target.value
        this.setState( (state) => ({ loadedPost: { ...state.loadedPost, firstname: value }}));
    }

    handleChangeLastname = (event) => {
        // console.log('event.target.value', event.target.value);
        const value = event.target.value
        this.setState( (state) => ({ loadedPost: { ...state.loadedPost, lastname: value }}));
    }

    handleChangeEmail = (event) => {
        // console.log('event.target.value', event.target.value);
        const value = event.target.value
        this.setState( (state) => ({ loadedPost: { ...state.loadedPost, email: value }}));
    }

    handleChangePhone = (event) => {
        // console.log('event.target.value', event.target.value);
        const value = event.target.value
        this.setState( (state) => ({ loadedPost: { ...state.loadedPost, phone: value }}));
    }

    handleChangeHasPremium = (event) => {
        // console.log('event.target.value', event.target.value);
        const value = event.target.value
        this.setState( (state) => ({ loadedPost: { ...state.loadedPost, hasPremium: value }}));
    }

    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if ( this.props.match.params.id ) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if ( this.state.loadedPost ) {
            post = (
                <div className="FullPost">
                { !this.state.isEditing ? 
                    <div>
                        <h1>Merchant</h1>
                        <h1>{this.state.loadedPost.firstname} {this.state.loadedPost.lastname}</h1>
                        <div>
                            <label>Email - </label>
                            <p>{this.state.loadedPost.email}</p>
                        </div>
                        <div>
                            <label>Phone - </label>
                            <p>{this.state.loadedPost.phone}</p>
                        </div>
                        <div>
                            <label>Premium - </label>
                            <p>{this.state.loadedPost.hasPremium}</p>
                        </div>
                        <div className="Edit">
                            <button onClick={this.editPostHandler} className="Edit">Edit</button>
                            <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                        </div>
                    </div> :
                    <div>
                        <h1>Edit Merchant</h1>
                        <div>
                            <label>Firstname</label>
                            <input type="text" value={this.state.loadedPost.firstname} onChange={this.handleChangeFirstname} />
                        </div>
                        <div>
                            <label>Lastname</label>
                            <input rows="text" value={this.state.loadedPost.lastname} onChange={this.handleChangeLastname} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="text" value={this.state.loadedPost.email} onChange={this.handleChangeEmail} />
                        </div>
                        <div>
                            <label>Phone</label>
                            <input type="text" value={this.state.loadedPost.phone} onChange={this.handleChangePhone} />
                        </div>
                        <div>
                            <label>Premium</label>
                            <select value={this.state.loadedPost.hasPremium} onChange={this.handleChangeHasPremium} >
                                <option value="No">NO</option>
                                <option value="Yes">YES</option>
                            </select>
                        </div>
                        <div className="Edit">
                            <button onClick={this.savePostHandler} className="Edit">Save</button>
                            <button onClick={this.cancelPostHandler} className="Delete">Cancel</button>
                        </div>  
                    </div>
                    }
                </div>
            );
        }
        return post;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onMerchantRemoved: (id) => dispatch(removeMerchant(id))
    }
}

export default connect(null, mapDispatchToProps)(FullPost);