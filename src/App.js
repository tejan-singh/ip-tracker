import React, { useEffect, useState} from "react";
import Result from "../src/Components/Result";
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function App() {

  const [IPdata, SetIPData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    getIp();
    setLoaded(true);

  }, [query]);

  async function getIp() {
    const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_GEOIPIFY_KEY}&ipAddress=${query}&domain=${query}`);
    const data = await response.json();
    console.log(data);
    SetIPData(data)
  }

  function handleChange(event) {
    setSearch(event.target.value);
    console.log(event.target.value);

  }

  function handleSubmit(event) {
    event.preventDefault();
    setQuery(search);
    setSearch('');

  }

  return (
    loaded ? (
      <div>
        <div className="container-box">

          <div className="input-section">
            <h1 className="header"> IP Address Tracker</h1>

            <form onSubmit={handleSubmit} className="search-form">
              <input className="search-input" type="text" placeholder="Search for any IP address or domain" onChange={handleChange} />
              <button className="search-button" type="submit"> Go! </button>
            </form>

          </div>

          <div className="result-container">

            <Result
              heading={"IP Address"}
              searchResult={IPdata.ip}
            />
          
            <Result
              heading={"Location"}
              searchResult={IPdata?.location?.country}
            />

            <Result
              heading={"Timezone"}
              searchResult={"UTC" + IPdata?.location?.timezone}
            />

            <Result
              heading={"ISP"}
              searchResult={IPdata.isp}
            />

          </div>
          
        </div>

        {IPdata.location && (
          <MapContainer
            center={[IPdata.location.lat, IPdata.location.lng]}
            zoom={13}
            scrollWheelZoom={true}
            key={`${IPdata.location.lat}${IPdata.location.lng}`}

          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[IPdata?.location?.lat, IPdata?.location?.lng]}>
              <Popup>Your IP Location</Popup>
            </Marker>
          </MapContainer>
        )
        }

      </div>) : <p>Loading...</p>

  )

}

export default App;
