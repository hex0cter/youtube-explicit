import React from 'react';
import './App.css';
import Main from './components/Main'
import Admin from './components/Admin'
import Home from './components/Home'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Provider store={createStore(reducer)}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/about">
              <Home />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
