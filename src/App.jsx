import { useState,useEffect } from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Button} from 'react-bootstrap'
import axios from 'axios'

function App() {
  const navigate = useNavigate()
  const [data,setData] = useState(null)
  useEffect(()=>{
    axios.get('http://127.0.0.1:4001/api/weather/Provo').then(res=>{
      console.log(res)
      if(res.status===200){
        setData(res.data)
      }
    })
  },[])

  return (
    <div className="app">
          <header>
            <h1>Weather Query!</h1>
            <nav>
              <a href="about.html">About</a>
            </nav>
          </header>
          <div className="btn-wrapper">
            <div className="title">
            You need to log in to check the city weather forecast
            </div>
            <Button>Login</Button>
            <Button>Register</Button>
          </div>
         {data && <div className="default-city">
            <div className="content">
            <div className="city">City:{data.name}</div>
            <div className="icon"><img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt=""/></div>
            <div className="desc">Description:{data.weather[0].description}</div>
            <div className="temperature">Temperature:{data.main.temp} °F</div>
            <div className="humidity">Humidity:{data.main.humidity} %</div>
            <div className="wind">Wind Speed:{data.wind.speed} m/s</div>
            </div>
          </div>}
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