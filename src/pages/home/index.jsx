import {useEffect,useState} from 'react'
import { Button } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import "./index.css";
const Home = () => {
  const navigate = useNavigate();
  const [tempData,setTempData] = useState({})
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const [socket, setSocket] = useState(null);
  const userName =localStorage.getItem('userName')
  function displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    setTempData({
      name,
      description,
      temp:`${temp}` + "°F",
      humidity:` ${humidity}` + "%",
      speed:` ${speed} ` + "m/s",
      icon:`https://openweathermap.org/img/wn/${icon}.png`
    }) 
  }

  useEffect(()=>{
    fetch('/api/weather/Provo')
    .then((response) => {
        if (response.status === 404) {
            throw new Error('Invalid city name');
        }
        return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
        window.alert(error.message);
    });
    const newSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    setSocket(newSocket);
    newSocket.onopen = () => console.log('WebSocket connected');
    newSocket.onmessage = async(message) => {
      try{
        const text =  JSON.parse(message.data)
        displayWeather(text);
      }catch(e){
        console.log(e)
      }
    }
    newSocket.onerror = (error) => console.log('WebSocket error:', error);
    newSocket.onclose = () => console.log('WebSocket disconnected');

    return () => {
      newSocket.close();
    };
  },[])
  return (
    <div className="home">
     {!userName && <div className="btn-wrapper">
        <div className="title">
          You need to log in to check the city weather forecast
        </div>
        <Button onClick={()=>{navigate('/login')}}>Login</Button>
        <Button onClick={()=>{navigate('/registry')}}>Register</Button>
      </div>}
      <div className="wrapper">
        <section className="weather-result">
          <p>
            City: <span className="city-name">{tempData.name}</span>
          </p>
          <img src={tempData.icon} alt="Weather Icon" className="icon" />
          <p>
            Description: <span className="description">{tempData.description}</span>
          </p>
          <p>
            Temperature: <span className="temperature">{tempData.temp}</span>
          </p>
          <p>
            Humidity: <span className="humidity">{tempData.humidity}</span>
          </p>
          <p>
            Wind Speed: <span className="wind-speed">{tempData.seed}</span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;