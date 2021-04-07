import './App.scss'
import { useSelector, useDispatch } from 'react-redux'

import {
	addCustomerAction,
	deleteCustomerAction
} from './store/customerReducer'

import { addCashAction, takeCashAction } from './store/cashReducer'
import { fetchCustomers } from './store/asyncActions/customers'

function App() {
	const bill = useSelector(state => state.cash.bill)
	const customers = useSelector(state => state.customers.customers)
	const dispatch = useDispatch()

	const addCash = val => dispatch(addCashAction(val))
	const takeCash = val => dispatch(takeCashAction(val))

	function addCustomer(name) {
		dispatch(
			addCustomerAction({
				id: Date.now(),
				name
			})
		)
	}

	function removeCustomer(id) {
		dispatch(deleteCustomerAction(id))
	}

	return (
		<div className="App pt-4">
			<h3>Bill: {bill}</h3>

			<button
				onClick={() => addCash(Number(prompt()))}
				className="btn btn-success"
			>
				+
			</button>

			<button
				onClick={() => takeCash(Number(prompt()))}
				className="btn btn-danger ml-3"
			>
				-
			</button>
			<hr />

			<div className="customers">
				{customers.length > 0 ? (
					<div>
						<ul>
							{customers.map(customer => (
								<li
									onClick={() => removeCustomer(customer.id)}
									key={customer.id}
								>
									{customer.name}
								</li>
							))}
						</ul>
					</div>
				) : (
					<div className="nocustomer">'No customers yet'</div>
				)}
			</div>

			<button onClick={() => addCustomer(prompt())} className="btn btn-success">
				Add Customer
			</button>

			<button
				onClick={() => dispatch(fetchCustomers())}
				className="btn btn-danger ml-3"
			>
				Get Remote Customers
			</button>
		</div>
	)
}

export default App
