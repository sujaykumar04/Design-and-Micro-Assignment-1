
Here is the live link for the application on NETLIFY - https://skypia.netlify.app/

#  WeatherSphere – Smart Weather Search Application

WeatherSphere is a single-page weather application that allows users to search Indian cities using autocomplete and instantly view real-time weather data along with upcoming hourly forecasts.

This project focuses on building a clean, API-driven interface using modern JavaScript practices without relying on any frameworks.

---

#  What This Project Does

- Autocompletes Indian cities while typing  
- Fetches real-time weather data  
- Displays upcoming hourly forecast  
- Dynamically updates the UI  
- Maintains search history  
- Uses multiple external APIs  
- Avoids hardcoded content  

Everything you see on the screen is generated dynamically using JavaScript.

---

#  How This Application Works

The entire flow of the application is built around three major steps:

1. Get accurate city data
2. Fetch weather information
3. Dynamically render it on the screen

Each of these steps is handled separately to keep the code clean and modular.

---

#  APIs Used and Why

## 1️ LocationIQ – Autocomplete Search

Endpoint Used:
https://api.locationiq.com/v1/autocomplete

Why this API?

OpenWeather does not provide autocomplete functionality.  
To improve user experience and prevent invalid city names, I integrated LocationIQ.

What it helps achieve:

- Suggests city names while typing  
- Limits results to India  
- Reduces user typing errors  
- Provides structured location details  

How it works:

- The `input` event listener monitors user typing
- If the input length is less than 3 characters, no request is sent
- Once valid, the API is called
- Suggestions are rendered dynamically using `document.createElement`
- Clicking a suggestion triggers weather retrieval

This makes the application feel interactive and responsive.

---

## 2️ OpenWeather – Current Weather Data

Endpoint Used:
https://api.openweathermap.org/data/2.5/weather

Why this API?

To retrieve real-time weather conditions such as:

- Temperature
- Weather type (Clear, Rain, Clouds, etc.)
- Location information

The API is configured with:

```
&units=metric
```

so temperatures are directly returned in Celsius.

The response is parsed and injected into the UI dynamically.

---

## 3️ OpenWeather – Forecast Data

Endpoint Used:
https://api.openweathermap.org/data/2.5/forecast

Why this API?

The main weather endpoint only provides current data.

To show upcoming weather conditions, the forecast API is used.  
It returns weather data in 3-hour intervals for 5 days.

Logic implemented:

- Convert Unix timestamps into readable time
- Filter only future forecast entries
- Display the next 4 upcoming time slots
- Convert 24-hour time into 12-hour AM/PM format

Example conversion:

```javascript
const date = new Date(data.list[i].dt * 1000);
```

Time formatting logic:

```javascript
const formattedHour = `${((hour + 11) % 12 + 1)} ${hour >= 12 ? 'PM' : 'AM'}`;
```

This ensures users only see relevant and readable forecast information.

---

#  Core JavaScript Logic

##  Autocomplete System

- Uses `addEventListener('input')`
- Fetches suggestions dynamically
- Clears old suggestions before rendering new ones
- Attaches click handlers to each suggestion

No suggestion data is hardcoded in HTML.

---

##  Weather Fetching System

Once a city is selected:

```javascript
selectCity(cityObj)
```

This triggers:

```javascript
fetchWeather(cityObj)
```

Two asynchronous fetch requests run:

- Current weather
- Forecast data

Both use Promises to handle asynchronous execution without blocking the UI.

---

##  Dynamic DOM Rendering

All UI updates are done using JavaScript.

Examples:

- Suggestions list items
- Hourly forecast blocks
- Search history entries

Example:

```javascript
const block = document.createElement('div');
block.className = 'hour-block';
block.innerHTML = `<p>${formattedHour}</p><p>${temp}°C</p><p>${condition}</p>`;
hourlyForecast.appendChild(block);
```

Nothing is statically written inside HTML.

---

##  Weather Icon Mapping

Weather conditions are mapped to icons using a simple object:

```javascript
const iconMap = {
  Clear: 'sun.png',
  Rain: 'rain.png',
  Clouds: 'clouds.png',
  Snow: 'snowflake.png',
  Thunderstorm: 'thunder.png',
  Drizzle: 'light-rain.png',
  Mist: 'cloud.png'
};
```

This keeps UI behavior predictable and maintainable.

---

##  Search History Handling

A runtime array stores search history:

```javascript
let searchHistory = [];
```

When a new city is searched:

- Check if it already exists
- Add to top using `unshift()`
- Insert into DOM at the top using `insertBefore()`

This ensures:

- No duplicates
- Most recent searches appear first

---

#  Design Decisions

- Functions are modular (single responsibility)
- No unnecessary global variables
- API calls are controlled to prevent excessive requests
- UI rendering is fully dynamic
- Logic is separated clearly from presentation

---

#  Technologies Used

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Fetch API  
- LocationIQ API  
- OpenWeather API  
- DOM Manipulation  

---

# 📂 Project Structure

```
WeatherSphere/
│
├── index.html
├── style.css
├── script.js
└── assets/
    ├── sun.png
    ├── rain.png
    ├── clouds.png
    └── etc
```

---

#  Edge Case Handling

- Prevents API calls for short inputs
- Avoids duplicate search history entries
- Filters only future forecast entries
- Handles missing city/state fields gracefully

---

#  Summary

WeatherSphere is a fully dynamic, API-driven weather application built using modern JavaScript practices.

It demonstrates:

- Real-world API integration
- Asynchronous programming
- Clean modular architecture
- Dynamic DOM rendering
- Practical frontend logic implementation

This project satisfies all capstone requirements by fetching live data, handling user interaction, generating dynamic UI components, and implementing structured logic using modern JavaScript.
