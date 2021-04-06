const ADD_CUSTOMER = 'ADD_CUSTOMER'
const DEL_CUSTOMER = 'DEL_CUSTOMER'

const defaultSate = {
	customers: []
}

export const customerReducer = (state = defaultSate, action) => {
	switch (action.type) {
		case 'ADD_CUSTOMER':
			return {
				...state,
				customers: [...state.customers, action.payload]
			}
		case 'DEL_CUSTOMER':
			return {
				...state,
				customers: state.customers.filter(
					customer => customer.id !== action.payload
				)
			}
		default:
			return state
	}
}

export function addCustomerAction(payload) {
	return {
		type: ADD_CUSTOMER,
		payload
	}
}

export function deleteCustomerAction(payload) {
	return {
		type: DEL_CUSTOMER,
		payload
	}
}
