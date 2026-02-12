const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');
const cityName = document.getElementById('cityName');
const locationDetails = document.getElementById('locationDetails');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const historyList = document.getElementById('historyList');
const hourlyForecast = document.getElementById('hourlyForecast');

let searchHistory = [];

searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
    if (query.length < 3) return suggestions.innerHTML = '';

    const res = await fetch(`https://api.locationiq.com/v1/autocomplete?key=pk.17ab748500c7010db9a9defeb113b5cd&q=${encodeURIComponent(query)}&countrycodes=in&limit=5&format=json`);
    const places = await res.json();

    suggestions.innerHTML = '';
    places.forEach(place => {
        const li = document.createElement('li');
        li.textContent = place.display_name;
        li.addEventListener('click', () => {
            const cityObj = {
                name: place.address.name || place.address.city || place.address.town || place.address.village || place.display_name.split(',')[0],
                state: place.address.state || '',
                country: 'India',
                lat: place.lat,
                lon: place.lon
            };
            selectCity(cityObj);
        });
        suggestions.appendChild(li);
    });
});

function selectCity(city) {
    suggestions.innerHTML = '';
    searchInput.value = city.name;
    fetchWeather(city);
    addToHistory(city);
}

function fetchWeather(cityObj) {
    const { name, state, country } = cityObj;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a969ed894e611cd76c5693106ed66e8b&units=metric`)
        .then(res => res.json())
        .then(data => {
            cityName.textContent = name;
            locationDetails.textContent = `${state ? state + ', ' : ''}${country}`;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            setWeatherIcon(data.weather[0].main);
        });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=a969ed894e611cd76c5693106ed66e8b&units=metric`)
        .then(res => res.json())
        .then(data => {
            hourlyForecast.innerHTML = '<h4>Next Hours</h4>';
            const currentTime = new Date();

            let count = 0;
            for (let i = 0; i < data.list.length && count < 4; i++) {
                const date = new Date(data.list[i].dt * 1000);
                if (date > currentTime) {
                    const hour = date.getHours();
                    const formattedHour = `${((hour + 11) % 12 + 1)} ${hour >= 12 ? 'PM' : 'AM'}`;
                    const temp = Math.round(data.list[i].main.temp);
                    const condition = data.list[i].weather[0].main;

                    const block = document.createElement('div');
                    block.className = 'hour-block';
                    block.innerHTML = `<p>${formattedHour}</p><p>${temp}°C</p><p>${condition}</p>`;
                    hourlyForecast.appendChild(block);
                    count++;
                }
            }
        });
}

function setWeatherIcon(type) {
    const iconMap = {
        Clear: 'sun.png',
        Rain: 'rain.png',
        Clouds: 'clouds.png',
        Snow: 'snowflake.png',
        Thunderstorm: 'thunder.png',
        Drizzle: 'light-rain.png',
        Mist: 'cloud.png'
    };
    weatherIcon.style.backgroundImage = `url('${iconMap[type] || 'default.png'}')`;
}

function addToHistory(city) {
    const text = `${city.name}, ${city.state || ''}, ${city.country}`.replace(/, ,/, ',');
    if (!searchHistory.includes(text)) {
        searchHistory.unshift(text);
        const li = document.createElement('li');
        li.textContent = text;
        historyList.insertBefore(li, historyList.firstChild);
    }
}