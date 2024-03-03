import React, { useEffect, useState } from "react";
import './Flag.css'

export default function Flag() {
    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
                setLoading(false);
            })
            .catch((err) => console.error("error from data:", err))
    }, [])

    useEffect(() => {
        // Filter countries based on search query
        const filtered = countries.filter(country =>
            country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCountries(filtered);
    }, [searchQuery, countries]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search for a country"
                onChange={(event) => setSearchQuery(event.target.value)}
                className="inputFeild"
            />
            <div className="countryCard">
                {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, index) => (
                        <div key={index}>
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
                    ))
                ) : (
                    ""
                )}
            </div>
        </>
    )
}




