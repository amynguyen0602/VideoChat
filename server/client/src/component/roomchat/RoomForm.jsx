import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import isEmpty from '../../validation/isEmpty'

function RoomForm({ createRoom, handleJoinRoom, errors, auth, token }) {
    const [createNewRoom, setCreateNewRoom] = useState(false)
    const [roomID, setRoomID] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})

    const handleCheck = () => {
        setError({})
        setCreateNewRoom(!createNewRoom)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const room = {roomID, password}
        if(createNewRoom) {
            await createRoom(auth.user, room)
            if(isEmpty(errors)) { 
                setCreateNewRoom(false)
            }
        } else {
            const identity = auth.user.email + ',' + auth.user.firstname + ' ' + auth.user.lastname
            await handleJoinRoom(room, identity)
        }
    }

    const firstUpdate = useRef(true);

    useEffect(() => {
        if(firstUpdate.current)
            {firstUpdate.current = false;
        } else {
            if(errors) setError(errors)
        }
    }, [errors])

    return (
        <div className="home-body">
            <div className="custom-control custom-switch">
                <input name = "create_new_room_flag" type="checkbox" value={createNewRoom} checked = {createNewRoom} onChange={ handleCheck } className="custom-control-input" id="create_new_room_flag"/>
                <label className="custom-control-label" htmlFor="create_new_room_flag">Create new room</label>
            </div>
            <form onSubmit={ handleSubmit }>
                <div><div className="form-row">
                <div className="col"><input type="text" 
                        name="roomID" 
                        id="roomID" 
                        className="form-control" 
                        placeholder="Room ID" 
                        onChange={ e => {setRoomID(e.target.value)
                            setError({})} } />
                {error.roomID && (<div className="error text-danger">{error.roomID}</div>)}
                </div>
                <div className="col"><input type="password" 
                        name="password" 
                        id="password" 
                        className="form-control" 
                        placeholder="Password"
                        onChange={ e => {setPassword(e.target.value)
                            setError({})} }/>
                        {error.password_room && (<div className="error text-danger">{error.password_room}</div>)}
                    </div>
                </div>
                <br/>
                {createNewRoom ? <button type="submit" className="btn btn-primary">Create Room</button>
                : <button type="submit" className="btn btn-primary">Join Room</button>}</div>
            </form>
        </div>
    )
}

function mapStateToProps( { auth, errors, room } ) {
    return {
        errors,
        auth,
        token: room.token
    }
}

export default connect(mapStateToProps, actions) (RoomForm)
