import React, {Component} from 'react';
import {API} from 'aws-amplify';
import UserPannel from './UserPannel';


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
        const response = await API.get(apiName,path + this.props.match.params.username);
        console.log("WTF IS HAPPENING", response);
        if(response !== {}){
            this.setState({user:response});
        }
    }

    render() {
        return(
            <div>

                <UserPannel user={this.state.user}/>
            </div>
        )
    }
}
export default User;