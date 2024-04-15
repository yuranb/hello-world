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
    
    ws.onopen = function () {};
    ws.onmessage = async function (e) {
      const text =  e.data
        if(location.pathname==='/history.html' ){
          try{
            const tipsText = await text.text()
            console.log(tipsText)
          if(tipsText.indexOf('checked the weather in')>-1){
            console.log(tipsText)
            tipsDom.style.display = 'block'
            tipsDom.innerText = tipsText
            setTimeout(() => {
              tipsDom.style.display = 'none'
              tipsDom.innerText=''
            }, 3000);
          }
          }catch(e){
console.log(e)
          }
          
        }else if(location.pathname==='/index.html' || location.pathname==='/'){
          displayWeather(JSON.parse(e.data))
        }
    };

    ws.onclose = function () {
        console.log("Connection closed.");
    };

    ws.onerror = function () {
        console.log('Connection disconnected abnormally.')
    }
