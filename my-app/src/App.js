import './App.css';

import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase())
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
      <div className="App">
        {countries.map((country) => (
          <div className="countrys" key={country.name}>
            <img src={country.flags.png} alt={country.name} />
            <h6>{country.name}</h6>
          </div>
        ))}
      </div>
    </>
  );
}
