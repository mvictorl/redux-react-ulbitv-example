## Source: [YouTube channel "Ulbi TV" playlist "Redux"](https://www.youtube.com/playlist?list=PL6DxKON1uLOHsBCJ_vVuvRsW84VnqmPp6)

1. `# yarn create react-app .`
1. `# yarn add redux react-redux`
1. Create `store` in _`index.js`_:
    ```javascript
    import { createStore } from 'redux'
    ```
    and
    ```javascript
    const store = createStore(reducer)
    ```
1. Create `reducer`:
    ```javascript
    const defaultSate = {
      bill: 0
    }

    const reducer = (state = defaultSate, action) => {
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
    ```
1. In _`index.js`_:
    ```javascript
    import { Provider } from 'react-redux'
    ```
    and wrap by that component `<App />` with parameter `store`:
    ```javascript
    <Provider store={store}>
      <App />
    </Provider>
    ```
1. In _`App.js`_ component can get value fron state through react-redux hook `useSelector`:
    ```javascript
    import { useSelector } from 'react-redux'

    function App() {
      const bill = useSelector(state => state.bill)
    . . .
    ```
1. In _`App.js`_ component add two functions for changing state through react-redux hook `useDispatch`:
    ```javascript
    import { . . ., useDispatch } from 'react-redux'

    function App() {
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
    . . .
    ```
1. Use this functions in `onClick` parameters of HTML element (buttons):
    ```javascript
    function App() {
      . . .
      return (
        <div className="App">
          <h3>Bill: {bill}</h3>
          
          <button 
            onClick={() => addCash(Number(prompt()))}
          >+</button>
          
          <button 
            onClick={() => takeCash(Number(prompt()))}
          >-</button>
        
        </div>
      )
    }

    export default App
    ```
    The above code commit as _"Simple redux use (createStore) & react-redux hooks (useSelector, useDispatch)"_

---

1. Refactoring code. Create `src/store` folder. Within it create `index.js` file for `store` creating:
    ```javascript
    import { createStore } from 'redux'
    import { cashReducer } from './cashReducer'

    export const store = createStore(cashReducer)
    ```
1. Move cash reducer code in `cashReduser.js` file:
    ```javascript
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
    ```
1. Create `customerReducer.js` file for second reducer in the interest of customers:
    ```javascript
    const defaultState = {
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
    ```
1. For serve two reducers export `combineReducers` function from `redux`:
    ```javascript
    import { createStore, combineReducers } from 'redux'
    import { cashReducer } from './cashReducer'
    import { customerReducer } from './customerReducer'

    const rootReducer = combineReducers({
      cash: cashReducer,
      customers: customerReducer
    })

    export const store = createStore(rootReducer)
    ```
    and refactoring address `bill` value of the state in _`App.js`_ component:
    ```javascript
    const bill = useSelector(state => state.cash.bill)
    ```
    Separate store & two reducers files
---
1. In reducers files: _`cashReduser.js`_ & _`customerReducer.js`_ create action type constants:
    ```javascript
    const ADD_CASH = 'ADD_CASH'
    const TAKE_CASH = 'TAKE_CASH'
    . . .
    ```
    and
    ```javascript
    const ADD_CUSTOMER = 'ADD_CUSTOMER'
    const DEL_CUSTOMER = 'DEL_CUSTOMER'
    . . .
    ```
1. In reducers files: _`cashReduser.js`_ & _`customerReducer.js`_ create action creator functions:
    ```javascript
    . . .
    export const addCashAction = cash => ({
      type: ADD_CASH,
      payload: cash
    })

    export const takeCashAction = cash => ({
      type: TAKE_CASH,
      payload: cash
    })
    ```
    and
    ```javascript
    . . .
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
    ```
1. Import and use action creators function in _`App.js`_:
    ```javascript
    import { addCustomerAction, deleteCustomerAction } from './store/customerReducer'
    import { addCashAction, takeCashAction } from './store/cashReducer'

    . . .

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
    ```
    The above code commit as _"Add action creators"_

---

1. For async request add `# yarn add redux-thunk`
1. Add `redux-thunk` as middleware in _`store/index.js`_ file:
    ```javascript
    import { . . ., applyMiddleware } from 'redux'
    import thunk from 'redux-thunk'

    export const store = createStore(rootReducer, applyMiddleware(thunk))
    ```
1. Add in _`customerReducer.js`_ several customers getting functionality (with a check for uniqueness `id`):
    ```javascript
    const ADD_CUSTOMERS = 'ADD_CUSTOMERS'
    . . .
    export const customerReducer = (state = defaultSate, action) => {
      switch (action.type) {
        . . .
        case ADD_CUSTOMERS:
        // Push only unique (by id) customers
			  const newCustomers = []
			  const map = new Map()
			  for (const item of [...state.customers, ...action.payload]) {
				  if (!map.has(item.id)) {
					  map.set(item.id, true) 
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

    . . .

    export const addCustomersAction = payload => ({
      type: ADD_CUSTOMERS,
      payload
    })
    ```
1. Create _`customers.js`_ file into _`store/acyncActions`_ folder.
   
   File consist thunk-function `fetchCustomers()`. This is action-function that does async request to remote server ([https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)) and call `dispatch` of action creator `addCustomersAction()` inside itself.
    ```javascript
    import { addCustomersAction } from '../customerReducer'

    export function fetchCustomers() {
      return function (dispatch) {
        fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
          .then(response => response.json())
          .then(json => dispatch(addCustomersAction(json)))
      }
    }
    ```
1. Async function `fetchCustomers()` dispatch is now possible from _`App.js`_ component for get customers from remote server and put them to store & rerendering list of them:
    ```javascript
    . . .
    <div>
      {customers.length > 0 ? (
        <div>
          <ul>
            // Generate list of customers
            {customers.map(customer => (
              <li onClick={() => removeCustomer(customer.id)} key={customer.id}>
                {customer.name}
              </li>
            ))}

          </ul>
        </div>
      ) : (
        <div>'No customers yet'</div>
      )}
    </div>

    <button onClick={() => dispatch(fetchCustomers())}>
      Get Remote Customers
    </button>
    . . .
    ```
    The above code commit as _"Add async request customers by redux-thunk"_

---

1. 