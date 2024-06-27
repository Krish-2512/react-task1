
import './App.css';

import React, { useState,useEffect } from 'react'
import axios from 'axios'

import Clock from "react-clock";


import 'react-clock/dist/Clock.css';




const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('');
  const [icon, setIcon] =useState('');
  const [error, setError] = useState('');
  
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);



 

  





  useEffect(() => {
    if (data.weather && data.weather.length > 0) {
      switch (data.weather[0].main) {
        case "Haze":
          setIcon("./icons/sun.png   ");
          break;
        case "Clouds":
          setIcon("./icons/clouds.png");
          break;
        case "Rain":
          setIcon("./icons/raining.png");
          break;
        case "Snow":
          setIcon("./icons/clouds.png");
          break;
        case "Dust":
          setIcon("./icons/cloudy.png");
          break;
        case "Drizzle":
        case "Fog":
        case "Smoke":
          setIcon("./icons/cloudy.png");
          break;
        default:
          setIcon("./icons/sun.png");
      }
    }
  }, [data]);

        
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        setError('')
        console.log(response.data)
      })
      .catch((error)=>{
        setError('Sorry, city not found')
        
      });
      setLocation('')
    }
  }

  

  

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container" >
        <div className="top">
        <div className="date-time">
              <div className="dmy">
                
                <div className="current-time">
                  <Clock value={value} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              </div>
              




          <div className="location">
            <p>{data.name}</p>
            

            
           
          </div>
          <div className="location">
            <p>{data.sys? <p>{data.sys.country}</p> :null}</p>
            

            
           
          </div>



         
          <div className="temp">
            {data.main ? <h1>{Math.floor((data.main.temp.toFixed()-32)*5/9)}°C</h1> : null}
          </div>

          

          <div className="temp" id="temp-F">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          
          <div className="description"id='obj'>
            {data.weather ? <h3><span style={{color:'blue'}}>Weather</span> - {data.weather[0].main} </h3> : null}
          </div>
          



          










        </div>

        {data.name !== undefined &&
          <div className="bottom">
             <div className="icons">
            {data.weather ? <img style={{height:'50px',width:'50px'}}  src={icon} /> : null}
          </div>
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p style={{fontWeight:'bold'}}>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p style={{fontWeight:'bold'}}>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p style={{fontWeight:'bold'}}>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
} 






  

export default App;