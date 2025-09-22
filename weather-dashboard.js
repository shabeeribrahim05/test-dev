// Weather Dashboard JS
// Uses OpenWeatherMap API (https://openweathermap.org/current)
// Replace 'YOUR_API_KEY' with your actual API key

const API_KEY = 'f013927405f3d5501729d8d3f40cfab1'; // User's OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const errorMsg = document.getElementById('errorMsg');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    errorMsg.textContent = '';
    weatherResult.innerHTML = '';
    if (!city) {
        errorMsg.textContent = 'Please enter a city name.';
        return;
    }
    try {
        const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found or API error.');
        }
        const data = await response.json();
        weatherResult.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Condition:</strong> ${data.weather[0].description}</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    } catch (err) {
        errorMsg.textContent = err.message;
    }
});
