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