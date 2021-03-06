import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_ALERT:
			return [...state, action.payload];
		case REMOVE_ALERT:
			//here the data will be just the id
			return state.filter(alert => alert.id !== action.payload);
		default:
			return state;
	}
}
