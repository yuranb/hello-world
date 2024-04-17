import { useEffect, useState } from "react";
import './index.css'
const History = () => {
  const userName = localStorage.getItem('userName')
  const [city, setCity] = useState("");
  const [tempData, setTempData] = useState(null);
  const protocol = window.location.protocol === "http:" ? "ws" : "wss";
  const [socket, setSocket] = useState(null);
  const [historyList,setHistory] = useState([]);
  const [tips,setTips] = useState('')
  function displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    setTempData({
      name,
      description,
      temp: `${temp}` + "°F",
      humidity: ` ${humidity}` + "%",
      speed: ` ${speed} ` + "m/s",
      icon: `https://openweathermap.org/img/wn/${icon}.png`,
    });
  }
  function loadQueryHistory() {
    // const queryHistoryEl = document.querySelector('#query-history');
    const userName = localStorage.getItem("userName") || "Mystery user";

    fetch(`/api/history/${userName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHistory(data)
      })
      .catch((error) => {
        console.error("Error loading weather query history:", error);
      });
  }
  function saveQueryHistory(city) {
    const userName = localStorage.getItem("userName") || "Mystery user";

    fetch(`/api/history/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: city }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save query history");
        }
        loadQueryHistory(); // Reload history to update the list
      })
      .catch((error) => {
        console.error("Error saving weather query history:", error);
        window.alert(error.message);
      });
  }
  function fetchWeather() {
    if(!city){
      alert('please enter city!')
      return
    }
    fetch(`/api/weather/${city}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Invalid city name");
        }
        return response.json();
      })
      .then((data) => {
        displayWeather(data);
        saveQueryHistory(city);
        const username = localStorage.getItem("userName");
        const text = `${username} checked the weather in ${city}`;
        socket.send(text);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        window.alert(error.message);
      });
  }
  useEffect(() => {
    const newSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    setSocket(newSocket);
    newSocket.onopen = () => console.log("WebSocket connected");
    newSocket.onmessage = async (message) => {
      try {
        const text = await message.data.text()
        setTips(text)
        setTimeout(() => {
          setTips('')
        }, 3000);
      } catch (e) {
        console.log(e);
      }
    };
    newSocket.onerror = (error) => console.log("WebSocket error:", error);
    newSocket.onclose = () => console.log("WebSocket disconnected");

    return () => {
      newSocket.close();
    };
  }, []);
  return (
    <div className="history">
       {tips && <div id="tips">{tips}</div>}
      <main>
        <section className="weather-search">
          <h2>Check the Weather</h2>
          <form>
            <input
              type="text"
              className="search-bar "
              placeholder="Enter city name"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            {`${"  "}`}
            <button
              type="button"
              onClick={() => {
                fetchWeather();
              }}
              className="btn btn-primary"
            >
              search
            </button>
          </form>
        </section>
        {tempData && <div className="wrapper">
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
            Wind Speed: <span className="wind-speed">{tempData.speed}</span>
          </p>
        </section>
      </div>}
      <section>
            <h2 className="query-title">Query History</h2>
            <ul id="query-history">
            <h3>Welcome {userName}</h3>
              {
                historyList.map((item,index)=>(
                  <li key={`${index}-${item}`}>{item}</li>
                ))
              }
            </ul>
        </section>
      </main>

    </div>
  );
};

export default History;