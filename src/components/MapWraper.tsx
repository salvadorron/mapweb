import { useMap, useMapEvents } from "react-leaflet";
import { Geocoder, geocoders } from 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

const MapWrapper = ({ children }: { children: React.ReactNode }) => {

    const map = useMap();

    const geocoder = new geocoders.Nominatim();

    new Geocoder({
        geocoder,
        position: 'topright',
        collapsed: false
      }).addTo(map);


    useMapEvents({
      dragend: (e) => {
          const { lat, lng } = e.target.getCenter();
          const zoom = e.target.getZoom();
          window.history.replaceState(null, '', `?lat=${lat}&lng=${lng}&zoom=${zoom}`)
        },
      zoom: (e) => {
          const { lat, lng } = e.target.getCenter();
          const zoom = e.target.getZoom();
          window.history.replaceState(null, '', `?lat=${lat}&lng=${lng}&zoom=${zoom}`)
        }
    }
  )
  
    return (
      <div>
        {children}
      </div>
    )
  }
  
  export default MapWrapper;