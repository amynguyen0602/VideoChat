import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from '../layout/NavBar';
import RoomForm from './RoomForm';
import VideoRoom from './VideoRoom'
import * as actions from '../../actions'

export class RoomChat extends Component {
    state = {
        token: '',
        roomName: ''
    }
    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/signin');
        }
    }

    handleLogout = () => {
        this.setState({ token: '', roomName: '' })
    }

    handleJoinRoom = async (room, identity) => {
        await this.props.joinRoom(room, identity)
        this.setState({ token: this.props.token, roomName: room.roomID })
    }
    render() {
        return (
            <div>
                <NavBar />
                {!this.state.token && <RoomForm handleJoinRoom = { this.handleJoinRoom } />}
                {this.state.token && <VideoRoom roomName = {this.state.roomName} handleLogout = {this.handleLogout} />}
            </div>
        )
    }
}

function mapStateToProps( { auth, room } ) {
    return {
        token: room.token,
        auth
    }
}

export default connect(mapStateToProps, actions) (RoomChat)
