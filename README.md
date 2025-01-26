
---

# Weather Forecast App

A simple Next.js application that retrieves and displays weather data in a clean, responsive interface. It fetches weather information from AccuWeather’s API and shows current conditions, hourly, and 5-day forecasts.

## Features

- Search for locations by city.
- Displays current weather conditions (temperature, condition, date/time).
- Shows a 5-day forecast with daily high/low temperatures.
- Offers an hourly forecast for the next 24 hours.
- Provides additional weather info like wind speed, humidity, and “feels like” temperature.

## Table of Contents

1. Getting Started  
2. Project Structure  
3. Environment Variables  
4. Key Scripts  
5. Code Explanation

---

## Getting Started

1. **Clone** this repository:  
   ```bash
   git clone https://github.com/your-username/weather-forecast-app.git
   ```
2. **Install** dependencies:  
   ```bash
   cd weather-forecast-app
   npm install
   ```
3. **Create** a `.env.local` file in the root directory with your AccuWeather API key:
   ```bash
   NEXT_PUBLIC_ACCUWEATHER_API_KEY=YOUR_API_KEY_HERE
   ```
4. **Run** the development server:
   ```bash
   npm run dev
   ```
5. Open your browser at [http://localhost:3000](http://localhost:3000) to see the app.

---

## Project Structure

```
weather-forecast-app/
│
├── app/
│   ├── page.js         # Main page rendering search + weather components
│   ├── layout.js       # Custom layout & metadata
│   └── globals.css     # Global styling
│
├── components/
│   ├── CurrentWeather.js
│   ├── DailyForecast.js
│   ├── HourlyForecast.js
│   ├── SearchForm.js
│   └── WeatherDetails.js
│
├── lib/
│   └── api.js          # Functions to call AccuWeather endpoints
│
└── .env.local          # Env file (API KEY)
```

- **app/layout.js**: Defines global HTML metadata (title, viewport) and imports any global assets (e.g., fonts).  
- **app/page.js**: Main page logic, fetches and stores weather data in state, renders sub-components.  
- **app/globals.css**: Global CSS resets and base styling.  
- **lib/api.js**: Holds utility functions to interact with AccuWeather’s API.  
- **components/**: Reusable React components (CurrentWeather, DailyForecast, HourlyForecast, SearchForm, WeatherDetails).

---

## Environment Variables

Create an `.env.local` file at the root:

```bash
NEXT_PUBLIC_ACCUWEATHER_API_KEY=YOUR_API_KEY_HERE
```
- **NEXT_PUBLIC_ACCUWEATHER_API_KEY**: Your AccuWeather API key. It is referenced in `lib/api.js`.

---

## Key Scripts

- `npm run dev`  
  Starts the development server on [http://localhost:3000](http://localhost:3000).  
- `npm run build`  
  Creates an optimized production build.  
- `npm run start`  
  Runs the production build locally.

---

## Code Explanation

### app/page.js
The heart of the app:
```js
'use client'
import { useState, useEffect } from 'react'
import { getLocationKey, getCurrentForecast, get5DayForecast, get24HourForecast } from '../lib/api'
import SearchForm from '../components/SearchForm'
import CurrentWeather from '../components/CurrentWeather'
import DailyForecast from '../components/DailyForecast'
import HourlyForecast from '../components/HourlyForecast'
import WeatherDetails from '../components/WeatherDetails'

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('')

  const updateWeather = async (query) => {
    try {
      const locationKey = await getLocationKey(query)
      const current = await getCurrentForecast(locationKey)
      const daily = await get5DayForecast(locationKey)
      const hourly = await get24HourForecast(locationKey)

      setWeatherData({
        current,
        daily,
        hourly,
      })
      setLocation(query)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    // Optionally fetch default city on mount
    updateWeather('London')
  }, [])

  return (
    <>
      <SearchForm onSearch={updateWeather} />
      {weatherData && (
        <>
          <CurrentWeather location={location} data={weatherData.current} />
          <DailyForecast data={weatherData.daily} />
          <HourlyForecast data={weatherData.hourly} />
          <WeatherDetails data={weatherData.current} />
        </>
      )}
    </>
  )
}
```
- **useEffect** calls `updateWeather` for a default city on mount.  
- **updateWeather** orchestrates sequential API calls, then populates state.  
- Renders subcomponents (`CurrentWeather`, `DailyForecast`, `HourlyForecast`, `WeatherDetails`) if valid data is present.

### lib/api.js
All AccuWeather calls in one place:
```js
const API_KEY = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY
const BASE_URL = 'https://dataservice.accuweather.com'

export async function getLocationKey(query) {
  // Returns a location key for 'query'
}

export async function getCurrentForecast(locationKey) {
  // Returns the current-weather object
}

export async function get5DayForecast(locationKey) {
  // Returns the 5-day forecast
}

export async function get24HourForecast(locationKey) {
  // Returns next 24 hours of data
}
```
- Each function performs an API request with a unique endpoint.  
- `API_KEY` is included in query parameters (e.g., `?apikey=${API_KEY}`).

### components/SearchForm.js
A simple input to fetch new data:
```js
'use client'

export default function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter city name"
      />
      <button type="submit">Search</button>
    </form>
  )
}
```
- Uses an internal state to manage the search text.  
- Triggers `onSearch` with the user’s input on submit.

### components/CurrentWeather.js, DailyForecast.js, HourlyForecast.js, WeatherDetails.js
Each component receives the relevant data and focuses on a specific UI section:
- **CurrentWeather**: Current temperature, conditions, date/time.  
- **DailyForecast**: 5-day forecast in a horizontal scroll or grid.  
- **HourlyForecast**: 24-hour breakdown with times and temperatures.  
- **WeatherDetails**: Extra details (wind speed, humidity, etc.).

They all use [Styled Components](https://styled-components.com/) to define local UI styles.

---

## License

This project is under the MIT License. Feel free to modify and use.  

---

