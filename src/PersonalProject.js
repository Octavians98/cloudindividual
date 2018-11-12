import React, {Component} from 'react';
import {API} from 'aws-amplify';
import {Link} from "react-router-dom";
import {Divider, List, Input, Button} from "semantic-ui-react";

let userAPI = 'usersAPI';
let path = '/users/'
let projectAPI = 'projectsAPI';
let projectPath = '/projects/';


class PersonalProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStatus:'',
            contributors:[],
            newContributor:''
        };
    }

    componentDidMount(){
        if(this.props.project.hasOwnProperty('contributors'))
            this.setState({contributors: this.props.project.contributors});
        this.setState({newStatus: this.props.project.status});
    }

    updateStatus = (event) => {
        if(event.target.value ==='')
            this.setState({newStatus: this.props.project.status});
        else
            this.setState({newStatus: event.target.value});
    }

    updateContributor = (event) => {
        this.setState({newContributor: event.target.value});
    }

    addContributor = async () => {
        if(this.state.newContributor === ''){
            alert('The input field is empty')
        } else if (this.state.contributors.includes(this.state.newContributor)){

            alert('This contributor is already added')
        } else {
            const user = await API.get(userAPI, path + this.state.newContributor);

            if(user.hasOwnProperty('username')){
                this.setState({
                    contributors: [...this.state.contributors, this.state.newContributor]
                })

            }
            else {
                alert('This developer is not registered')
            }
        }


    }

    checkStatus = () => {
       if(this.state.newStatus !== this.props.project.status){
           return true;
       }
       else return false;
    }

    save = async () => {
        if(this.checkStatus()){
            const apiCall = API.put(projectAPI,projectPath,{
                body: {
                    name: this.props.project.name,
                    contributors:this.state.contributors,
                    description: this.props.description,
                    managerID: this.props.project.managerID,
                    managerName: this.props.project.managerName,
                    managerSurname: this.props.project.managerID,
                    status:this.state.newStatus

                }
            })
            alert("Saved changes")
        }

}

        render(){
            const contributors = this.state.contributors;
            const project = this.props.project;

            return (
                <div style={{padding:'15px'}} align="left">
                    <h1>Project Details</h1>
                    <Divider/>
                    <h2>Title: {project.name}</h2>
                    <h2>Manager name: <Link to={'/users/' + project.managerID}>{project.managerName} {project.managerSurname}</Link></h2>
                    <h2>Manager username: <Link to={'/users/' + project.managerID}>{project.managerID}</Link></h2>
                    <h2>Status: <Input size='mini' placeholder={project.status} onChange={this.updateStatus}/></h2>
                    <h2>Contributors: </h2>
                    <Divider/>
                    {(contributors.length > 0) ?
                        <div>
                            <List bulleted>
                                {contributors.map(contributor => (
                                    <List.Item><h3><Link to={'/users/' + contributor}>{contributor}</Link></h3></List.Item>
                                ))}
                            </List>
                        </div> :

                        <h3>No devs yet!</h3>
                    }
                    <Input
                        placeholder='Add by username...'
                        onChange={this.updateContributor}
                    />
                    <Button onClick={this.addContributor}>Add Developer</Button>
                    <Divider/>
                    <Button onClick={this.save}>Save Changes</Button>
                </div>
            )

        }
}

export default PersonalProject;