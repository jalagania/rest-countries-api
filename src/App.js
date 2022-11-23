import { useState, useEffect } from "react";
import "./App.css";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Search from "./components/Search";
import Attribution from "./components/Attribution";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [themeText, setThemeText] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [countryInfo, setCountryInfo] = useState(1);
  const [showCountryPage, setShowCountryPage] = useState(false);
  const [borderCountries, setBorderCountries] = useState([]);
  const [countryPageList, setCountryPageList] = useState([]);

  // ---------- Functions ----------

  // Displays All Countries
  async function displayCountries() {
    setError(false);
    setIsLoading(true);
    setShowCountryPage(false);
    setCountries([]);
    setCountryInfo([]);
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();

    setIsLoading(false);
    setCountries(data);
  }

  // Searches Country by Name
  async function searchCountryByName(name) {
    setCountries([]);
    setError(false);
    setIsLoading(true);
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);

    setIsLoading(false);
    const data = await response.json();
    if (data.status === 404) {
      setError(true);
      return;
    }
    setError(false);
    setCountries(data);
  }

  // Filters Countries by Region
  async function filterCountryByRegion(region) {
    setCountries([]);
    setError(false);
    setIsLoading(true);
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    const data = await response.json();

    setIsLoading(false);
    setCountries(data);
  }

  // Gets Country Details
  async function getCountryInfo(name) {
    setShowCountryPage(true);
    setIsLoading(true);
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    let data = await response.json();

    if (data.length > 1) {
      data = data.filter(
        (country) => name.toLowerCase() === country.name.common.toLowerCase()
      );
    }

    setCountryInfo(data);
    getBorderCountries(data[0].borders);
  }

  // Gets Border Countries by Code
  async function getBorderCountries(codeArray = []) {
    const borders = [];
    for (let code of codeArray) {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${code}`
      );
      const data = await response.json();
      borders.push(data[0].name.common);
    }
    setIsLoading(false);
    setBorderCountries(borders.length === 0 ? ["N/A"] : borders);
  }

  // ---------- useEffects ----------

  useEffect(() => {
    displayCountries();

    document.addEventListener("click", function (event) {
      if (
        !event.target.closest(".filter-body") &&
        !event.target.closest(".filter-head")
      ) {
        setShowFilter(false);
      }
    });
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
    setThemeText(darkMode ? "Light Mode" : "Dark Mode");
  }, [darkMode]);

  useEffect(() => {
    if (countryPageList.length === 0) {
      setShowCountryPage(false);
      return;
    }
    getCountryInfo(countryPageList.slice(-1)[0]);
  }, [countryPageList]);

  return (
    <div>
      <Header
        darkMode={darkMode}
        themeText={themeText}
        setDarkMode={setDarkMode}
        displayCountries={displayCountries}
        setCountryPageList={setCountryPageList}
      />

      {showCountryPage && (
        <CountryDetails
          countryInfo={countryInfo}
          isLoading={isLoading}
          borderCountries={borderCountries}
          countryPageList={countryPageList}
          setCountryPageList={setCountryPageList}
        />
      )}
      {!showCountryPage && (
        <main>
          <nav>
            <Search searchCountryByName={searchCountryByName} />
            <Filter
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              filterCountryByRegion={filterCountryByRegion}
            />
          </nav>
          <Countries
            isLoading={isLoading}
            countries={countries}
            error={error}
            setCountryPageList={setCountryPageList}
          />
        </main>
      )}
      <Attribution />
    </div>
  );
}

export default App;
