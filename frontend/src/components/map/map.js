import React, { useEffect } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import {fromLonLat} from 'ol/proj';  
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Overlay from "ol/Overlay";
import truckIcon from "../../images/truck_icon2.png";
import driverIcon from"../../images/driver_icon.png";

function fetchDrivers(){
  return fetch('http://localhost:5000/drivers/drivers',{
    method:"GET"
  })
  .then((response) => response.json())
  .then((data)=> {
    return data;
  });
}

async function getLocationPoints(map) {
  const drivers = await fetchDrivers();

  const vectorSource = new VectorSource();

  drivers.forEach((driver) => {
    const { locationLong, locationLat, driverName, truckID } = driver;
    const coordinates = fromLonLat([locationLong, locationLat]);

    const feature = new Feature(new Point(coordinates));
    feature.setStyle(
      new Style({
        image: new Icon({
          src: truckIcon,
          scale: 0.2
        }),
      })
    );

    const popup = new Overlay({
      element: document.createElement("div"),
      positioning: "bottom-center",
      offset: [0, -15],
    });

    popup.getElement().innerHTML = `<img src= ${driverIcon} alt = "driver picture" width=20 height:auto><strong>${driverName}</strong><br>Truck ID: ${truckID}`;
    popup.getElement().style.background = "#FF8A08";
    popup.getElement().style.padding = "5px";
    popup.getElement().style.borderRadius = "5px";
    popup.getElement().style.boxShadow = "0px 0px 5px rgba(0,0,0,0.3)";

    feature.set("popup", popup);

    vectorSource.addFeature(feature);
    map.addOverlay(popup);
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  map.addLayer(vectorLayer);

  map.on("click", function (event) {
    const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat);
    
    if (feature ) {
      const popup = feature.get("popup");
      if(popup.getPosition())
        popup.setPosition(null);
      else{
        const popup = feature.get("popup");
        popup.setPosition(event.coordinate);
      }
    }
  });
}

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

    getLocationPoints(map);

    return () => {
      map.setTarget(null);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
}

export default MapView;