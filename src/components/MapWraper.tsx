import { useMap, useMapEvents } from "react-leaflet";

const MapWrapper = ({ children }: { children: React.ReactNode }) => {

    const map = useMap();

    map.pm.addControls({
      position: 'topleft',
    })


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