import { useState, useEffect } from 'react'

import './App.css'
import About from './Componets/About'
import Navbar from './Componets/Navbar'
import Shop from './Componets/Shop'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Homepage from './Componets/Homepage'
import Linegraph from './Covid19Tracker/Linegraph'
import CoronaSummary from './Covid19Tracker/CoronaSummary'
import axios from 'axios'




function App() {
  const [totalconformed, settotalconformed] = useState(0);
  const [totalRecoverd, settotalRecoverd] = useState(0);
  const [totalDeaths, settotalDeaths] = useState(0);
  const [loading, setloading] = useState(false);
  const [Covid19summary, setCovid19summary] = useState({});
  const [country, setcountry] = useState('');
  const [days, setdays] = useState(0);
  const [coronaviruscounter, setcoronaviruscounter] = useState([])
  const [label,setlabel]= useState([])


  useEffect(() => {
    setloading(true);
    axios.get(`https://api.covid19api.com/summary`)
      .then(res => {
        setloading(false);
        console.log(res)

        if (res.status === 200) {
          settotalconformed(res.data.Global.TotalConfirmed);
          settotalRecoverd(res.data.Global.TotalRecovered);
          settotalDeaths(res.data.Global.TotalDeaths);
          setCovid19summary(res.data)
        }

      }).catch(error => {
        console.log(error)
      })

  }, [])

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    // const month = ` 0${d.getMonth()+1} `.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;

  }

  const CountryHandler = (e) => {
    setcountry(e.target.value);
    const date = new Date();
    const to = formatDate(date);
    const from = formatDate(date.setDate(date.getDate() - days));
    // const from = formatDate(date.setDate(date.getDate() - 7));
  
    getcoronavirusupdatedaily(e.target.value, from, to)
  }
  
  const daysHandler = (e) => {
    setdays(e.target.value)
    const date = new Date();
    const to = formatDate(date);
    const from = formatDate(date.setDate(date.getDate() - e.target.value));
    
    getcoronavirusupdatedaily(country, from, to)
  }

  const getcoronavirusupdatedaily = (countryslug, from, to) => {
    // axios.get(`/country/${countryslug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    axios.get(`https://api.covid19api.com/country/${countryslug}?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
      .then(result => {
        console.log(result)
        const yAxies =  result.data.map(d =>d.Active)
        const xAxies =  result.data.map(d => d.Date)
        console.log(yAxies);
        setcoronaviruscounter(yAxies);
        setlabel(xAxies);

        const covidDetails = Covid19summary.Countries.find(country =>country.Slug === countryslug)
        settotalconformed(covidDetails.TotalConfirmed);
        settotalRecoverd(covidDetails.TotalRecovered);
        settotalDeaths(covidDetails.TotalDeaths);
        
      })
      .catch(error => {
        console.log(error)
      })

  }


  if (loading) {
    return <p>Fetching Data from Server.....!</p>
  }

  return (

    <div className="App">


      <CoronaSummary
        TotalConformed={totalconformed}
        TotalRecoverd={totalRecoverd}
        TotalDeaths={totalDeaths}
        // Country={'Pakistan'}
        Country={country}
      />

      <div className="SelectMenu">
        <select value={country} onChange={CountryHandler}>
          <option value="">Select Country</option>
          {
            Covid19summary.Countries && Covid19summary.Countries.map(country => {
              return <option key={country.Slug} value={country.Slug}>{country.Country}</option>
            })
          }
        </select>

        <select value={days} onChange={daysHandler}>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <Linegraph 
      GraphYAxies={coronaviruscounter}
      xAxies={label}
      />
    </div>
  )
}

export default App
