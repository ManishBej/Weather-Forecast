import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY;
const BASE_URL = 'https://dataservice.accuweather.com'

export async function getLocationKey(query) {
  try {
    const response = await axios.get(
      `${BASE_URL}/locations/v1/search?apikey=${API_KEY}&q=${encodeURIComponent(query)}`
    )
    
    if (!response.data.length) {
      throw new Error('Location not found')
    }
    
    return response.data[0].Key
  } catch (error) {
    throw new Error(`Failed to find location: ${error.message}`)
  }
}

export async function get5DayForecast(locationKey) {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true`
    )
    return response.data
  } catch (error) {
    throw new Error(`Failed to get forecast: ${error.message}`)
  }
}

export async function get24HourForecast(locationKey) {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${API_KEY}&metric=true`
    )
    return response.data
  } catch (error) {
    throw new Error(`Failed to get hourly forecast: ${error.message}`)
  }
}
export async function getCurrentForecast(locationKey) {
  try {
    const response = await axios.get(
      `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`
    )
    return response.data
  } catch (error) {
    throw new Error(`Failed to get current forecast: ${error.message}`)
  }
}
