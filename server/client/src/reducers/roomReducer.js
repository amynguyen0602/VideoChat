import { CREATE_ROOM, JOIN_ROOM, FETCH_ROOMS, EDIT_ROOM } from '../actions/types';

const initialState = {}

export default function(state = initialState, action ) {
    switch(action.type) {
        case CREATE_ROOM:
            return {
                ...state,
                room: action.payload
            }
        case JOIN_ROOM:
            return {
                ...state,
                token: action.payload
            }
        case FETCH_ROOMS:
            return {
                ...state,
                rooms: action.payload
            }
        case EDIT_ROOM:
            return {
                ...state,
                editedRoom: action.payload
            }
        default: 
            return state;
    }
}