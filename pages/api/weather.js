export default async function handler(req, res) {

    const API_KEY = '4607c319a0cc5a7c71e89a055087d2d6';
    const city = req.query.city || 'Malang';
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
    
        if (!response.ok) {
            throw new Error('Gagal');
        }
        
        const data = await response.json();
        
        res.status(200).json({
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            wind_speed: data.wind.speed,
        });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Gagal' });
    }
}