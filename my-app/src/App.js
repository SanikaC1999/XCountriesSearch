import React, { useEffect, useState } from "react";
import styles from './Flag.module.css'

export default function Flag() {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
                setFilteredCountries(data);
            })
            .catch((err) => console.error("error from data:", err))
    }, [])

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredCountries = countries.filter((country) =>
            country.name.common.toLowerCase().includes(searchValue)
        );
        setFilteredCountries(filteredCountries);
    };

    return (
        <>
            <input
                type="text"
                placeholder="Search for a country"
                onChange={handleSearch}
            />
            <div className={styles.countryCard}>
                {filteredCountries.map((country) => (
                    <div key={country.cca3} className={styles.wrapper}>
                        {country.flags && country.flags.png &&
                            <img
                                src={country.flags.png}
                                alt={`Flag of ${country.name.common}`}
                                className={styles.imgFlag} />
                        }
                        {country.name &&
                            <h2 className={styles.heading}>{country.name.common}</h2>
                        }
                    </div>
                ))}
            </div>
        </>
    )
}
