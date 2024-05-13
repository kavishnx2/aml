import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhdmktY29kZXZpZ29yIiwiYSI6ImNsaGIzdmVjNDBub3AzZXMybjViM3VqNWYifQ._FuHAP8YwUCJd2uCp_Qnaw';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [57.5865, -20.236], // Centered on Mauritius
      zoom: 9,
      maxZoom: 15,
      minZoom: 9,
    });

    map.on('load', () => {
      map.addSource('custom-cluster', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [57.59755925860111, -20.239362248695187],
              },
              properties: {
                title: 'Custom Cluster',
                description: 'This is your custom cluster',
              },
            },
          ],
        },
      });

      map.addLayer({
        id: 'custom-cluster-layer',
        type: 'circle',
        source: 'custom-cluster',
        paint: {
          'circle-color': 'red',
          'circle-radius': 10,
        },
      });

      map.on('click', 'custom-cluster-layer', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        const description = e.features[0].properties.description;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<h3>${title}</h3><p>${description}</p>`)
          .addTo(map);
      });
    });
  }, []);

  return <div className="container-fluid vh-100" id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}></div>;
};

export default Map;
