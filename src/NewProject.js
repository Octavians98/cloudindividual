import React, {Component} from 'react';
import {API} from 'aws-amplify';
import {Link} from "react-router-dom";
import {Divider, List, Input, Button, Form, TextArea} from "semantic-ui-react";
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
            developer:''

        }


    }



    componentDidMount(){
        const user = Auth.currentAuthenticatedUser();
        this.setState({manager:user.username,
        managerName:user.name,
        manageSurname:user.surname,
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
        if(this.state.projectName ==='' || this.state.description === ''){
            alert("Please complete all necessary fields before saving")
        }else {
            const apiCall = API.post(projectAPI, projectPath, {
                body:{
                    name:this.state.name,
                    contributors: this.state.contributors,
                    managerID: this.state.manager,
                    managerName: this.state.managerName,
                    managerSurname: this.state.managerSurname,
                    status:this.state.status,
                    description:this.state.description
                }
            } )
            alert('Project saved!')
        }
    }

    render(){
        return(
            <div style={{padding: '15px'}} align="left">
                <h1>Project Details</h1>
                <h2>Project name*: <Input size='tiny' placeholder='Enter description' onChange={this.setName}/></h2>
                <h2>Project description*:
                    <Form>
                    <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} onChange={this.setDescription}/>
                </Form></h2>
                <h2>Add contributors <Input size='tiny' placeholder='Developer username' onChange={this.addContributor}/>
                </h2>
                <Button onClick={this.checkContributor}>Add developer</Button>


            </div>
        )
    }
} export default NewProject;
