import GoogleMapReact from "google-map-react";
import { API } from "../backend";
import LocationInfoBox from "./LocationInfoBox";
import LocationMarker from "./LocationMarker";
import { useState } from "react";

const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  const markers = eventData.map((ev, index) => {
    if (ev.categories[0].id === 8) {
      return (
        <LocationMarker
          key={index}
          lat={ev.geometries[0].coordinates[1]}
          lng={ev.geometries[0].coordinates[0]}
          title={ev.categories[0].title}
          onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
        />
      );
    }
    return null;
  });
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: API,
        }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
};
Map.defaultProps = {
  center: {
    lat: 20.5937,
    lng: 78.9629,
  },
  zoom: 1,
};
export default Map;
