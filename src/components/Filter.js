import "./Filter.css";

function Filter(props) {
  function handleShowFilter() {
    props.setShowFilter((prevState) => !prevState);
  }

  function handleFilter(event) {
    props.filterCountryByRegion(event.target.textContent);
  }

  return (
    <div className="filter-box">
      <div className="filter-head" onClick={handleShowFilter}>
        <p className="filter-text">Filter by Region</p>
        <svg className={`arrow-icon ${props.showFilter ? "rotate" : ""}`}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>chevron-small-down</title>
            <path d="M13.418 7.859c0.271-0.268 0.709-0.268 0.978 0s0.272 0.701 0 0.969l-3.908 3.83c-0.27 0.268-0.707 0.268-0.979 0l-3.908-3.83c-0.27-0.267-0.27-0.701 0-0.969s0.709-0.268 0.978 0l3.421 3.141 3.418-3.141z"></path>
          </svg>
        </svg>
      </div>
      <ul className={`filter-body ${props.showFilter ? "" : "hidden"}`}>
        <li className="region africa" onClick={handleFilter}>
          Africa
        </li>
        <li className="region america" onClick={handleFilter}>
          Americas
        </li>
        <li className="region asia" onClick={handleFilter}>
          Asia
        </li>
        <li className="region europe" onClick={handleFilter}>
          Europe
        </li>
        <li className="region oceania" onClick={handleFilter}>
          Oceania
        </li>
      </ul>
    </div>
  );
}

export default Filter;
