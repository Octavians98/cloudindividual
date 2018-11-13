import React, {Component} from 'react';
import {API} from 'aws-amplify';
import ProjectPannel from './ProjectPannel';
import PersonalProject  from  './PersonalProject';
import Auth from '@aws-amplify/auth';


let apiName = 'projectsAPI';
let path = '/projects/';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {},

        };
    }

    async componentDidMount() {
        const manager = await Auth.currentAuthenticatedUser();

        this.setState({projectManager:manager.username})


        const response = await API.get(apiName,path + this.props.match.params.username);
               if(response !== {}){
            this.setState({project:response
            });
        }

    }

    render() {

        return(

            <div>
                {this.state.project === '{}' ?

                    <h1>No such project</h1>:

                    <div>
                        {this.state.project.managerID === this.state.projectManager ?

                            <PersonalProject project={this.state.project}/> :

                            <ProjectPannel project={this.state.project} user={this.props.user}/>
                        }
                    </div>
                }
            </div>
        )
    }
}
export default Project;