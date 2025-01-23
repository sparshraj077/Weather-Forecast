// WeatherAPI key and base URL
const API_KEY = "5df41ed7228f465197a33256252301";
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

// DOM elements
const getWeatherBtn = document.getElementById("getWeatherBtn");
const locationInput = document.getElementById("locationInput");
const weatherDataDiv = document.getElementById("weatherData");
const errorDiv = document.getElementById("error");

// Function to fetch weather data for a specific location
const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${location}&aqi=yes`);
    if (!response.ok) {
      throw new Error("Unable to fetch weather data. Please check the location.");
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    errorDiv.textContent = error.message;
    weatherDataDiv.textContent = "";
  }
};

// Function to display weather data
const displayWeatherData = (data) => {
  const { location, current } = data;
  weatherDataDiv.innerHTML = `
    <h2>Weather in ${location.name}, ${location.region}</h2>
    <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
    <p><strong>Condition:</strong> ${current.condition.text}</p>
    <p><strong>Humidity:</strong> ${current.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${current.wind_kph} kph</p>
  `;
  errorDiv.textContent = "";
};

// Event listener for the button
getWeatherBtn.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location === "") {
    errorDiv.textContent = "Please enter a valid location.";
    weatherDataDiv.textContent = "";
    return;
  }
  fetchWeatherData(location);
});
