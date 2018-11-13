import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import NewProject from './NewProject'

class Home extends Component {
    state = {}



    render() {
        const { activeItem } = this.state

        return (
            <NewProject></NewProject>
        )
    }
}export default Home
