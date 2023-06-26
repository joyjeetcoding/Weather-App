import React, { useState } from "react";
import axios from "axios";
import Weather2 from "./assets/Weather2.jpg";
import Weather3 from "./assets/Weather3.jpg";

// API Key
// const APIKey = 'f4fcc118e3fb61e68fca2c8a95df9e90';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f4fcc118e3fb61e68fca2c8a95df9e90`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="App w-full h-screen  relative font-writing">
      <div className="text-white bg-image fixed -z-[1] top-0 right-0 left-0 bottom-0">
        <img
          src={Weather2}
          className="bg-cover w-full h-full md:hidden"
          alt="/"
        />
        <img
          src={Weather3}
          className="bg-cover w-full h-full hidden md:block"
          alt="/"
        />
      </div>
      <div className="bg-black absolute top-0 right-0 left-0 bottom-0 opacity-[0.3]"></div>
      <div className="search text-center p-4 absolute z-[9999] left-0 top-0 right-0 bottom-0">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
          className="py-3 px-6 rounded-3xl border-4 border-opacity-[0.2] bg-slate-300 bg-opacity-[0.2] text-white placeholder-white outline-none"
        />
      </div>
      <div className="container absolute top-0 right-0 left-0 bottom-0 max-w-3xl text-white min-h-screen p-8 flex flex-col justify-between mx-auto">
        <div className="top mt-12">
          <div className="location">
            <p className="text-4xl">{data.name}</p>
            <div className="temp">
              {data.main ? (
                <h1 className="text-8xl font-bold">{data.main.temp.toFixed()}°F</h1>
              ) : null}
            </div>
            <div className="description">
              {data.weather ? (
                <p className="text-2xl">{data.weather[0].description}</p>
              ) : null}
            </div>
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom text-lg sm:text-xl flex justify-evenly text-center w-full my-4 rounded-xl bg-slate-300 bg-opacity-[0.2] py-3">
            <div className="feels">
              {data.main ? <p>{data.main.feels_like}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              <div className="humidity">
                {data.wind ? <p>{data.wind.speed}MPH</p> : null}{" "}
              </div>
              <p>Wind</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
