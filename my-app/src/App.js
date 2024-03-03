import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error to Fetch the data", error));
  }, []);
  return (
<div className="App">
      <input
        type="text"
        placeholder="Search for Countries"
        className="search-bar"
        onChange={handleSearch}
        value={search}
      />
      <div className="card-container">
        {countries.map((items) => {
         const countryName = items.name.common.toLowerCase();
          const searchName = search.toLowerCase();
            if(!countryName.includes(searchName) && searchName ){
              return null;
            }
return (
          <div key={items.cca3} className="countryCard">
            <img
              src={items.flags.png}
              alt={items.name.common}
              className="flag"
            />
            <h2>{items.name.common}</h2>
          </div>
            )
            })}

      </div>
    </div>
  );
}

export default App;




