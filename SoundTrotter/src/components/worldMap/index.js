import React from "react";
import { VectorMap } from "react-jvectormap";

// countries lattitude and longitude values, in order to place marker.
import * as JSONcountries from "../../initialisation/countrylatlng.json"; //from https://github.com/eesur/country-codes-lat-long




function Map({ mapData, onClickEventHandler, countryToMark }) {
  //TODO: edit it so there is a marker that marks where the current song playing is from.

  // In order to initialize size to fit different screen sizes, we need to know how tall the screen is in px as the map doesnt support % scaling.
  var maxHeight = window.innerHeight - 150;
  var maxWidth = "100%";

  function getMarkerObject(countryCode) {
    var marker;

    if (countryCode === "" || countryCode == null) {
      //return nothing
      return;
    }

    //search through the JSON and construct an appropriate object
    JSONcountries.default.forEach((country) => {
      if (country.alpha2 === countryCode) {
        marker = {
          latLng: [country.latitude, country.longitude],
          name: countryCode,
        };
      }
    });

    return marker;
  }

  //var marker = [getMarkerObject(countryToMark)];
  var marker = [];

  var selectedCountry = {};
  selectedCountry[countryToMark] = 'blue';

  return (
    <div>
      <VectorMap
        map={"world_mill"}
        backgroundColor="transparent"
        zoomOnScroll={true}
        containerStyle={{
          width: maxWidth,
          height: maxHeight, //700px works
        }}
        onRegionClick={onClickEventHandler} //gets the country code
        containerClassName="map"
        markerStyle={{
          initial: {
            fill: "#F8E23B",
            stroke: "#383f47",
            r: 10
          },
        }}
        markers={marker}
        regionStyle={{
          initial: {
            fill: "white",
            "fill-opacity": 1,
            stroke: "black",
            "stroke-width": 1,
            "stroke-opacity": 1,
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
          },
          selected: {
            //fill: "#2938bc" //color for the clicked country
            //no style as the map is glitchy lol.
          },
          selectedHover: {},
        }}
        regionsSelectable={true}
        regionsSelectableOne={true}
        series={{
          regions: [
            {
              values: mapData,
              scale: {
                yes: "#68f088",
                no: "#ffffff"
              },
              attribute: 'fill',
            },
            {
              scale: {
                blue: "#2938bc",
                green: '#00ff00'
              },
              attribute: 'fill',
              values: selectedCountry
            }
          ],
        }}
      />
    </div>
  );
}

export default Map;
