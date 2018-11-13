import React, {Component} from 'react';
import { Item, List } from 'semantic-ui-react'


class UserPannel extends Component {


    render() {
        var style = {

            fontSize: 30,

        };
        const user = this.props.user;

        return(

    <div>
        <h1>User details</h1>
            <div style={style} align="left">
            <Item>
                <Item.Content>
                    <Item.Description>
                        <p>Username: {user.username}</p>
                        <p>Name: {user.name}</p>
                        <p>Surname: {user.surname}</p>
                        <p>Email:{user.email}</p>
                        <p>Phone number:{user.phone}</p>
                        <p>Skills:</p>
                            {(user.hasOwnProperty('skills') && Array.isArray(user.skills) && user.skills.length >0)?
                                <div>
                                    <List>
                                        {user.skills.map(skill => (
                                            <List.Item><p>{skill}</p></List.Item>
                                        ))}
                                    </List>
                                </div> :
                                <p>No skills added</p>

                            }
                    </Item.Description>
                </Item.Content>
            </Item>
        </div>
    </div>

        )
    }


}
export default UserPannel;