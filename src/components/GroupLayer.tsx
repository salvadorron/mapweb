import { Circle, LayerGroup, LayersControl } from "react-leaflet";
const center: [number, number] = [51.505, -0.09]

export default  function GroupLayer () {


    return (
        <LayersControl position="topright">
            <LayersControl.Overlay name="Group Layer" checked>
                <LayerGroup>
                    <Circle
                        center={center}
                        pathOptions={{ fillColor: 'blue' }}
                        radius={200}
                    />
                    <Circle
                        center={center}
                        pathOptions={{ fillColor: 'red' }}
                        radius={100}
                        stroke={false}
                    />
                </LayerGroup>
            </LayersControl.Overlay>
        </LayersControl>
    )

}