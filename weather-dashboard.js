// Weather Dashboard JavaScript
class WeatherDashboard {
    constructor() {
        this.apiKey = 'f013927405f3d5501729d8d3f40cfab1';
        this.apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.iconUrl = 'https://openweathermap.org/img/wn/';
        
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.loadingMessage = document.getElementById('loadingMessage');
        this.errorMessage = document.getElementById('errorMessage');
        this.weatherCard = document.getElementById('weatherCard');
        
        // Weather display elements
        this.cityName = document.getElementById('cityName');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.temperature = document.getElementById('temperature');
        this.weatherDescription = document.getElementById('weatherDescription');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
    }

    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.searchWeather());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });
        
        // Focus on input when page loads
        this.cityInput.focus();
    }

    async searchWeather() {
        const city = this.cityInput.value.trim();
        
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        this.showLoading();
        this.hideError();
        this.hideWeatherCard();

        try {
            const weatherData = await this.fetchWeatherData(city);
            this.displayWeatherData(weatherData);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    async fetchWeatherData(city) {
        const url = `${this.apiUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please check the spelling and try again.');
                } else if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your configuration.');
                } else if (response.status === 429) {
                    throw new Error('Too many requests. Please try again later.');
                } else {
                    throw new Error(`Weather service error: ${response.status}`);
                }
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof TypeError) {
                throw new Error('Network error. Please check your internet connection.');
            }
            throw error;
        }
    }

    displayWeatherData(data) {
        // Extract weather information
        const {
            name,
            main: { temp, feels_like, humidity, pressure },
            weather: [{ description, icon }],
            wind: { speed },
            sys: { country }
        } = data;

        // Update display elements
        this.cityName.textContent = `${name}, ${country}`;
        this.temperature.textContent = `${Math.round(temp)}°C`;
        this.weatherDescription.textContent = description;
        this.feelsLike.textContent = `${Math.round(feels_like)}°C`;
        this.humidity.textContent = `${humidity}%`;
        this.windSpeed.textContent = `${Math.round(speed * 3.6)} km/h`; // Convert m/s to km/h
        this.pressure.textContent = `${pressure} hPa`;

        // Display weather icon
        this.displayWeatherIcon(icon, description);

        // Show weather card
        this.showWeatherCard();
    }

    displayWeatherIcon(iconCode, description) {
        // Create weather icon image
        const iconUrl = `${this.iconUrl}${iconCode}@2x.png`;
        
        // Create image element
        const img = document.createElement('img');
        img.src = iconUrl;
        img.alt = description;
        img.title = description;
        
        // Handle image load error - fallback to emoji
        img.onerror = () => {
            this.weatherIcon.innerHTML = this.getWeatherEmoji(iconCode);
        };
        
        // Clear previous content and add new image
        this.weatherIcon.innerHTML = '';
        this.weatherIcon.appendChild(img);
    }

    getWeatherEmoji(iconCode) {
        // Fallback emojis for when images don't load
        const emojiMap = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        
        return emojiMap[iconCode] || '🌤️';
    }

    showLoading() {
        this.loadingMessage.classList.add('show');
        this.searchBtn.disabled = true;
        this.searchBtn.textContent = 'Loading...';
    }

    hideLoading() {
        this.loadingMessage.classList.remove('show');
        this.searchBtn.disabled = false;
        this.searchBtn.textContent = 'Get Weather';
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    hideError() {
        this.errorMessage.classList.remove('show');
    }

    showWeatherCard() {
        this.weatherCard.classList.add('show');
    }

    hideWeatherCard() {
        this.weatherCard.classList.remove('show');
    }
}

// Initialize the weather dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WeatherDashboard();
});

// Handle offline/online status
window.addEventListener('online', () => {
    console.log('Internet connection restored');
});

window.addEventListener('offline', () => {
    console.log('Internet connection lost');
});