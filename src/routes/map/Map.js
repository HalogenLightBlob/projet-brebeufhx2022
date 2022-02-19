import React, { useRef, useEffect, useState, createElement } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2VmcXJuIiwiYSI6ImNrenRibnJheTMwcXYycHFvOHFlcmx6bngifQ.BU5G4Dd1DtDo4AbvuKjnQg";
const resource =
  "http://brebeufhx5website.pythonanywhere.com/getIndicatorsByCountry";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [countryName, setCountryName] = useState("No country");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    let hoveredCountryId = null;
    let selectedCountryId = null;

    map.current.on("load", () => {
      // Find the index of the first symbol layer in the map style.
      // Use it to keep the country labels above the layers
      let firstSymbolId;
      for (const layer of map.current.getStyle().layers) {
        if (layer.type === "symbol") {
          firstSymbolId = layer.id;
          break;
        }
      }

      map.current.addSource("countries", {
        //
        type: "geojson",
        generateId: true,
        data: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries_lakes.geojson", //"https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries_lakes.geojson"
      });

      map.current.addLayer(
        {
          id: "country-fills",
          type: "fill",
          source: "countries",
          layout: {},
          paint: {
            "fill-antialias": false,
            "fill-color": "#FFFFFF",
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "select"], false],
              1,
              ["boolean", ["feature-state", "hover"], false],
              0.5,
              0.1,
            ],
          },
        },
        firstSymbolId
      );

      map.current.on("mousemove", "country-fills", (e) => {
        if (e.features.length > 0) {
          if (hoveredCountryId !== null) {
            // Set previous hover to false
            map.current.setFeatureState(
              { source: "countries", id: hoveredCountryId },
              { hover: false }
            );
          }
          hoveredCountryId = e.features[0].id;
          map.current.setFeatureState(
            { source: "countries", id: hoveredCountryId },
            { hover: true }
          );
        }
      });

      map.current.on("click", "country-fills", (e) => {
        if (e.features.length > 0) {
          if (selectedCountryId !== null) {
            // Set previous select to false
            map.current.setFeatureState(
              { source: "countries", id: selectedCountryId },
              { select: false }
            );
          }
          selectedCountryId = e.features[0].id;
          map.current.setFeatureState(
            { source: "countries", id: selectedCountryId },
            { select: true }
          );

          setCountryName(e.features[0].properties.admin);
          updateCountryData(e.features[0].properties.iso_a3);
        }
      });
    });
  });

  async function updateCountryData(countryCode) {
    setCountryInfo({ "Fetching info": " " });
    fetch(resource, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: countryCode }),
    })
      .then((response) =>
        response.json().catch((_) => {
          return { "Couldn't fetch data": " " };
        })
      )
      .then((data) => setCountryInfo(data))
      .catch((err) => {
        console.log(err);
        setCountryInfo({ "Couldn't fetch data": " " });
      });
  }

  return (
    <div>
      <div className="country-data">
        <div className="country-name">{countryName}</div>
        {Object.keys(countryInfo).map((info) => (
          <div key={info} className="country-info">
            <div className="country-info-name">{info}:</div>
            <div className="country-info-value">{countryInfo[info]}</div>
          </div>
        ))}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Map;
