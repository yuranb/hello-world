const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
let ws = new WebSocket(`${protocol}://${window.location.host}/ws`);
let tipsDom = document.getElementById('tips');

function displayWeather(data) {
        
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.querySelector(".city-name").innerText = name;
  document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector(".description").innerText = description;
  document.querySelector(".temperature").innerText = `${temp}` + "°F";
  document.querySelector(".humidity").innerText = ` ${humidity}` + "%";
  document.querySelector(".wind-speed").innerText = ` ${speed} ` + "m/s";
}