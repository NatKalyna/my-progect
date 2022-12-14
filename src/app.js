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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayWeatherForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast-block");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <ul class="future-weather">
          <li class="day-week">${formatDay(forecastDay.dt)}</li>
          <li>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="thunderstorms in places"
              id="icon-forecast"
            />
          </li>
          <li class="temperature-forecast> <span"id="day-temperature">${Math.round(
            forecastDay.temp.day
          )}°</span>
          <span id="night-temperature">${Math.round(
            forecastDay.temp.night
          )}°</span>
          </li>
        </ul>
      </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c00b6e3e1cc217d87916a8b794f7ca77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherForecast);
}

function showWeather(response) {
  let cityElement = document.querySelector("#main-city");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#mainTemperature");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let shortWeath = document.querySelector("#short-describe");
  shortWeath.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "c00b6e3e1cc217d87916a8b794f7ca77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function nowCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

let newCity = document.querySelector("#search-form");
newCity.addEventListener("submit", nowCity);

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

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#mainTemperature");
  let fahrenheitTemperature = Math.round(1.8 * celsiusTemperature + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#mainTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let currentPlace = document.querySelector("#current-button");
currentPlace.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
