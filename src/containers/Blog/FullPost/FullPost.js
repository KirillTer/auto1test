import React, { Component } from 'react';
import axios from '../../../axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions'

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
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

    deletePostHandler = () => {
        axios.delete('/merchants/' + this.props.match.params.id + '.json')
            .then(response => {
                // console.log(response);
                this.props.onMerchantRemoved(this.props.match.params.id);
                this.props.history.replace('/posts');
            });
    }

    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if ( this.props.match.params.id ) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if ( this.state.loadedPost ) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.firstname} {this.state.loadedPost.lastname}</h1>
                    <label>Email</label>
                    <p>{this.state.loadedPost.email}</p>
                    <label>Phone</label>
                    <p>{this.state.loadedPost.phone}</p>
                    <label>Premium</label>
                    <p>{this.state.loadedPost.hasPremium}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onMerchantRemoved: (id) => dispatch({type: actionTypes.REMOVE_MERCHANT, payload: id})
    }
}

export default connect(null, mapDispatchToProps)(FullPost);