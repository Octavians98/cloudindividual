import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import {Link} from "react-router-dom";
import {Container, Card,Input} from "semantic-ui-react";
import { Button } from 'semantic-ui-react'

let apiName = 'projectsAPI';
let path = '/projects'

class ProjectsView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectList: [],
            sortedList: [],
            filter: ''
        };
    }
    async componentDidMount(){

        const response = await API.get(apiName,path);

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

                // console.log("Project",project.name);
                console.log("Contributors",project.contributors)
                // console.log("Desciption",project.description);
                // console.log("Status",project.status);
                // console.log("Manager name",project.managerName);
                // console.log("Manager surname",project.managerSurname);
                // console.log("Manager ID",project.managerID);




                return project.name.includes(event.target.value)||
                    project.contributors.includes(event.target.value) ||
                    project.description.includes(event.target.value) ||
                    project.status.includes(event.target.value) ||
                    project.managerName.includes(event.target.value) ||
                    project.managerSurname.includes(event.target.value) ||
                    project.managerID.includes(event.target.value);
            })
        });

    }

    joinProject = () => {
        if(this.state.pro)
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
                <h2>Users</h2>

                <Container>
                    <Card.Group>
                        {this.state.sortedList.map(project => (
                            <Card key={project.name}>
                                <Card.Content textAlign = 'left'>
                                    <Card.Header><Link to={'/projects/'+project.username}>{project.name}</Link></Card.Header>
                                    <Card.Meta>{project.contributors}</Card.Meta>
                                    <Card.Meta>{project.description}</Card.Meta>
                                    <Card.Meta>{project.status}</Card.Meta>
                                    <Card.Meta>{project.managerName}</Card.Meta>
                                    <Card.Meta>{project.managerSurname}</Card.Meta>
                                    <Card.Meta>{project.managerID}</Card.Meta>


                                </Card.Content>
                                <Button>Click Here</Button>
                            </Card>
                        ))}
                    </Card.Group>
                </Container>


            </div>
        )
    }


} export default ProjectsView;