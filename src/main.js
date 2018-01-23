import React from 'react'
import ReactDOM from 'react-dom'
import 'common/common'
import 'semantic-ui-css/semantic.min.css'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import App from './containers/App'
import reducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'common/logger'
import './style/main.scss'

const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    logger
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
