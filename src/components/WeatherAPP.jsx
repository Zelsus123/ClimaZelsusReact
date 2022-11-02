import { useEffect, useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherMainInfo from "./WeatherMainInfo";
import styles from "./weatherApp.module.css"
import Loading from './Loading'


export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  
  useEffect(()=> {
    loadInfo();
  }, []);

  useEffect(()=>{
    document.title = `Clima | ${weather?.location.name ?? ""}`;
  }, [weather] )

  async function loadInfo(city = "london") {
    try {
      const request = await fetch(`${import.meta.env.VITE_APP_URL}&key=${import.meta.env.VITE_APP_KEY}&q=${city}`);

      const json = await request.json();
      setTimeout(()=>{
        setWeather(json);
      }, 2000);
      
         } catch (error) {console.error(error)}
  }
  function handleChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleChangeCity} />
      {weather ?  <WeatherMainInfo weather={weather}/> : <Loading />}
      
    </div>
  );
}
