import { useState } from "react"
import './PopupSearch.css';
import { useMap } from "react-leaflet";

export type Option = {
    label: string,
    value: {
        lat: number,
        lng: number
    }
}

export default function PopupSearch({ options, onChange }: { options: { value: { lat: number, lng: number }, label: string }[], onChange: (option: Option) => void }) {
    

    const map = useMap();

    const [selectedItem, setSelectedItem] = useState<number>(0);
    
    const handleChange = (index: number, currentOption: Option) => {
        setSelectedItem(index);
        onChange(currentOption);
        map.dragging.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.doubleClickZoom.enable();
        map.keyboard.enable();
    }

    return (
        <div className="popup-search" onMouseEnter={() => {
            map.dragging.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.doubleClickZoom.disable();
            map.keyboard.disable();
        }} onMouseLeave={() => {
            map.dragging.enable();
            map.scrollWheelZoom.enable();
            map.boxZoom.enable();
            map.doubleClickZoom.enable();
            map.keyboard.enable();
        }}>
            {options.map((option, index) => (
                <button className={`item-search ${selectedItem === index ? 'item-search--selected' : ''}`} onClick={() => handleChange(index, option)} key={JSON.stringify(option.value)}>{option.label}</button>
            ))}
        </div>
    )
}