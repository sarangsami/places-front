import { LatLngTuple } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { MapProps } from "types";

function ChangeView(props: {
  center: {
    lat: number;
    lng: number;
  };
}) {
  const { center } = props;
  const map = useMap();
  map.setView(center);
  return null;
}

const Map = (props: MapProps) => {
  const { center, zoom, locationName, setNewPosition } = props;
  const { lat, lng } = center;

  const position: LatLngTuple = [lat, lng];

  function ChangeMarker() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        if (setNewPosition) {
          setNewPosition({ lat, lng });
        }
      },
    });
    return null;
  }

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ width: "100%", height: 400 }}
    >
      <ChangeView center={center} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{locationName}</Popup>
      </Marker>
      {setNewPosition ? <ChangeMarker /> : null}
    </MapContainer>
  );
};

export default Map;
