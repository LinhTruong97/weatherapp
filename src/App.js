import React, { useState, useEffect } from 'react'
import "./App.css";

const api = {
  key: "9a27de966f30b0ff1472dff3fb3ed2fc",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeatherDate = async () => {
      if (!searchCity) return;
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {

          setWeatherInfo(
            <div className="weather-info">
              City: {data.name}<br />
              Country: {data.sys.country}<br />
              Weather: {data.weather[0].description}<br />
              Temparature: {data.main.temp}
            </div>

          );
          setErrorMessage("")
        } else {
          setErrorMessage(data.message)
        }

      } catch (error) {
        setErrorMessage(error.message)
      }
      setLoading(false);
    }
    fetchWeatherDate();
  }, [searchCity])

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  }
  return (
    <div className="container">
      <h2 className="title">Weather App</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="button">Search</button>
      </form>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div className="error-message">{errorMessage.toUpperCase()}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}

    </div>
  )
}

export default App
