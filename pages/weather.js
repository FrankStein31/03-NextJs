import { useState, useEffect } from 'react';

const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('Malang');
    
    const fetchWeatherData = async (cityName) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/weather?city=${cityName}`);
            
            if (!res.ok) {
                throw new Error('Failed to fetch weather data');
            }
            
            const data = await res.json();
            setWeatherData(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch weather data');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData(city);
    };
    
    return (
        <div>
        <h1>Informasi Cuaca</h1>
        
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Masukkan nama kota"
            />
            <button type="submit">Cari</button>
        </form>
        
        {loading && <p>Loading...</p>}
        
        {error && <p className="error">{error}</p>}
        
        {weatherData && (
            <div className="weather-card">
            <h2>{weatherData.city}, {weatherData.country}</h2>
            <div className="weather-icon">
                <image src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt={weatherData.description} />
            </div>
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="description">{weatherData.description}</p>
            <div className="details">
                <p>Terasa seperti: {weatherData.feels_like}°C</p>
                <p>Kelembaban: {weatherData.humidity}%</p>
                <p>Kecepatan angin: {weatherData.wind_speed} m/s</p>
            </div>
            </div>
        )}
        
        <style jsx>{`
            .weather-card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 20px;
                margin-top: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                max-width: 400px;
            }
            
            .temperature {
                font-size: 2.5rem;
                font-weight: bold;
                margin: 8px 0;
            }
            
            .description {
                text-transform: capitalize;
                margin-bottom: 16px;
            }
            
            .details {
                border-top: 1px solid #eee;
                padding-top: 16px;
            }
            
            .error {
                color: red;
            }
            
            form {
                margin-bottom: 20px;
            }
            
            input {
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                margin-right: 8px;
            }
            
            button {
                padding: 8px 16px;
                background-color: #0070f3;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            
            button:hover {
                background-color: #0051a2;
            }
        `}</style>
        </div>
    );
};

export default WeatherPage;