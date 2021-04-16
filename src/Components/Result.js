import React from "react";

function Result(props){
    return(
        <div className="results">
        <p className="result-heading">{props.heading}</p>
        <h2 className="search-results">{props.searchResult}</h2>
      </div>
    )
}

export default Result;