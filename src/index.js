<link rel="stylesheet" href="./styles.css"></link>
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

      defaultCity();