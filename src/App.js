import React from 'react';
import './App.css';
import Main from './components/Main'
import Admin from './components/Admin'
import About from './components/About'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'

function App() {
  axios.defaults.baseURL = 'https://api.solna.xyz/v1'
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.get['Content-Type'] = 'application/json'

  return (
    <Provider store={createStore(reducer)}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              path="/admin"
              render={(routeProps) => <Admin {...routeProps}/>}
            >
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route
              path="/"
              render={(routeProps) => <Main {...routeProps}/>}
            >
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
