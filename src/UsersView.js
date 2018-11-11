import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import {Link} from "react-router-dom";
import {Container, Card,Input} from "semantic-ui-react";


let apiName = 'usersAPI';
let path = '/users/';


class UsersView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            sortedList: [],
            filter: ''

        };

    }

    async componentDidMount(){

        const response = await API.get(apiName,path);

            if(response !=={}){
                this.setState(
                    {
                        userList:response,
                        sortedList: response
                });
            }
    }

    sortUsers = (event) => {
        this.setState({
                filter:event.target.value

        });
        this.setState({
                sortedList: this.state.userList.filter(user => {

                    // console.log("Username",user.username);
                    // console.log("Name",user.name);
                    // console.log("Surname",user.surname);
                    // console.log("Email",user.email);



                    return user.username.includes(event.target.value)||
                        user.name.includes(event.target.value) ||
                        user.surname.includes(event.target.value) ||
                        user.email.includes(event.target.value);
                })
        });

    }
    render(){
        return (
            <div>
                <Input
                style = {{width:'50%'}}
                icon='search'
                placeholder = "Filter by username, name..."
                onChange={this.sortUsers}
                />
                <h2>Users</h2>

                <Container>
                    <Card.Group>
                        {this.state.sortedList.map(user => (
                            <Card key={user.username}>
                                <Card.Content textAlign = 'left'>
                                    <Card.Header><Link to={'/users/'+user.username}>{user.name} {user.surname}</Link></Card.Header>
                                    <Card.Meta>{user.username}</Card.Meta>
                                    <Card.Description>{user.email}</Card.Description>
                                </Card.Content>

                            </Card>
                        ))}
                    </Card.Group>
                </Container>


            </div>
        )
    }


}

export default UsersView;
