import React, {Component} from 'react';
import {API, Auth} from 'aws-amplify';
import {Input, List, Button, Label} from "semantic-ui-react";


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
                skills:this.props.user.skills,
            });


        }
        console.log("Skiluri",this.props.user.skills)
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
            if(this.props.user.skills.length < this.state.skills.length){
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
            if(phone || skills ) {
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
        var style = {

            fontSize: 30,

        };

        const user = this.props.user;
        return(
            <div style={{align:'left'}}>
                <h1 style={{fontSize:80}}>User Details</h1>

                <div style={style} >
                    <h2>Name: <Label size='massive'>{user.name}</Label></h2>
                </div>
                <br></br>
                <div style={style} >
                    <h2>Surname: <Label size='massive'>{user.surname}</Label></h2>
                </div>
                <br></br>
                <div style={style} >
                    <h2>Username: <Label size='massive'>{user.username}</Label></h2>
                </div>
                <br></br>
                <div style={style} >
                    <h2>Email: <Label size='massive'>{user.email}</Label></h2>
                </div>
                <br></br>
                <div style={style} >
                    <h2>Phone: <Input size='tiny' placeholder='update phone...' onChange={this.updatePhone}></Input></h2>
                </div>
                <br></br>
                <div style={style} >
                    <h2 style={{fontSize:50}}>Skills:</h2>
                    {(this.state.skills !== undefined && this.state.skills.length >0) ?
                        <div>
                            <List >
                                {this.state.skills.map(skill => (
                                    <List.Item><Label size='massive'>{skill}</Label></List.Item>
                                ))}
                            </List>
                        </div> :

                        <p>No skills added yet</p>
                    }

                </div>
                <div style={{display: 'inline-block'}} >
                    <Input size='big'
                           style = {{border:'10px'}}
                           placeholder='add skill...'
                           onChange={this.updateSkills}
                    />
                    <Button onClick={this.addSkill} size='big'> Add Skill</Button>

                </div>

                <div style={style}>
                    <br></br>
                    <Button size='huge' onClick={this.save}>Save Changes</Button>
                </div>

        </div>

        )



    }
} export default PersonalUser;