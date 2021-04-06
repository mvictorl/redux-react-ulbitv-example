const ADD_CASH = 'ADD_CASH'
const TAKE_CASH = 'TAKE_CASH'

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

export const addCashAction = cash => ({
	type: ADD_CASH,
	payload: cash
})

export const takeCashAction = cash => ({
	type: TAKE_CASH,
	payload: cash
})
