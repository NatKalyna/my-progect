let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[date.getMonth()];

  let dates = date.getDate();
  let year = date.getFullYear();

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  formatDate = `${currentDay} ${hours}:${minutes} ${currentMonth} ${dates} ${year}`;

  return formatDate;
}

let newDate = document.querySelector(" .weekDays");
newDate.innerHTML = `${formatDate(currentTime)}`;

function showWeather(respons) {
  let city = document.querySelector("#main-city");
  city.innerHTML = respons.data.name;

  let temperature = document.querySelector("#mainTemperature");
  temperature.innerHTML = Math.round(respons.data.main.temp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(respons.data.main.humidity);

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(respons.data.wind.speed);

  let shortWeath = document.querySelector("#short-describe");
  shortWeath.innerHTML = respons.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "c00b6e3e1cc217d87916a8b794f7ca77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function nowCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input").value;
  searchCity(input);
}

let newCity = document.querySelector("#search-button");
newCity.addEventListener("click", nowCity);

function showPosition(position) {
  let apiKey = "c00b6e3e1cc217d87916a8b794f7ca77";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPlace = document.querySelector("#current-button");
currentPlace.addEventListener("click", getCurrentLocation);
