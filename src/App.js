import React from 'react'
import {LuSearch} from 'react-icons/lu';
import './style.css';
import {TiWeatherPartlySunny} from 'react-icons/ti'
import {FaTemperatureHigh} from 'react-icons/fa'
import {FaWind,FaCloudRain } from 'react-icons/fa'

import { useState } from 'react';
import axios from 'axios';


const App = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2
  
  })
  const [name, setName] = useState('');

  const handleClick = () => {
    if(name !=="") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2137041d28bfd0c351905ea67384da93&units=metric`;
      axios.get(apiUrl)
      .then(res => {
        setData({...data, celcius: res.data.main.temp, name: res.data.name,
        humidity: res.data.main.humidity, speed: res.data.wind.speed })
        console.log(res.data)
      })
      .catch(err => console.log(err));
    }
  }

  return (
   <>
   <div className='container'>
      <div className='weather'>
        <h1>Clima Para Hoy</h1>
        <div className='search'>
          <input type='text' placeholder='Enter City' onChange={e => setName(e.target.value)} />
          <button><LuSearch size={20} onClick={handleClick} /></button>
        </div>
        <div className='winfo'>
        <TiWeatherPartlySunny size={70} />
        <h1>{Math.round(data.celcius)}</h1>
        <h2>{data.name}</h2>
        <div className='details'>
            <div className='col'>
            <FaTemperatureHigh size={26} />
            <div className='humidity'>
              <p>{Math.round(data.humidity)}%</p>
              <p>Humidity</p>
            </div>
            </div>
            <div className='col'>
            <FaWind size={28}/>
            <div className='wind'>
              <p>{Math.round(data.speed)} Km/h</p>
              <p>Wind</p>
            </div>
            </div>
        </div>
        </div>
      </div>

   </div>
   </>
  )
}

export default App