import React, {Component} from 'react';



class ProjectPannel extends Component {


    render() {
        const project = this.props.project;
        // console.log("Why is this undefined project",project.name)
        return(
            <div>
                <h1>Project Details</h1>
                <h2>Project name: {project.name}</h2>
                <h2>Manager name: {project.managerName}</h2>
                <h2>Manager surname: {project.managerSurname}</h2>
                <h2>Manager username: {project.managerID}</h2>
                <h2>Contributors: {project.contributors}</h2>
                <h2>Status: {project.status}</h2>

                <h1>O sa fac cancer foarte curand</h1>

            </div>
        )
    }


}
export default ProjectPannel;