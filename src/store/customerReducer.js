const defaultSate = {
	customers: []
}

export const customerReducer = (state = defaultSate, action) => {
	switch (action.type) {
		case 'ADD_CUSTOMER':
			return {
				...state,
				bill: state.bill + action.payload
			}
		case 'GET_CUSTOMER':
			return {
				...state,
				bill: state.bill - action.payload
			}
		default:
			return state
	}
}
