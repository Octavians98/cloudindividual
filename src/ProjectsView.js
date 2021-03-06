import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import {Link} from "react-router-dom";
import Auth from '@aws-amplify/auth';
import {Container, Table,Input} from "semantic-ui-react";
import { Button } from 'semantic-ui-react'

let apiName = 'projectsAPI';
let path = '/projects'


class ProjectsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectList: [],
            sortedList: [],
            filter: ''
        };
    }
    async componentDidMount(){


        const response = await API.get(apiName,path);
        console.log("Ce plm se intampla", response)

        if(response !=={}){
            this.setState(
                {
                    projectList:response,
                    sortedList: response
                });
        }
    }
    sortProjects = (event) => {
        this.setState({
            filter:event.target.value

        });
        this.setState({
            sortedList: this.state.projectList.filter(project => {

                console.log("Project",project.name);
                console.log("Contributors weeeeeeeeew",project.contributors)
                




                return project.name.includes(event.target.value)||
                    project.description.includes(event.target.value) ||
                    project.status.includes(event.target.value) ||
                    project.managerID.includes(event.target.value);
            })
        });

    }

    render(){
        return (
            <div>
                <Input
                    style = {{width:'50%'}}
                    icon='search'
                    placeholder = "Filter by project name,status,manager..."
                    onChange={this.sortProjects}
                />
                <h2>Projects</h2>

                <Container>
                    <Table celled inverted>

                        <Table.Header>
                            <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Manager name</Table.HeaderCell>
                            <Table.HeaderCell>Manager surname</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        {this.state.sortedList.map(project =>(
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell><Link to={'/projects/'+project.name}>{project.name}</Link></Table.Cell>
                                    <Table.Cell>{project.status}</Table.Cell>
                                    <Table.Cell>{project.managerName}</Table.Cell>
                                    <Table.Cell>{project.managerSurname}</Table.Cell>


                                </Table.Row>
                            </Table.Body>
                        ))}

                    </Table>
                </Container>


            </div>
        )
    }


} export default ProjectsView;
