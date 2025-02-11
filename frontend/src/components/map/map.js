import React, { useEffect } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import {fromLonLat} from 'ol/proj'; 

function MapView() {
  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([18.0538, 48.3050]),
        zoom: 4.5,
      }),
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
}

export default MapView;