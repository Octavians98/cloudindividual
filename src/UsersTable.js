import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';


class UsersTable extends Component{


    constructor(props) {
        super(props)
        this.state = {
            username: {},
            email: {}

        }
    }


    checkUser() {

        API.get("usersAPI",'/users').then(response => {
                console.log(response);
                this.setState({
                    username: response.username,
                    email: response.email
                })
            }
        )
    }

}

