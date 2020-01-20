import React, {useState } from 'react';
import './App.css';
import MapGL, { Source, Layer } from 'react-map-gl';
import { bayAreaHexes, bayAreaHexesBoundaries, brazilHexesBoundaries, brazilHexMap } from './h3Examples';
// import * as turf from '@turf/turf';
// import * as h3 from 'h3-js';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtYXJ0c2MiLCJhIjoiY2o4bjd4aG40MTZudTJ3bXo5aDU3dmFpMSJ9.O72JlexJ3-xy030RqsoSgA'; // Set your mapbox token here

function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });
  // console.log('checking turf result', h3.polyfill(turf.bboxPolygon([-73.9872354804, -33.7683777809, -34.7299934555, 5.24448639569]).geometry.coordinates,4));


  const hexLayer = { 
    id: 'h3_hex_layer',
    type: 'fill',
    layout: {},
    paint: {
    'fill-color': '#088',
    'fill-opacity': 0.8
    }
  }

  const BrazilLayer = { 
    id: 'h3_hex_layer_brazil',
    type: 'fill',
    layout: {},
    paint: {
    'fill-color': {
      property: 'value',
      stops: [[0, '#fff'], [.5, '#f00']]
      },
      'fill-opacity': 0.6
    }
  }

  console.log('bay area hexes', brazilHexMap);
  return (
    <div className="App">
      <header className="App-header">
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Source id="bay-area" type="geojson" data={bayAreaHexesBoundaries}>
          <Layer {...hexLayer} />
        </Source>
        <Source id="brazil-data" type="geojson" data={brazilHexesBoundaries}>
          <Layer {...BrazilLayer} />
        </Source>
      </MapGL>
      </header>
    </div>
  );
}

export default App;
