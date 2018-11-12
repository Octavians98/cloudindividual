import React, {Component} from 'react';
import {API} from 'aws-amplify';
import ProjectPannel from './ProjectPannel';


let apiName = 'projectsAPI';
let path = '/projects/';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {}
        };
    }

    async componentDidMount() {
        const response = await API.get(apiName,path + this.props.match.params.name);
        console.log("WTF IS HAPPENING IN THE PROJECTS", response);
        if(response !== {}){
            this.setState({project:response});
        }
    }

    render() {
        return(
            <div>

                <ProjectPannel project={this.state.project}/>
            </div>
        )
    }
}
export default Project;