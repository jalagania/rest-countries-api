import "./CountryDetails.css";
import spinner from "../images/loading-spinner.gif";

function CountryDetails(props) {
  function handleButtonBack() {
    props.setCountryPageList((prevState) => prevState.slice(0, -1));
  }

  function handleBorderCountry(event) {
    if (event.target.textContent !== "N/A") {
      props.setCountryPageList((prevState) => [
        ...prevState,
        event.target.textContent,
      ]);
    }
  }

  return (
    <div className="country-details">
      <button className="btn-back" onClick={handleButtonBack}>
        <svg
          className="arrow-left"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>arrow-left</title>
          <path d="M3.828 9l6.071-6.071-1.414-1.414-8.485 8.485 8.485 8.485 1.414-1.414-6.071-6.071h16.172v-2h-16.172z"></path>
        </svg>
        <span>Back</span>
      </button>
      {props.isLoading && <img src={spinner} className="loading-spinner" />}
      {!props.isLoading && (
        <div className="info-box">
          <img
            src={props.countryInfo[0].flags.svg}
            alt="country flag"
            className="flag-large"
          />
          <div className="details-box">
            <p className="details_country-name">
              {props.countryInfo[0].name.common}
            </p>
            <div className="detailed-info">
              <div className="info_left-box">
                <p className="native-name">
                  Native Name:{" "}
                  <span>
                    {
                      Object.values(props.countryInfo[0].name.nativeName)[0]
                        .common
                    }
                  </span>
                </p>
                <p className="population">
                  Population:{" "}
                  <span>
                    {props.countryInfo[0].population.toLocaleString()}
                  </span>
                </p>
                <p className="the-region">
                  Region: <span>{props.countryInfo[0].region}</span>
                </p>
                <p className="sub-region">
                  Sub Region: <span>{props.countryInfo[0].subregion}</span>
                </p>
                <p className="capital">
                  Capital: <span>{props.countryInfo[0].capital}</span>
                </p>
              </div>
              <div className="right-box">
                <p className="domain">
                  Top Level Domain: <span>{props.countryInfo[0].tld[0]}</span>
                </p>
                <p className="currencies">
                  Currencies:{" "}
                  <span>{Object.keys(props.countryInfo[0].currencies)[0]}</span>
                </p>
                <p className="languages">
                  Languages:{" "}
                  <span>
                    {Object.values(props.countryInfo[0].languages)
                      .reduce((sum, language) => sum + language + " ", "")
                      .trim()
                      .split(" ")
                      .join(", ")}
                  </span>
                </p>
              </div>
            </div>
            <div className="borders-box">
              <p className="borders">Border Countries:</p>
              {props.borderCountries.map((country, index) => {
                return (
                  <span
                    className="border-country"
                    key={index}
                    onClick={handleBorderCountry}
                  >
                    {country}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
