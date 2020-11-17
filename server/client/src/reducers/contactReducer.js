import { FETCH_CONTACT } from '../actions/types';

const initialState = {}

export default function(state = initialState, action ) {
    switch(action.type) {
        case FETCH_CONTACT:
            return {
                ...state,
                user: action.payload
            }
        default: 
            return state;
    }
}