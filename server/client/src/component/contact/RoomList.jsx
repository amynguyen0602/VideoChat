import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

function RoomList({ auth, rooms, fetchRooms, handleClickRoom }) {
    const [roomList, setRoomList] = useState([])
    useEffect(() => {
        if(auth.isAuthenticated) {
            fetchRooms(auth.user)
        }
    }, [auth, fetchRooms])

    useEffect(() => {
        if(rooms) {
            setRoomList(rooms)
        }
    }, [rooms])

    const renderListItem = () => {
        if(roomList) {
            return roomList.map((eachRoom) => {
                return <button onClick={() => handleClickRoom(eachRoom)} className="show-details-button" key={eachRoom.roomID}><li className="list-group-item">
                    <span className = 'list-room-text'>{eachRoom.roomID}</span>
                </li></button>
            })
        }
    }

    return (
        <div className="room-list">
            {rooms && rooms.length === 0 && 'No rooms to display.'}
            {rooms && rooms.length > 0 && <ul className="list-group">
                {renderListItem()}
            </ul>}
        </div>
    )
}
function mapStateToProps( { auth, room: {rooms} } ) {
    return {
        auth,
        rooms
    }
}


export default connect(mapStateToProps, actions) (RoomList)