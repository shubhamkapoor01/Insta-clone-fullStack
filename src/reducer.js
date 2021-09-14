export const initialState = {
	user: null,
	posts: [],
	users: [],
	clicked: {},
};

export const actionTypes = {
	SET_USER: "SET_USER",
	ADD_POST: "ADD_POST",
	ADD_USER: "ADD_USER",
	SET_CLICKED: "SET_CLICKED",
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

		case actionTypes.SET_CLICKED:
			return {
				...state,
				clicked: action.clicked,
			}

		default:
			return state;
	}
};

export default reducer;