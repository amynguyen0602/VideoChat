import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Video from 'twilio-video'
import Participant from './Participant'

function VideoRoom({ token, handleLogout, roomName }) {
    const [room, setRoom] = useState(null)
    const [participants, setParticipants] = useState([])
    const [error, setError] =  useState('')


    useEffect(() => {
        const participantConnected = participant => {
          setParticipants(prevParticipants => [...prevParticipants, participant]);
        }
        const participantDisconnected = participant => {
          setParticipants(prevParticipants =>
            prevParticipants.filter(p => p !== participant)
          )
        }
        
            const connectVideo = async () => {
            try {
                const room = await Video.connect(token, {
                name: roomName
                })
                setRoom(room);
                room.on('participantConnected', participantConnected)
                room.on('participantDisconnected', participantDisconnected)
                room.participants.forEach(participantConnected)
            } catch (e) {
                setError('Requested device not found! You cannot join the room!')
            }
            } 
            connectVideo()
            
        
    }, [token, roomName])

    useEffect(() => {
        return () => {
            setRoom(currentRoom => {
              if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
                  trackPublication.track.stop()
                });
                currentRoom.disconnect()
                return null
              } else {
                return currentRoom
              }
            })
          }
        }, [roomName, token])

    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
      ))
    
    return (
        <div className="home-body">
            {error && <div className="alert alert-danger" role="alert">
            {error}
            <hr />
            <Link to="/roomchat" onClick={handleLogout} className="alert-link">Try again</Link>
            </div>}
            {!error && <div className="room">
            <h2>Room: {roomName}</h2>
            <svg onClick={handleLogout} style={{float: 'right'}} width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-door-closed-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 1a1 1 0 0 0-1 1v13H1.5a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2a1 1 0 0 0-1-1H4zm2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <div className="row">
                <div className="col-8">
                    <div className="local-participant">
                      {room ? (
                      <Participant
                      key={room.localParticipant.sid}
                      participant={room.localParticipant}
                      />) : <div className="d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                      </div>}
                  </div>
                </div>
              <div className="col-4"><div className="remote-participants">{remoteParticipants}</div></div>
            </div>
            </div>}
        </div>
    )   
    
}

function mapStateToProps( { auth, room } ) {
    return {
        auth,
        token: room.token
    }
}

export default connect(mapStateToProps) (VideoRoom)
