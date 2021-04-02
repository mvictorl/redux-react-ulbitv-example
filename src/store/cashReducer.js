const defaultSate = {
	bill: 0
}

export const cashReducer = (state = defaultSate, action) => {
	switch (action.type) {
		case 'ADD_CASH':
			return {
				...state,
				bill: state.bill + action.payload
			}
		case 'TAKE_CASH':
			return {
				...state,
				bill: state.bill - action.payload
			}
		default:
			return state
	}
}
