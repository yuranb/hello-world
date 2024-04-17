import { useState,useEffect } from 'react'
import { Route, Routes,useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const navigate = useNavigate()
  const [switchPage,setPage] = useState({label:'About',value:'/about'})
  useEffect(()=>{
    if(location.pathname==='/home'||location.pathname==='/'){
      setPage({label:'About',value:'/about'})
    }else{
      setPage({label:'Home',value:'/'})
    }
  },[location.pathname])
  return (
    <div className="app">
          <header>
            <h1>Weather Query!</h1>
            <nav className='jump-btn' onClick={()=>{navigate(switchPage.value)}}>
              {switchPage.label}
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