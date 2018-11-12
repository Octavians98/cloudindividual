import React, {Component} from 'react';
import {API} from 'aws-amplify';
import UserPannel from './UserPannel';
import PersonalUser from './PersonalUser'


let apiName = 'usersAPI';
let path = '/users/';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    async componentDidMount() {
        const response = await API.get(apiName,path + this.props.match.params.id);
        console.log("WTF IS HAPPENING", response);
        if(response !== {}){
            this.setState({user:response});
        }
    }

    render() {
        return(
            <div>
                {this.state.user === '{}' ?
                    <h3>The user you are looking for doesn't exist!</h3> :
                    <div>
                        {(this.state.user.username === this.props.user) ?
                            <PersonalUser user={this.state.user}/> :
                            <UserPannel user={this.state.user}/>
                        }</div>
                }
            </div>
        )
    }
}
export default User;