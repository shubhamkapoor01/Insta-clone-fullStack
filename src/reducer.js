import db from './Firebase/firebase'

export const initialState = {
	user: null,
	posts: [],
	users: [],
};

export const actionTypes = {
	SET_USER: "SET_USER",
	ADD_POST: "ADD_POST",
};

const reducer = (state, action) => {
	switch(action.type) {
		case actionTypes.SET_USER:
			return {
				...state,
				user: action.user,
			};

		case actionTypes.ADD_POST:
			return {
				...state,
				posts: action.posts,
			}

		case actionTypes.ADD_USER:
			return {
				...state,
				users: action.users,
			}

		default:
			return state;
	}
};

export default reducer;