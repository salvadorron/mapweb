import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import usePosition from "./hooks/usePosition";
import "leaflet/dist/leaflet.css";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MapWrapper from "./components/MapWraper";
import Header from "./components/Header";
import GroupLayer from "./components/GroupLayer";
import Toolbar from "./components/Toolbar";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

const App = () => {
  
  const position = usePosition()
  window.history.replaceState(null, '', `?lat=${position.lat}&lng=${position.lng}&zoom=${position.zoom}`)

  return (
    <div style={{ height: '100vh', width: '99vw'}}>
      <Header />
      <div style={{ position: 'relative', height: '100%', width: '100%'}}>
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={position.zoom}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ minHeight: "95vh", minWidth: "100vw", position: 'absolute', bottom: 0 }}
        >
          <MapWrapper>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GroupLayer />
            <Toolbar />
          </MapWrapper>
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
