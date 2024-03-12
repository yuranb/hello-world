document.addEventListener('DOMContentLoaded', function() {
    const weather = {
        apiKey : "ea9f40b3e63d13331a1f878412420312",
    };
    
    // Function to fetch weather data using OpenWeatherMap API
    function fetchWeather(city) {
            fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather.apiKey}&units=imperial`
            )
            .then((response) => {
                if (response.status === 404) {
                    throw new Error('Invalid city name');
                }
                return response.json();
            })
            .then((data) => displayWeather(data))
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

        // Initial weather display for Provo
        fetchWeather("Provo");
});

    function login() {
        const nameEl = document.querySelector("#name");
        localStorage.setItem("userName", nameEl.value);
        window.location.href = "history.html";
    }
