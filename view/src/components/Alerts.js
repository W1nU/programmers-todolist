import React from 'react';
import {Alert} from 'react-bootstrap';

const Alerts = (props) => {
    return (
        <Alert show={props.show} dismissible variant="danger">
            <Alert.Heading>{props.alertTitle}</Alert.Heading>
        </Alert>
    )
}

export default Alerts;