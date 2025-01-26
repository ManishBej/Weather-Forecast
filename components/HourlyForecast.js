'use client'

import styled from '@emotion/styled'

const Container = styled.div`
  margin-top: 30px;
`

const Title = styled.h3`
  color: #727272;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
`

const HourlyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  padding: 10px;
`

const HourCard = styled.div`
  background: #fbfbfb;
  border: 1px solid #c6c4c6;
  border-radius: 11px;
  padding: 15px;
  text-align: center;
`

const Time = styled.p`
  color: #969696;
  font-size: 1rem;
`

const Temperature = styled.p`
  color: #919191;
  font-size: 1.2rem;
  margin: 10px 0;
`

export default function HourlyForecast({ forecast }) {
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric' })
  }

  return (
    <Container>
      <Title>Hourly Forecast</Title>
      <HourlyGrid>
        {forecast.slice(0, 6).map((hour) => (
          <HourCard key={hour.DateTime}>
            <Time>{formatTime(hour.DateTime)}</Time>
            <Temperature>{Math.round(hour.Temperature.Value)}°</Temperature>
          </HourCard>
        ))}
      </HourlyGrid>
    </Container>
  )
}