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