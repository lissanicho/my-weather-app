let now = new Date();
let date = document.querySelector("#date");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
date.innerHTML = `${day}, ${hours}:${minutes}`;

   //code to get coordinates from API
      function getForecast(coordinates) {
        
        let apiKey = "8161b4309ee03faae957729ba7104797";
        let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
        
        axios.get(apiURL).then(futureForecast);
      }

//code for current location button
function showTemperature(response) {
  let h1 = document.querySelector("h1");
  let cityName = response.data.name;
  h1.innerHTML = `${cityName}`;
  let temp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}°C`;
  let clouds = document.querySelector("#cloud-condition");
  let cloudy = response.data.weather[0].description;
  clouds.innerHTML = `${cloudy}`;
  let humidity = document.querySelector("#humidity");
  let humid = response.data.main.humidity;
  humidity.innerHTML = `${humid}% humidity`;
  let windSpeed = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind speed ${wind}km/h`;
  let iconElement = document.querySelector("#icon");
        iconElement.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
        iconElement.setAttribute("alt", response.data.weather[0].description);
celsiusTemperature = response.data.main.temp;
getForecast(response.data.coord);
      }
function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiURL}`).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentPosition);
//end of code for current location button

//start of code for search bar
function searchEntry(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let units = "metric";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
  let apiURL = `${apiRoot}q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(showTemperature);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchEntry);

//add default city to page loading
function defaultCity() {
        let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
        let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
        let units = "metric";
        let apiURL = `${apiRoot}q=Singapore&appid=${apiKey}&units=${units}`;
        axios.get(apiURL).then(showTemperature);
      }


     

//start of code for days in the forecast
function formatDay(timestamp) {
        let date = new Date(timestamp * 1000);
        let day = date.getDay();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        return days[day];
      }
      function futureForecast(response) {
        
        let forecast = response.data.daily;
        let forecastElement = document.querySelector("#weekly-forecast");
        let forecastHTML = `<div class="row">`;

        forecast.forEach(function (forecastDay, index) {
          if (index<6){
          forecastHTML =
            forecastHTML +
            `
              <div class="col-2">
                <div class ="weather-forecast-date">
                  ${formatDay(forecastDay.dt)}</div>
                  <br />
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                 alt= ${forecastDay.weather[0].description}
                  />
                  <div id=forecast-temperatures><span id=max>${
                    Math.round(forecastDay.temp.max)
                  }°/ </span><span id=min>${Math.round(forecastDay.temp.min)}°</span>
                    </div>
               
              </div>
            `;}
        });
        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;
      }

      defaultCity();