import * as h3 from 'h3-js';
import geojson2h3 from 'geojson2h3';
import * as turf from '@turf/turf';
import * as d3dsv from 'd3-dsv';

function getCSVdata( ) {
    var myData = [];
    d3dsv(",","kepler_cali_homes.csv", d => d).then( d => {
        myData.push( d );
        console.log( d );
    }); 
    return myData;
}

export const h3index = h3.geoToH3(37.77, -122.43, 9)
export const h3center = h3.h3ToGeo(h3index)
export const h3outline = h3.h3ToGeoBoundary(h3index)

export const res = h3.h3GetResolution(h3index)
export const baseCell = h3.h3GetBaseCell(h3index)
export const valid = h3.h3IsValid(h3index)
export const resIsClassIII = h3.h3IsResClassIII(h3index)
export const isPentagon = h3.h3IsPentagon(h3index)
export const neighbors = h3.kRing(h3index, 1)
export const threeRings = h3.kRingDistances(h3index, 3)
export const ring2Away = h3.hexRing(h3index, 2)
export const index2 = h3.geoToH3(38.88, -122.34, 9)
export const hexLine = h3.h3Line(h3index, index2)
export const hexDistance = h3.h3Distance(h3index, index2)
export const coords = h3.experimentalH3ToLocalIj(h3index, index2)
export const index2again = h3.experimentalLocalIjToH3(h3index, coords)
export const parent = h3.h3ToParent(h3index, 8)
export const immediateChildren = h3.h3ToParent(h3index, 10)
export const packedRings = h3.compact([].concat(...threeRings))
export const unpackedRings = h3.uncompact(packedRings, 9)
export const bayAreaHexes = h3.polyfill([
    [37.77, -122.43],
    [37.55, -122.43],
    [37.55, -122.23],
    [37.77, -122.23],
    [37.77, -122.43],
  ], 7)
export const bayAreaHexesBoundaries = geojson2h3.h3SetToFeatureCollection(bayAreaHexes);

export const brazilHexes = h3.polyfill(turf.bboxPolygon([-33.7683777809, -34.7299934555, 5.24448639569, -73.9872354804]).geometry.coordinates,4);
export const brazilHexMap = brazilHexes.reduce((res, hexagon) => ({...res, [hexagon]: Math.random()}), {});
export const brazilHexesBoundaries = geojson2h3.h3SetToFeatureCollection(
    Object.keys(brazilHexMap), hex => ({ value: brazilHexMap[hex]})
);

export const laHexes = h3.polyfill([
    [34.065, -118.289],
    [34.043, -118.289],
    [34.043, -118.245],
    [34.065, -118.245],
    [34.065, -118.289],
  ], 10)
export const laHexesBoundaries = geojson2h3.h3SetToFeatureCollection(laHexes);
// export const bayAreaHexesBoundaries = bayAreaHexes.map(hex => {
//     const tmp = h3.h3ToGeoBoundary(hex);
//     tmp.push(tmp[0]);

//     return (
//     {
//         type: 'Feature',
//         properties:{},
//         geometry: {
//             'type': 'Polygon',
//             'coordinates': [tmp]
//         }
//     });
// });