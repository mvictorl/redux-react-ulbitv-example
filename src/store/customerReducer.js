const ADD_CUSTOMER = 'ADD_CUSTOMER'
const DEL_CUSTOMER = 'DEL_CUSTOMER'
const ADD_CUSTOMERS = 'ADD_CUSTOMERS'

const defaultSate = {
	customers: []
}

export const customerReducer = (state = defaultSate, action) => {
	switch (action.type) {
		case ADD_CUSTOMER:
			return {
				...state,
				customers: [...state.customers, action.payload]
			}
		case DEL_CUSTOMER:
			return {
				...state,
				customers: state.customers.filter(
					customer => customer.id !== action.payload
				)
			}
		case ADD_CUSTOMERS:
			const newCustomers = []
			const map = new Map()
			for (const item of [...state.customers, ...action.payload]) {
				if (!map.has(item.id)) {
					map.set(item.id, true) // set any value to Map
					newCustomers.push({
						id: item.id,
						name: item.name
					})
				}
			}
			return {
				...state,
				customers: newCustomers
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

export const addCustomersAction = payload => ({
	type: ADD_CUSTOMERS,
	payload
})
