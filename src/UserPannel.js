import React, {Component} from 'react';



class UserPannel extends Component {


    render() {
        const user = this.props.user;
        console.log("Why is this undefined",user.username)
        return(
            <div>
                <h1>User Details</h1>
                <h2>Username: {user.username}</h2>
                <h2>Name: {user.name}</h2>
                <h2>Surname: {user.surname}</h2>
                <h2>Email: {user.email}</h2>
                <h2>Phone number: {user.phone}</h2>
                <h2>Skills: </h2>

            </div>
        )
    }


}
export default UserPannel;