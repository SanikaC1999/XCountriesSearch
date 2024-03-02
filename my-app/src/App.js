import React, { useEffect, useState } from "react";
import styles from './Flag.module.css'

export default function Flag (){
    const [countries,setCountries] = useState([]);

    useEffect(()=>{
        fetch("https://restcountries.com/v3.1/all")
        .then((res)=>res.json())
        .then((data)=>setCountries(data))
        .catch((err)=>console.error("error from data:",err))
    },[])

    const handleSearch = (event) => {
      const searchValue = event.target.value.toLowerCase();
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchValue)
      );
      setCountries(filteredCountries);
    };
    

    return (
      <>
        <input
        type="text"
        placeholder="Search for a country"
        onChange={handleSearch}
      />
        <div className={styles.main}>
    {countries.map((country) => (
        <div key={country.cca3} className={styles.wrapper}>
            <img 
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className={styles.imgFlag} />
            <h2 className={styles.heading}>{country.name.common}</h2>    
        </div>
    ))}
        </div>
        </>
    )
}
