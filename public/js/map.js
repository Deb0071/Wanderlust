

 // console.log(mapToken);
	mapboxgl.accessToken = mapToken;
  
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 11 // starting zoom
    });

    console.log(listing.geometry.coordinates);

    const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h5>${listing.location}</h5> <p>Exact location provided after booking</p>`))
    .addTo(map); 