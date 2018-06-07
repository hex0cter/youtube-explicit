import React from 'react';
import './App.css';
import Main from './components/Main'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'

function App() {
  return (
    <Provider store={createStore(reducer)}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
