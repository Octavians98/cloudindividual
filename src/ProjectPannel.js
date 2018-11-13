import React, {Component} from 'react';
import {Label, Button} from 'semantic-ui-react'



class ProjectPannel extends Component {
    constructor(props){
        super(props);
        this.state = {
            contributors:this.props.contributors,
        }

    }

    requestJoin = () => {
        alert("Request sent")
    }


    render() {
        const project = this.props.project;
        return(
            <div style={{align:'centre'}}>

                <h1>Project Details</h1>
                <div style={{align:'centre'}}>
                    <Label size='massive'>
                        Project name: {project.name}
                    </Label>

                </div>
                <br></br>
                <div style={{align:'centre'}}>
                    <Label size='massive'>
                        Manager name: {project.managerName}
                    </Label>
                </div>
                <br></br>
                <div style={{align:'centre'}}>
                    <Label size='massive'>
                        Manager surname: {project.managerSurname}
                    </Label >
                </div>
                <br></br>
                <div style={{align:'centre'}}>

                    <Label size='massive'>
                        Manager username: {project.managerID}
                    </Label>
                </div>
                <br></br>
                <div style={{align:'centre'}}>
                    <Label size='massive'>
                        Contributors: {project.contributors}
                    </Label>
                </div>
                <br></br>
                <div style={{align:'centre'}}>
                    <Label size='massive'>
                        Status: {project.status}
                    </Label>
                </div>
                <br></br>
                <Button onClick={this.requestJoin} size='massive'>Join Project</Button>










            </div>
        )
    }


}
export default ProjectPannel;