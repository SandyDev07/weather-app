"use client";
import Daycard from "@/component/Daycard";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef();

  const allIcons = {
    "01d": "https://openweathermap.org/img/wn/01d@2x.png",
    "01n": "https://openweathermap.org/img/wn/01n@2x.png",
    "02d": "https://openweathermap.org/img/wn/02d@2x.png",
    "02n": "https://openweathermap.org/img/wn/02n@2x.png",
    "03d": "https://openweathermap.org/img/wn/03d@2x.png",
    "04d": "https://openweathermap.org/img/wn/04d@2x.png",
    "09d": "https://openweathermap.org/img/wn/09d@2x.png",
    "10d": "https://openweathermap.org/img/wn/10d@2x.png",
    "11d": "https://openweathermap.org/img/wn/11d@2x.png",
    "13d": "https://openweathermap.org/img/wn/13d@2x.png",
  };

  const search = async (city) => {
    if (!city) {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Process data to get a 4-day forecast
      const dailyForecast = data.list
        .filter((item) => item.dt_txt.includes("12:00:00")) // Pick midday data
        .slice(0, 4)
        .map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",
          }),
          temp: Math.floor(item.main.temp - 273.15),
          icon: allIcons[item.weather[0]?.icon] || allIcons["01d"],
          description: item.weather[0]?.description,
        }));

      const currentWeather = data.list[0];

      setWeatherData({
        location: data.city.name,
        temperature: Math.floor(currentWeather.main.temp - 273.15),
        humidity: currentWeather.main.humidity,
        windSpeed: currentWeather.wind.speed,
        icon: allIcons[currentWeather.weather[0]?.icon] || allIcons["01d"],
        forecast: dailyForecast,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="main-div flex items-center justify-center h-screen">
        <div className="inner-div text-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter city name"
            className="bg-white w-[380px] p-[10px] rounded-[25px] outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-[125px] p-[10px] rounded-[25px] shadow-md ml-5"
            onClick={() => search(inputRef.current.value)}
          >
            Search
          </button>

          <div className="flex items-center justify-center p-5">
            {weatherData?.icon && (
              <Image
                src={weatherData.icon}
                width={100}
                height={100}
                alt="Weather Icon"
              />
            )}
          </div>

          <h3 className="text-4xl font-bold dark:text-white">
            {weatherData?.temperature}&deg;C, {weatherData?.location}
          </h3>

          <p className="mb-3 text-gray-800 dark:text-gray-400 text-lg  italic">
            {currentDate}
          </p>

          <div className="flex items-center justify-center gap-50 font-bold">
            <p>
              {weatherData?.windSpeed} Km/hr
              <br />
              <span>Wind Speed</span>
            </p>
            <p>
              {weatherData?.humidity}% <br /> Humidity{" "}
            </p>
          </div>

          <h4 className="text-xl font-bold dark:text-white p-[10px]">
            4 Day Forecast:
          </h4>

          <div className="flex grid-cols-4 gap-5">
            {weatherData?.forecast?.map((day, index) => (
              <Daycard
                key={index}
                date={day.date}
                icon={day.icon}
                temp={day.temp}
                description={day.description}
              />
            ))}
          </div>
        </div>
      </div>
      <button className="bg-amber-200 border-2 p-4 absolute bottom-0 right-0">
        Contact us
      </button>
    </div>
  );
}
