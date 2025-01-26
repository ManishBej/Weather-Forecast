'use client'

import styled from '@emotion/styled'

const Container = styled.div`
  padding: 20px;
`

const Greeting = styled.h1`
  color: #535353;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
`

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
  color: #808080;
  font-size: 1.2rem;

  i {
    width: 30px;
    text-align: center;
  }
`

const WeatherDetails = ({ data }) => {
  if (!data) {
    return <div>Loading weather details...</div>;
  }

  console.log('Weather Data:', data);

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  // Safely access nested properties
  const windSpeed = data?.Wind?.Speed?.Metric?.Value || 0;
  const windUnit = data?.Wind?.Speed?.Metric?.Unit || 'km/h';
  const humidity = data?.RelativeHumidity || 0;
  const feelsLike = data?.RealFeelTemperature?.Metric?.Value || 0;

  return (
    <Container>
      <Greeting>{getGreeting()}</Greeting>
      <DetailRow>
        <i className="fa-solid fa-wind"></i>
        <span>{`${windSpeed} ${windUnit}`}</span>
      </DetailRow>
      <DetailRow>
        <i className="fa-solid fa-droplet"></i>
        <span>{`${humidity}%`}</span>
      </DetailRow>
      <DetailRow>
        <i className="fa-solid fa-temperature-half"></i>
        <span>{`Feels like ${feelsLike}°`}</span>
      </DetailRow>
    </Container>
  );
};

export default WeatherDetails;