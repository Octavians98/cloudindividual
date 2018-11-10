import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
// import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { API } from 'aws-amplify';


import awsconfig from './aws-exports';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);
Amplify.configure(aws_exports);

let apiName = 'usersAPI';
let path = '/users/';

class App extends Component {
    constructor(props) {
    super(props);
   this.state = {
       username:{},
       email: {}
   }

  }





    async componentDidMount(){

        // const  newUser = Auth.currentAuthenticatedUser().then(response =>{
        //     console.log("Cancer",JSON.stringify(response))
        //     this.setState({
        //         username: response.username,
        //         email: response.email
        //     })
        // }).catch(error =>{
        //     console.log(error.response)
        // });
        // console.log("Username",this.state.username)
        // console.log("Email",this.state.email)

        const loggedUser = await Auth.currentAuthenticatedUser();
        console.log("Hello there",loggedUser);
        const userEntry = await API.get(apiName,path + loggedUser.username);
        console.log("This user",JSON.stringify(userEntry));




      let newItem = {
          body: {
              username: "jesus",
              text: "Samba crucea"


          }
     }

     API.post(apiName, path, newItem).then(response => {
         console.log(response);
     }).catch(error => {
         console.log(error.response)
     });
    }

    testThisShit = async () => {
        const response = await API.get(apiName, path );
        console.log(response);

    }





  render() {
    return (
      <div className="App">
          <button onClick={this.testThisShit}> Muie</button>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

      </div>
    );
  }
}


export default withAuthenticator(App, true);
