import React, { useEffect, useState } from "react";
import styles from './Flag.module.css'

export default function Flag() {
    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); 
    const newVar = false

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
                setLoading(false); 
            })
            .catch((err) => console.error("error from data:", err))
    }, [])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery)
    );

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search for a country"
                onChange={handleSearch}
                className={styles.inputFeild}
            />
            <div className={styles.countryCard}>
                {filteredCountries.map((country) => (
                    <div key={country.cca3} className={styles.countryCard}>
                        {country.flags && country.flags.png &&
                            <img
                                src={country.flags.png}
                                alt={`Flag of ${country.name.common}`}
                                className={styles.countryCard} />
                        }
                        {country.name &&
                            <h2 className={styles.countryCard}>{country.name.common}</h2>
                        }
                    </div>
                ))}
            </div>
        </>
    )
}


