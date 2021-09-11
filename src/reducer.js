export const initialState = {
	user: null,
	posts: [],
};

export const actionTypes = {
	SET_USER: "SET_USER",
	ADD_POST: "ADD_POST",
};

const reducer = (state, action) => {
	console.log(action);
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

		default:
			return state;
	}
};

export default reducer;