import React, { Component } from 'react';
import { API } from 'aws-amplify';
import {Link} from "react-router-dom";
import {Container,Input,Table, Button} from "semantic-ui-react";


let apiName = 'usersAPI';
let path = '/users/';


class UsersView extends Component {

    constructor(props) {
        super(props);
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

                    <Table celled inverted>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Surname</Table.HeaderCell>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {this.state.sortedList.map(user =>(
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell><Link to={'/users/'+user.username}>{user.name}</Link></Table.Cell>
                                <Table.Cell>{user.surname}</Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>

                            </Table.Row>
                        </Table.Body>

                                ))}
                        </Table>

                </Container>


            </div>
        )
    }


}

export default UsersView;
