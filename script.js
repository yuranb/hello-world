document.addEventListener('DOMContentLoaded', function() {
    const weatherSearchForm = document.querySelector('.weather-search form');
    const loginForm = document.querySelector('.login-form');
    const queryHistoryList = document.querySelector('.database-data-placeholder ul');
    const realtimeTempElement = document.getElementById('realtime-temp');
    // Define a mock database to store query history
    let mockDatabase = {
        queryHistory: [],
    };

// Add event listener for login form submission
loginForm.addEventListener('submit', function(e) {
e.preventDefault();
const usernameEl = document.querySelector('.login-form input[type="text"]');
localStorage.setItem("username", usernameEl.value);
alert(`User logged in: ${usernameEl.value}`);
});

// Handle weather search form submission
weatherSearchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const cityName = this.querySelector('input[type="text"]').value;
    fetchWeather(cityName);
    mockDatabase.queryHistory.push(cityName);
    updateQueryHistoryDisplay();
});

// Function to fetch weather data using OpenWeatherMap API
function fetchWeather(city) {
    const apiKey = "13e786b2255800d48474a6fdbcd071dc";
    fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
    .then((response) => response.json())
    .then((data) => displayWeather(data));
}

// Function to update query history display on the webpage
function updateQueryHistoryDisplay() {
    queryHistoryList.innerHTML = '';
    mockDatabase.queryHistory.forEach(query => {
    const li = document.createElement('li');
    li.textContent = `Query: ${query}`;
    queryHistoryList.appendChild(li);
    });
}

// Simulate real-time data updates using mock data
function mockWebSocketData() {
    setInterval(() => {
        const data = mockData.shift();
        
        // Update temperature, humidity, and wind speed in the DOM
        realtimeTempElement.textContent = `${data.temperature}`;
        humidityElement.textContent = `${data.humidity}%`;
        windSpeedElement.textContent = `${data.windSpeed} m/s`;
    }, 5000); // Update every 5 seconds
}