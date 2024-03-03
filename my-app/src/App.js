import React, { useEffect, useState } from "react";
import './Flag.css'

export default function Flag() {
    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
            })
            .catch((err) => console.error("error from data:", err))
    }, [])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery)
    );
    console.log(filteredCountries)

    return (
        <>
            <input
                type="text"
                placeholder="Search for a country"
                onChange={handleSearch}
                className="inputFeild"
            />
            <div className="countryCard">
                {filteredCountries.map((country) => (
                    <div key={country.cca3}>
                        {country.flags && country.flags.png &&
                            <img
                                src={country.flags.png}
                                alt={`Flag of ${country.name.common}`}
                             />
                        }
                        {country.name &&
                            <h2>{country.name.common}</h2>
                        }
                    </div>
                ))}
            </div>
        </>
    )
}




