import "./Countries.css";
import Country from "./Country";
import spinner from "../images/loading-spinner.gif";

function Countries(props) {
  return (
    <div>
      {props.isLoading && <img src={spinner} className="loading-spinner" />}
      <div className="countries-box">
        {
          <Country
            countries={props.countries}
            setCountryPageList={props.setCountryPageList}
          />
        }
      </div>
      <div className="search-output"></div>
      {props.error && <p className="error">Country Not Found</p>}
    </div>
  );
}

export default Countries;
