import React, { useState,Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Filter from "./component/Filter";
import Sidebar from "./component/Sidebar";
import Main from "./component/Main";
import PrivateRoute from "./component/PrivateRoute";
import Login from "./component/Login";
import Landing from "./component/Homepage/Landing";
function App() {

  return (
    <div className="App">
      
      <Router>
      <Fragment>
        <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Landing/>}/>
          </Route>
          {/* <Route exact path='/register' element={<Register/>}/> */}
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
      </Fragment>
    </Router>
      
    
    
       
     
    </div>
  );
}

export default App;
