'use client'

import styled from '@emotion/styled'

const ForecastContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  overflow-x: auto;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ForecastCard = styled.div`
  flex: 1;
  background: #fefefe;
  border-radius: 11px;
  padding: 20px;
  text-align: center;
  border: 1px solid #cbc9cd;
  min-width: 120px;
`

const DayName = styled.p`
  color: #888;
  font-size: 1rem;
`

const Temperature = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 5px;
  margin: 10px 0;
`

const HighTemp = styled.span`
  color: #8d8d8d;
  font-size: 1.5rem;
`

const LowTemp = styled.span`
  color: #989898;
  font-size: 0.8rem;
`

const Description = styled.p`
  color: #818181;
  font-size: 0.9rem;
`

export default function DailyForecast({ forecast }) {
  const getDayName = (dateString, index) => {
    if (index === 0) return 'Today'
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' })
  }

  return (
    <ForecastContainer>
      {forecast.DailyForecasts.map((day, index) => (
        <ForecastCard key={day.Date}>
          <DayName>{getDayName(day.Date, index)}</DayName>
          <Temperature>
            <HighTemp>{Math.round(day.Temperature.Maximum.Value)}°</HighTemp>
            <LowTemp>{Math.round(day.Temperature.Minimum.Value)}°</LowTemp>
          </Temperature>
          <Description>{day.Day.IconPhrase}</Description>
        </ForecastCard>
      ))}
    </ForecastContainer>
  )
}