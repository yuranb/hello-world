document.addEventListener('DOMContentLoaded', function() {
    const weatherSearchForm = document.querySelector('.weather-search form');
    const loginForm = document.querySelector('.login-form');
    const queryHistoryList = document.querySelector('.database-data-placeholder ul');
    const realtimeTempElement = document.getElementById('realtime-temp');
    // Define a mock database to store query history
let mockDatabase = {
    queryHistory: [],
  };
