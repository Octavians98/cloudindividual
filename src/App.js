import React, { Component } from 'react';
import './App.css';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import {Route, Switch, Link} from 'react-router-dom'
import UsersView from './UsersView';
import User from './User';
import Home from './Home';
import ProjectsView from './ProjectsView'
import Project from './Project'
import { Menu } from 'semantic-ui-react'

Auth.configure(awsconfig);
Analytics.configure(awsconfig);
Amplify.configure(aws_exports);

let apiName = 'usersAPI';
let path = '/users/';
let projectAPI = 'projectsAPI';
let projectPath = '/projects/'

class App extends Component {
    constructor(props) {
    super(props);
   this.state = {
       user :{}
   };

  }

    async componentDidMount(){



        const loggedUser = await Auth.currentAuthenticatedUser();
        const userEntry = await API.get(apiName,path + loggedUser.username);

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

        }else
        {
            this.setState({
                user:userEntry
            });
        }


    }

    signOut = () => {
        Auth.signOut().then(() => {
            this.props.onStateChange('SignedOut');
        });
    }

  render() {


        const Users = () => (
            <Switch>
                <Route exact path='/users' component={UsersView}/>
                <Route path='/users/:username' render={(props) => <User {...props} user={this.state.username}/>}/>
            </Switch>
        )

      const Projects = () => (
          <Switch>
              <Route exact path='/projects' component={ProjectsView}/>
              <Route path='/projects/:username' render={(props) => <Project {...props} user={this.state.username}/>}/>
          </Switch>
      )



    return (
      <div className="App">
          <Menu size='massive'inverted>
              <Menu.Item content="Home"><Link to ="/">Home</Link></Menu.Item>
              <Menu.Item content="Projects"><Link to ="/projects">Projects</Link></Menu.Item>
              <Menu.Item content='Users'><Link to ="/users">Users</Link></Menu.Item>
              <Menu.Item position='right' onClick={this.signOut}>Sign Out</Menu.Item>

          </Menu>
          {/*<NewProject></NewProject>*/}
          <Switch>
              <Route exact path ='/' component = {Home}/>
              <Route path = "/users" component = {Users}></Route>
              <Route path = "/projects" component = {Projects}></Route>
          </Switch>
      </div>
    );
  }
}

export default withAuthenticator(App);
