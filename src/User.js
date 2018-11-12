import React, {Component} from 'react';
import {API} from 'aws-amplify';
import UserPannel from './UserPannel';
import PersonalUser from './PersonalUser'
import Auth from '@aws-amplify/auth';


let apiName = 'usersAPI';
let path = '/users/';


class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
            },
        };
    }

    async componentDidMount() {

        const loggedUser = await Auth.currentAuthenticatedUser();
        this.setState({logged:loggedUser.username})
        console.log("Logged", loggedUser)

        const response = await API.get(apiName,path + this.props.match.params.username);
        console.log("WTF IS HAPPENING", response);
        if(response !== {}){
            this.setState({user:response});
        }
    }


    getUsername = async () => {
        const loggedUser = await Auth.currentAuthenticatedUser();
        const userName = loggedUser.username;
        return userName;
    }

    render() {
        console.log("this.state.user.username", this.state.user.username);
        console.log("this.props.user", this.state.logged);
        return(


                    <div>
                        {(this.state.user.username === this.state.logged) ?
                            <PersonalUser user={this.state.user}/> :
                            <UserPannel user={this.state.user}/>
                        }</div>

        )
    }
}
export default User;