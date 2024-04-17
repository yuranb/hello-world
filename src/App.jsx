import { useState,useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <div className="app">
          <header>
            <h1>Weather Query!</h1>
            <nav>
              <a href="about.html">About</a>
            </nav>
          </header>
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
          <footer>
              <a href="https://github.com/yuranb/startup">GitHub</a>
          </footer>
    </div>
  )
}

export default App