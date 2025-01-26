'use client'

import { useState, useEffect } from 'react'
import SearchForm from '@/components/SearchForm'
import CurrentWeather from '@/components/CurrentWeather'
import DailyForecast from '@/components/DailyForecast'
import HourlyForecast from '@/components/HourlyForecast'
import WeatherDetails from '@/components/WeatherDetails'
import { getLocationKey, get5DayForecast, get24HourForecast, getCurrentForecast } from '@/lib/api'
import styled from '@emotion/styled'

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
  }
`

const LeftColumn = styled.div`
  flex: 2;
  background: rgba(179, 178, 178, 0.51);
  border-radius: 43px;
  padding: 20px;
`

const RightColumn = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 43px;
  padding: 20px;
`

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)

  const updateWeather = async (query) => {
    try {
      setLoading(true)
      const locationKey = await getLocationKey(query)
      const [fiveDayForecast, hourlyForecast, currentForecast] = await Promise.all([
        get5DayForecast(locationKey),
        get24HourForecast(locationKey),
        getCurrentForecast(locationKey)
      ])

      setWeatherData({
        location: query,
        daily: fiveDayForecast,
        hourly: hourlyForecast,
        current: currentForecast[0]
      })
    } catch (error) {
      console.error('Error fetching weather:', error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    updateWeather('Bankura')
  }, [])

  if (!weatherData) return <div>Loading...</div>

  return (
    <WeatherContainer>
      <LeftColumn>
        <SearchForm onSearch={updateWeather} />
        <CurrentWeather 
          location={weatherData.location}
          data={weatherData.daily.DailyForecasts[0]}
        />
        <DailyForecast forecast={weatherData.daily} />
      </LeftColumn>
      <RightColumn>
        <WeatherDetails data={weatherData.current} />
        <HourlyForecast forecast={weatherData.hourly} />
      </RightColumn>
    </WeatherContainer>
  )
}

