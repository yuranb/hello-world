let userName = localStorage.getItem('userName') || 'Mystery user'; 

function login() {
    const nameEl = document.querySelector("#name");
    userName = nameEl.value;
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "history.html";
}

document.addEventListener('DOMContentLoaded', function() {
    const weather = {
        apiKey : "ea9f40b3e63d13331a1f878412420312",
    };
    
    // Function to fetch weather data using OpenWeatherMap API
    function fetchWeather(city,isInitial = false) {
            fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather.apiKey}&units=imperial`
            )
            .then((response) => {
                if (response.status === 404) {
                    throw new Error('Invalid city name');
                }
                return response.json();
            })
            .then((data) => {
                displayWeather(data);
                if (!isInitial) { // Save search history only in non-initial cases
                    saveQueryHistory(city);
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                window.alert(error.message);
            });
    }
    // Display fetched weather data on the webpage
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

    const searchButton = document.querySelector(".weather-search button");
    searchButton.addEventListener("click", function(event) {
        event.preventDefault();
        const searchBar = document.querySelector(".search-bar");
        const city = searchBar.value;
        if (city) {
            fetchWeather(city);
            searchBar.value = ""; 
        }
    });
    
    // Display default Provo weather
    fetchWeather('Provo', true);

    function saveQueryHistory(city) {
        //const userName = localStorage.getItem('userName');
        const queryHistoryKey = `queryHistory_${userName}`;
        const queryHistory = JSON.parse(localStorage.getItem(queryHistoryKey)) || [];
        queryHistory.push(city);
        localStorage.setItem(queryHistoryKey, JSON.stringify(queryHistory));
        loadQueryHistory();
    }


});

function loadQueryHistory() {
    const queryHistoryEl = document.querySelector('#query-history');
    const userName = localStorage.getItem('userName') || 'Mystery user';
    const queryHistoryKey = `queryHistory_${userName}`;
    const queryHistory = JSON.parse(localStorage.getItem(queryHistoryKey)) || [];


    queryHistoryEl.innerHTML = ''; //Empty element content
    queryHistoryEl.innerHTML = `<h3>Welcome ${userName}</h3>`;
    queryHistory.forEach(query => {
        const listItem = document.createElement('li');
        listItem.textContent = query;
        queryHistoryEl.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', loadQueryHistory);


