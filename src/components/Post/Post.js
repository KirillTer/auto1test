import React from 'react';

import './Post.css';

const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1>{props.firstname} {props.lastname}</h1>
        <div className="Info">
            <div>{props.email}</div>
            <div>{props.phone}</div>
        </div>
    </article>
);

export default post;