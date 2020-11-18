import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import $ from 'jquery'
import PropTypes from 'prop-types'

function RoomDetails({ auth, currentRoom, editRoom, errors, editedRoom, deleteRoom, fetchRooms, handleDelete }) {
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

    const handleDeleteRoom = async () => {
        await deleteRoom(roomID, auth.user)
        $('.modal').modal('hide')
        await fetchRooms(auth.user)
        handleDelete()
    }

    return (
        <>
        <svg width="1em" height="1em" viewBox="0 0 16 16" data-toggle="modal" data-target="#deleteRoom"
                    className="bi bi-trash-fill" fill="currentColor" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg>
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
        <div className="modal fade" id="deleteRoom" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Room</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Do you want to delete this room?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleDeleteRoom}>Delete</button>
                        </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

function mapStateToProps( { auth, errors, room: {editedRoom} } ) {
    return {
        auth,
        errors,
        editedRoom
    }
}

RoomDetails.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    editedRoom: PropTypes.object,
    currentRoom: PropTypes.object.isRequired,
    fetchRooms: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    deleteRoom: PropTypes.func.isRequired,
    editRoom: PropTypes.func.isRequired
}

export default connect(mapStateToProps, actions) (RoomDetails)
