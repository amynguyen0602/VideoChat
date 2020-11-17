import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

function RoomDetails({ currentRoom, editRoom, errors, editedRoom }) {
    const [roomID, setRoomID] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(()=> {
        if(currentRoom) {
            setRoomID(currentRoom.roomID)
        }
    }, [currentRoom])

    const firstUpdate = useRef(true);
    const secondUpdate = useRef(true);

    useEffect(() => {
        if(firstUpdate.current)
            {firstUpdate.current = false
        } else {
            if(errors) setError(errors)
        }
    }, [errors])

    useEffect(() => {
        if(secondUpdate.current)
            {secondUpdate.current = false
        } else {
            if(editedRoom) {
                setSuccessMessage('Password has been changed')
                setPassword('')
            }
        }
    }, [editedRoom])

    const handleSubmit = (e) => {
        e.preventDefault()
        const room = {roomID, password}
        editRoom(room)
    }
    return (
        <div className="room-details">
            <form onSubmit={ handleSubmit }>
                <div>
                <div className="form-group room-edit-input"><input type="text" 
                        name="roomID" 
                        id="roomID" 
                        className="form-control roomid-input" 
                        placeholder="Room ID" value={roomID} readOnly disabled/>
                </div>
                <div className="form-group room-edit-input"><input type="password" 
                        name="password" 
                        id="password" 
                        className="form-control " 
                        placeholder="Password"
                        onChange={ e => {setPassword(e.target.value)
                            setError({})
                            setSuccessMessage('')} } value = {password}/>
                        {error.edit_password && (<div className="error text-danger">{error.edit_password}</div>)}
                        {!error.edit_password && successMessage !== '' && (<div className="valid">{successMessage}</div>)}
                    </div>
                </div>
                <div className="form-group"><button type="submit" className="btn btn-primary edit-room">Edit Room</button></div>
            </form>
        </div>
    )
}

function mapStateToProps( { errors, room: {editedRoom} } ) {
    return {
        errors,
        editedRoom
    }
}

export default connect(mapStateToProps, actions) (RoomDetails)
