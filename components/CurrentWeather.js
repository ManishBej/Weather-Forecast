'use client'

import styled from '@emotion/styled'

const WeatherHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`

const Location = styled.h2`
  font-size: 2rem;
  color: #525252;
`

const DateTime = styled.div`
  display: flex;
  gap: 20px;
  color: #525252;
`

const Temperature = styled.p`
  font-size: 3rem;
  color: #525252;
  margin: 20px 0;
`

const Condition = styled.p`
  color: #525252;
  font-size: 1.5em;
`

export default function CurrentWeather({ location, data }) {
  if (!data) return null

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
  }

  const formatTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    })
  }

  return (
    <>
      <WeatherHeader>
        <Location>{location}</Location>
        <DateTime>
          <time>{formatDate(new Date())}</time>
          <time>{formatTime()}</time>
        </DateTime>
      </WeatherHeader>
      <Temperature>{Math.round(data.Temperature?.Metric?.Value || 0)}°C</Temperature>
      <Condition>{data.WeatherText}</Condition>
    </>
  )
}