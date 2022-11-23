import "./Country.css";

function Country(props) {
  return (
    !props.isLoading &&
    props.countries.map((country, index) => {
      return (
        <div
          className="country"
          key={index}
          onClick={() => {
            props.setCountryPageList((prevState) => [
              ...prevState,
              country.name.common,
            ]);
          }}
        >
          <img
            src={country.flags.svg}
            alt="country flag"
            className="country-flag"
          />
          <div className="country-body">
            <p className="country-name">{country.name.common}</p>
            <p className="country-population">
              Population:{" "}
              <span className="population-number">
                {country.population.toLocaleString()}
              </span>
            </p>
            <p className="country-region">
              Region: <span className="region-name">{country.region}</span>
            </p>
            <p className="country-capital">
              Capital: <span className="capital-city">{country.capital}</span>
            </p>
          </div>
        </div>
      );
    })
  );
}

export default Country;
