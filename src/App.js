import React from 'react';
import Login from './Containers/Login/login'
import Signup from './Containers/Signup/signup'
import Home  from './Containers/Home/home'
import Store from './Config/Store'
import {Provider} from "react-redux";
import Router from './Config/Router/router'
function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Router/>
      </Provider>
    </div>
  );
}

export default App;
