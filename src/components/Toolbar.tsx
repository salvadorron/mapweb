import { Circle, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

export default function Toolbar() {
    return (
        <FeatureGroup>
              <EditControl
                position='topleft'
                onEdited={() => {}}
                onCreated={() => {}}
                onDeleted={() => {}}
                draw={{
                  rectangle: true,
                }}
                
              />
              <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>
    )
}