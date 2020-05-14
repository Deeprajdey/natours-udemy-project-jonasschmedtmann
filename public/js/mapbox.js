/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZGVlcHJhamRleSIsImEiOiJjazlza2Y4dWQxNHUyM2VxaGU0ZW16YWNxIn0.xZtgqXdzjawNwqVb7ag2Hw";

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/deeprajdey/ck9tja0e20eqq1io4w7cmypp9",
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<div>Day ${loc.day}: ${loc.description}</div>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
