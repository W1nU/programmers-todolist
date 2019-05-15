import React from 'react';
import {Alert} from 'react-bootstrap';

const Alerts = (props) => {
    return (
        <Alert show={props.show} dismissible onClose={props.close} variant="danger">
            {props.error}
        </Alert>
    )
}

export default Alerts;