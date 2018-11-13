import React, {Component} from 'react';
import {API} from 'aws-amplify';
import {Link} from "react-router-dom";
import {Divider, List, Input, Button, Form, TextArea, Label} from "semantic-ui-react";
import Auth from '@aws-amplify/auth';

let userAPI = 'usersAPI';
let path = '/users/'
let projectAPI = 'projectsAPI';
let projectPath = '/projects/'

class NewProject extends Component {


    constructor(props){
        super(props);
        this.state = {

            projectName:'',
            manager: '',
            managerName:'',
            managerSurname:'',
            contributors:[],
            status:'',
            description:'',
            managerEmail:'',
            developer:''

        }


    }



    async componentDidMount(){
        const user = await Auth.currentAuthenticatedUser();
        this.setState({manager:user.username,
        managerName:user.name,
        managerEmail:user.email,
        status:'commencing'})
    }


    setName = (event) => {
        if(event.target.value ===''){
            alert('Project name can\'t be empty')
        } else {
            this.setState({projectName:event.target.value})
        }
    }

    setDescription = (event) => {
        if(event.target.value ===''){
            alert('Description can\'t be empty')
        } else {
            this.setState({description:event.target.value})
        }
    }

    addContributor = (event) => {
        this.setState({developer:event.target.value});
    }
    checkContributor = async () => {
        if(this.state.developer===''){
            alert('Developer username can\'t be empty')
        }else if(this.state.contributors.includes(this.state.developer)){
            alert('This developer is already working at this project')
        } else {
            const user = await API.get(userAPI,path+this.state.developer)

            if(user.hasOwnProperty('username')){
                this.setState({
                    contributors: [...this.state.contributors, this.state.developer]
                })
            } else {
                alert('This developer is not registered')
            }

        }
    }




    save = async () => {
        const project = await API.get(projectAPI,projectPath+this.state.projectName)

        if(project.hasOwnProperty("name")){
              alert("Project name already in use");
                console.log(project)}

        else if(this.state.projectName ==='' || this.state.description === ''){
            alert("Please complete all necessary fields before saving")
        }else {


            const apiCall = await API.post(projectAPI, projectPath, {
                body:
                    {

                    name:this.state.projectName,
                    managerID: this.state.manager,
                    status:this.state.status,
                    description:this.state.description,
                    email:this.state.managerEmail

                }
            } )

            alert('Project saved!')
        }
    }

    render(){
        return(
            <div>
                <h1>Project Details</h1>

                <div style={{ align:'centre'}}>
                    <h2>Project name*: <Input size='mini' placeholder='Enter description' onChange={this.setName}/>
                    </h2>
                </div>


                <div style={{align:'centre'}}>
                    <h2>Project description*:
                    <Form size='massive' style={{align:'centre'}}>
                        <TextArea autoHeight placeholder='Tell us more'  onChange={this.setDescription}/>
                    </Form>
                </h2>

                   </div>
                <br></br>
                <div style={{align:'centre'}}>
                    <h2>Add contributors: </h2>
                        <Input size='big' placeholder='Developer username' onChange={this.addContributor}/>


                    <List>{this.state.contributors.map(contributor => (
                        <List.Item>
                            <Label size='massive'>{contributor}</Label>

                            </List.Item>
                    ))}</List>
                    <br></br>
                </div>
                <div style={{align:'centre'}}>
                    <Button onClick={this.checkContributor} size='big'>Add developer</Button>
                    <Button onClick={this.save} size='big'>Save</Button>
                </div>




            </div>
        )
    }
} export default NewProject;
