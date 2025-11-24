let element = [];
let input = "";
let key = "a749a6fdc5fb32bcec897975dd2815dc";
let latitude = 0;
let longitude = 0;
const today = new Date();


function getInput() {
  input = document.getElementById("input").value;

  left = document.getElementById("infoBox");
  heading = document.getElementById("name");
  weatherIcon = document.querySelector(".weather-icon");
  temprature = document.querySelector(".temp");
  airQuality = document.getElementById("airQuality");
  humidity = document.getElementById("humidity");
  visibility = document.getElementById("visibility");
  windStatus = document.getElementById("windStatus");
  uvIndex = document.getElementById("uvIndex");
  sunrise = document.getElementById("sunrise");
  description = document.getElementById("description");
  
  
  
 display()

  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${key}`)
    .then((response) => response.json())
    .then((data1) => {
      console.log(data1);
      latitude = data1[0].lat;
      longitude = data1[0].lon;

      fetchWeather(latitude, longitude);
    })
    .catch((error) => console.error("Geo API error:", error));
    
}

function fetchWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
  )
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      left.innerHTML = `<div class="forecast-item">
      <span>Today</span>
      <span>${data.main.temp_max} / ${data.main.temp_min}</span>
    </div>`;
      heading.innerHTML = `${data.name},${data.sys.country}`;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" width="200px" height="200px" alt="weather icon">`;
      temprature.innerHTML = `${data.main.temp}°C`;

      airQuality.innerHTML = "Good";
      humidity.innerHTML = `${data.main.humidity}%`;
      visibility.innerHTML = `${data.visibility / 1000} km`;

      sunrise.innerHTML = `${new Date(
        data.sys.sunrise * 1000
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} -
                ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`;

      uvIndex.innerHTML = data.main.pressure;
      description.innerHTML = data.weather[0].description;
    
     
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("cart1").innerText = `Error: ${error.message}`;
    });
}

function getLocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    document.getElementById("cart1").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}

function success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  fetchWeather(latitude, longitude);
}

function showWeather() {
  const locations = [
    { name: "Kathmandu", lat: 27.71, lon: 85.32 },
    { name: "Pokhara", lat: 28.2083, lon: 83.9889 },
    { name: "Birāṭnagar", lat: 26.4542, lon: 87.2797 },
    { name: "Bharatpur", lat: 27.6806, lon: 84.4309 },
    { name: "Birgunj", lat: 27.0135, lon: 84.8764 },
    { name: "Butwal", lat: 27.6999, lon: 83.466 },
    { name: "Dharan", lat: 26.8126, lon: 87.2838 },
    { name: "Dhangadhi", lat: 28.7033, lon: 80.567 },
    { name: "Hetauda", lat: 27.4311, lon: 85.0319 },
    { name: "Janakpur", lat: 26.7285, lon: 85.9249 },
  ];

  locations.forEach((loc) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${key}`
    )
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("cart2").innerHTML += `
        
          <ul class="weather-card" data-latitude="${loc.lat}" data-longitude="${loc.lon}" onclick="getData(this)">
        <div class="top">
        <div class="icon"><img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon"></div>
         <div>
         <h1> ${data.main.temp}°C</h1>
         <p>Humidity: ${data.main.humidity}%</p>
         <p>Feels like: ${data.main.feels_like}°C</p>
         
         </div>
         </div>
         <div class="buttom">
         <div>
          <p>${data.name}, ${data.sys.country}</p>
          <p> ${data.weather[0].description}</p>
          </div>
          <div class="search">
          <button class="search-btn">
          <img src="https://img.icons8.com/?size=100&id=59878&format=png&color=228BE6" alt="search icon"></button>
          </div>
          </div>
          
        </ul>`;
      })
      .catch((error) => console.error("Error:", error));
  });
}

showWeather();


 function display(){
  document.getElementsByClassName("container")[0].style.display = "grid";
    
  }
let fullDate = today.toLocaleDateString('en-US', { 
  weekday: 'short', 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric' 
});
document.getElementById("date").innerHTML = fullDate;


function getData(element) {
  getInput()
  // Get latitude and longitude from card's data attributes
  const lat = parseFloat(element.dataset.latitude);
  const lon = parseFloat(element.dataset.longitude);
  
  fetchWeather(lat, lon);
}
