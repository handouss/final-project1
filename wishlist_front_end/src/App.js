import React from 'react';
import { Login } from './features/login/Login'
import {SignUp} from './features/signup/SignUp'
import {Home} from './features/home/Home'
import {ProvideAuth, useAuth} from './features/context/UseAuth'

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";


function PrivateRoute({ element, ...rest }) {
  let auth = useAuth();

  return (
 localStorage.getItem('isLoggedIn') ? <Outlet /> : <Navigate to="/login" />
  );
}

function App() {
  return (
    <ProvideAuth >
      <Router>
        <div className="App">

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route exact path='/' element={<PrivateRoute/>}>
              <Route exact path='/' element={<Home/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
