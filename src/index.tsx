import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import { Game } from './components'
import reducer from './helpers/reducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const App: React.FC = () => {
  const store = createStore(reducer, composeWithDevTools())
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
