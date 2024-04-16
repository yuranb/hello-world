import React, { useState } from 'react'
import { BrowserRouter,useNavigate, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Button} from 'react-bootstrap'

function App() {
  const navigate = useNavigate()

  return (
    <div className="app">
    <Button onClick={()=>{navigate('/login')}}>
     Login
      </Button>
      <Button onClick={()=>{navigate('/registry')}}>
     Registry
    </Button>
          <Routes>
            {
              routes.map(item=>(
                <Route
                key={item.path}
                  path={item.path}
                  element={
                    <item.element />
                  }
                  exact
                />
              ))
            }  
          </Routes>
    </div>
  )
}

export default App