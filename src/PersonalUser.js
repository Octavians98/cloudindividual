import React, {Component} from 'react';
import {API, Auth} from 'aws-amplify';
import {Input, List, Button} from "semantic-ui-react";


let apiName = 'usersAPI';
let path = '/users/';

class PersonalUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            skills:[],
            newSkill:'',
            newPhone:'',
            newSurname:''
        }
    }

    componentDidMount(){
        this.setState({
            newPhone:this.props.user.phone
        });
        if(this.props.user.hasOwnProperty('skills')){
            this.setState({
                skills:this.props.skills
            });


        }
    }

    updatePhone = (event) => {
        if(event.target.value ==='')
        {
            this.setState({newPhone: this.props.user.phone});
        } else {

            this.setState({newPhone: event.target.value});
        }

    }

    updateSkills = (event) => {
        this.setState({newSkill:event.target.value});
    }

    addSkill = () => {
        if(this.state.newSkill === ''){
            alert('That is not a skill');
        } else if(this.state.skills.includes(this.state.newSkill)){
            alert('This skill is already added');
        } else {
            this.setState({
                skills:[...this.state.skills, this.state.newSkill]
            });
        }
    }

    checkPhone = () => {
        if(this.state.newPhone !== this.props.user.phone){
            return true;
        } else {
            return false;
        }
    }

    checkNewPhone = () => {
        if(/^[+]*[0-9]+$/.test(this.state.newPhone)){
            return true;
        } else {
            alert("Wrong phone number format");
            return false;
        }
    }

    checkSkills = () => {
        if(this.props.user.hasOwnProperty('skills')){
            if(this.props.skills.length < this.state.skills.length){
                return true;
            } else {return false;}

        } else if(this.state.skills.length > 0){
            return true;
        } else {
            return false;
        }
    }

    save = async () => {
        if(this.checkNewPhone()){
            const phone = this.checkPhone();
            const skills = this.checkSkills();
            if(phone || skills) {
                const apiCall = API.put(apiName,path,{
                    body : {
                        username: this.props.user.username,
                        name: this.props.user.name,
                        surname: this.props.user.surname,
                        email: this.props.user.email,
                        phone:this.state.newPhone,
                        skills: this.state.skills

                    }
                })
                console.log("Put request", apiCall);
                alert("Personal info updated!")
            }
        }
    }

    render()
    {

        const user = this.props.user;
        return(<div style={{padding:'15px'}} align="left">
            <h1>User Details</h1>

            <h2>Name: {user.name}</h2>
            <h2>Surname: {user.surname}</h2>
            <h2>Username: {user.username}</h2>
            <h2>Email: {user.email}</h2>
            <h2>Phone: <Input size='mini' placeholder={user.phone} onChange={this.updatePhone}/></h2>

            <h2>Skills: </h2>

            {(this.state.skills.length > 0) ?
                <div>
                    <List bulleted>
                        {this.state.skills.map(skill => (
                            <List.Item><h3>{skill}</h3></List.Item>
                        ))}
                    </List>
                </div> :

                <h3>No skills added yet</h3>
            }
            <Input
                placeholder='add skill...'
                onChange={this.updateSkills}
            />
            <Button onClick={this.addSkill}>Add Skill</Button>
            <Button onClick={this.save}>Save Changes</Button>
        </div>)



    }
} export default PersonalUser;