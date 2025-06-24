'use client'
import { WeatherForm } from "@/components/weather-form";
import React, {useState} from 'react'

export default function Home() {

  const [weatherId, setWeatherId] = useState('')
  const [weatherData, setWeatherData] = useState<any | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchWeather = async() => {
    setLoading(true)
    setError('')
    setWeatherData(null)

    try {
      const res = await fetch(`http://localhost:8000/weather/${weatherId}`)
      if (!res.ok) throw new Error('Weather data not found')
      const data = await res.json()
      setWeatherData(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Weather System
          </h1>
          <p className="text-muted-foreground text-lg">
            Submit weather requests and retrieve stored results
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Weather Form Section */}
          <div className="flex flex-col items-center justify-start">
            <h2 className="text-2xl font-semibold mb-4">
              Submit Weather Request
            </h2>
            <WeatherForm />
          </div>
        {/* Data Lookup Section */}
          <div className="flex flex-col items-center justify-start">
            <h2 className="text-2xl font-semibold mb-4">Lookup Weather Data</h2>
            <div className="w-full border rounded-lg p-6 shadow-sm">
              <input
                type="text"
                placeholder="Enter Weather ID"
                value={weatherId}
                onChange={(e) => setWeatherId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              />
              <button
                onClick={fetchWeather}
                disabled={loading || !weatherId}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Fetching..." : "Get Weather"}
              </button>

              {error && <p className="text-red-600 mt-4">{error}</p>}

              {weatherData && (
                <div className="mt-4 bg-gray-800 border border-gray-700 text-white p-4 rounded w-full">
                  <p><strong>Date:</strong> {weatherData.date}</p>
                  <p><strong>Location:</strong> {weatherData.location}</p>
                  <p><strong>Notes:</strong> {weatherData.notes || "None"}</p>
                  <p><strong>Weather:</strong> {weatherData.weather?.current?.weather_descriptions?.[0]}</p>
                  <p><strong>Temperature:</strong> {weatherData.weather?.current?.temperature} °C</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
