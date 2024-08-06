import { Weather } from "../../types"


type WeatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({weather} : WeatherDetailProps) {
  return (
    <div>
        <h2>clima de {weather.name}</h2>
        <h2>temperatura actual: {weather.main.temp}</h2>
        <h2>temperatura max: {weather.main.temp_max}</h2>
        <h2>temperatura min: {weather.main.temp_min}</h2>
    </div>
  )
}
