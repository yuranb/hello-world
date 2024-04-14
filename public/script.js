document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      document.querySelector('#playerName').textContent = userName;
      setDisplay('loginControls', 'none');
      setDisplay('userControls', 'block');
    } else {
      setDisplay('loginControls', 'block');
      setDisplay('userControls', 'none');
    }
  });

  async function loginUser() {
    const email = document.querySelector('#userName').value;
    const password = document.querySelector('#userPassword').value;
  
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      localStorage.setItem('userName', email);
      alert('Log in successfully!');
      window.location.href = 'history.html';
    } else {
      alert('Login failed, please check your email and password.');
    }
  }

async function createUser() {
    const email = document.querySelector('#userName').value;
    const password = document.querySelector('#userPassword').value;

    const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
    alert('Successful registration, please log in.');
    setDisplay('loginControls', 'block'); 
    setDisplay('userControls', 'none'); 
    } else {
    alert('Registration failed!');
    }
}

function logout() {
    localStorage.removeItem('userName'); 
    window.location.href = 'index.html'; 
}

function setDisplay(elementId, displayStyle) {
    const element = document.querySelector(`#${elementId}`);
    if (element) {
      element.style.display = displayStyle;
    }
  }

document.addEventListener('DOMContentLoaded', function() {

    // Function to fetch weather data using OpenWeatherMap API
    function fetchWeather(city,isInitial = false) {
            fetch(`/api/weather/${city}`)
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
        const userName = localStorage.getItem('userName') || 'Mystery user';
        fetch(`/api/history/${userName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city: city })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save query history');
            }
            loadQueryHistory();  // Reload history to update the list
        })
        .catch(error => {
            console.error("Error saving weather query history:", error);
            window.alert(error.message);
        });
    }

    function loadQueryHistory() {
        const queryHistoryEl = document.querySelector('#query-history');
        const userName = localStorage.getItem('userName') || 'Mystery user';

        fetch(`/api/history/${userName}`)
        .then(response => response.json())
        .then(data => {
            queryHistoryEl.innerHTML = `<h3>Welcome, ${userName}</h3>`;
            data.forEach(city => {
                const listItem = document.createElement('li');
                listItem.textContent = city;
                queryHistoryEl.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error loading weather query history:", error);
        });
    }})

    //document.addEventListener('DOMContentLoaded', loadQueryHistory);