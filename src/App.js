import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import {Route, Switch, Link} from 'react-router-dom'
import UsersView from './UsersView';
// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);
Amplify.configure(aws_exports);

let apiName = 'usersAPI';
let path = '/users/';
let projectAPI = 'projectsAPI';
let projectPath = '/projects'
let myInit = {
    body: {
            name: 'test2',
            manager:'mario,the terrorist',
            description: 'testing if the API works with external body',
            contributors: ['a','b','c'],
            status: 'finished'

    }
}

class App extends Component {
    constructor(props) {
    super(props);
   this.state = {
       user :{}
   };

  }

    async componentDidMount(){

        const loggedUser = await Auth.currentAuthenticatedUser();
        console.log("Hello there",loggedUser);
        const userEntry = await API.get(apiName,path + loggedUser.username);
        console.log("This user",JSON.stringify(userEntry));

        const projectPost =API.post(projectAPI,projectPath,myInit);
        console.log("Project post", JSON.stringify(projectPost));

        if (!userEntry.hasOwnProperty('username')){
            while(!this.state.user.hasOwnProperty('username')){
                const name = prompt('Please provide your name and surname on your first login');
                const surname = prompt('Surname');
                if(name !== null){
                    this.setState({
                        user: {
                            username: loggedUser.username,
                            email: loggedUser.attributes.email,
                            phone: loggedUser.attributes.phone_number,
                            name: name,
                            surname: surname
                        }
                    });
                }
            }
            const post = await API.post(apiName,path,{
                body:this.state.user
            });


            console.log("User updated",JSON.stringify(post));

        }else
        {
            this.setState({
                user:userEntry
            });
        }

        console.log("Current user" + JSON.stringify(this.state.user));
    }

    testThisGet = async () => {
        const response = await API.get(projectAPI,projectPath);
        console.log(response);

    }

  render() {
        const Users = () => (
            <Switch>
                <Route exact path = '/users' component = {UsersView}/>
            </Switch>
        )
    return (
      <div className="App">
          <button onClick={this.testThisGet}>Press me</button>
      <UsersView>

      </UsersView>

      </div>
    );
  }
}

export default withAuthenticator(App, true);
