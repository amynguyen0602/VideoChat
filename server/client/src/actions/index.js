import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER, CREATE_ROOM, JOIN_ROOM, FETCH_CONTACT, FETCH_ROOMS, EDIT_ROOM } from './types'
import setAuthToken from '../token/authToken';
import jwt_decode from 'jwt-decode';


export const registerUser = (user, history) => async dispatch => {
    try {
        await axios.post('/api/users/register', user)
        history.push('/signin')
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const loginUser = (user) => async dispatch => {
    try {
        const res = await axios.post('/api/users/login', user)
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}

export const editUser = ({ email, firstname, lastname, password }) => async dispatch => {
    try {
        const res = await axios.put('/api/user/'+ email, { firstname, lastname, password })
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const createRoom = (user, room) => async dispatch => {
    try {
        const res = await axios.post('/api/createRoom', {user, room})
        dispatch({
            type: CREATE_ROOM,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const joinRoom = (room, identity) => async dispatch => {
    try {
        const res = await axios.post('/api/roomchat', { room, identity })
        dispatch({
            type: JOIN_ROOM,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const addContact = (user, contact) => async dispatch => {
    try {
        await axios.post('/api/add_contact', {user, contact})
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const deleteContact = (email, user) => async dispatch => {
    await axios.delete('/api/contact/'+ user.email + "/" +email)
}

export const deleteRoom = (roomID, user) => async dispatch => {
    await axios.delete('/api/room/'+ user.email + "/" + roomID)
}

export const fetchContact = (user) => async dispatch => {
    const res = await axios.get('/api/contacts/'+ user.email)
    dispatch({
        type: FETCH_CONTACT,
        payload: res.data
    })
}

export const fetchRooms = (user) => async dispatch => {
    const res = await axios.get('/api/rooms/' + user.email)
    dispatch({
        type: FETCH_ROOMS,
        payload: res.data
    })
}

export const editRoom = ({ roomID, password }) => async dispatch => {
    try {
        const res = await axios.put('/api/room/'+ roomID, { password })
        dispatch({
            type: EDIT_ROOM,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


    
    
