import React, { Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
// import withErrorHandler from '../../../hoc/withErrorHandler';
// import Modal from '../../../components/UI/Modal/Modal'
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        merchants: []
    }

    componentDidMount () {
        console.log( this.props );
        axios.get( '/merchants.json' )
            .then( response => {
                // console.log('!!!', response );
                let merchants = Object.values(response.data);
                for (let i = 0; i < merchants.length; i++) {
                    // console.log('response.data[i]', Object.keys(response.data)[i]);
                    merchants[i]['id'] = Object.keys(response.data)[i];
                }
                // console.log('posts', posts );
                const updatedMerchants = merchants.map( merchant => {
                    return {
                        ...merchant,
                        author: 'Max'
                    }
                } );
                this.setState( { merchants: updatedMerchants } );
                // console.log( response );
            } )
            .catch( error => {
                console.log( error );
                // this.setState({error: true});
            } );
    }

    postSelectedHandler = ( id ) => {
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push( '/posts/' + id );
    }

    render () {
        let merchants = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if ( !this.state.error ) {
            merchants = this.state.merchants.map( merchant => {
                return (
                    // <Link to={'/posts/' + post.id} key={post.id}>
                    <Post
                        firstname = {merchant.firstname}
                        lastname = {merchant.lastname}
                        email = {merchant.email}
                        phone = {merchant.phone}
                        clicked={() => this.postSelectedHandler( merchant.id )} />
                    // </Link>
                );
            } );
        }

        return (
            <div>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
                <section className="Posts">
                    {merchants}
                </section>
            </div>
        );
    }
}

export default Posts;