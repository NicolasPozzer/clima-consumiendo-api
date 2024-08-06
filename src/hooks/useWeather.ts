import axios from "axios";
import { SearchType, Weather } from "../types";
import { useMemo, useState } from "react";

export default function useWeather() {
    const [weather, setWeather] = useState<Weather>(
        {
            name: '',
            main: {
                temp: 0,
                temp_max: 0,
                temp_min: 0
            }
        }
    );

    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY;

        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
            const { data } = await axios.get(geoUrl);

            if (data.length === 0) {
                console.log("Error: No location data found");
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
            const { data: weatherResult } = await axios.get(weatherUrl);

            if (weatherResult) {
                const simplifiedWeather: Weather = {
                    name: weatherResult.name,
                    main: {
                        temp: weatherResult.main.temp,
                        temp_max: weatherResult.main.temp_max,
                        temp_min: weatherResult.main.temp_min
                    }
                }
                setWeather(simplifiedWeather);
            } else {
                console.log("Error: Weather data is empty");
            }
         
        } catch (error) {
            console.log("Error:", error);
        }
    };

    //funcion para mostrar o no el componente WeatherDetail
    const hasWeatherData = useMemo(() => weather.name, [weather])
    //true o false si tiene algo

    return {
        weather,
        fetchWeather,
        hasWeatherData
    };
}
