import './App.scss'
import { useSelector, useDispatch } from 'react-redux'

function App() {
	const bill = useSelector(state => state.cash.bill)
	const dispatch = useDispatch()

	function addCash(value) {
		dispatch({
			type: 'ADD_CASH',
			payload: value
		})
	}

	function takeCash(value) {
		dispatch({
			type: 'TAKE_CASH',
			payload: value
		})
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
		</div>
	)
}

export default App
