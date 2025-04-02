import { useState } from 'react';
import { CiSearch } from 'react-icons/ci'
import { useMap } from 'react-leaflet';
import './SearchLocation.css';

export default function SearchLocation() {
    
    const [options, setOptions] = useState<{ label: string, value: { lat: number, lng: number } }[]>([]);

    const map = useMap();

    const onAction = async (payload: FormData) => {
        const currentOptions: { label: string, value: { lat: number, lng: number } }[] = [];
        const searchPayload = payload.get('search');
        const searchValue = searchPayload ? encodeURI(searchPayload.toString()) : '';
        const url = `https://nominatim.openstreetmap.org/search?q=${searchValue}&format=geojson`
        const response = await fetch(url);
        const data = await response.json();
        data.features.forEach((feature: any) => {
            console.log(feature)
            currentOptions.push({
                label: feature.properties.display_name,
                value: {
                    lng: feature.geometry.coordinates[0],
                    lat: feature.geometry.coordinates[1]
                }
            })
        })

        if(currentOptions.length > 0) {
            map.flyTo([currentOptions[0].value.lat, currentOptions[0].value.lng], 15);
        }

        setOptions(currentOptions);
    }

    const handleFly = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const { lat, lng } = JSON.parse(evt.target.value);
        map.flyTo([lat, lng], 15);
    }


    return (
        <div className="search-wrapper">
            <form className="form-search" action={onAction}>
                <div className="search-input">
                    <CiSearch size={20} />
                    <input name="search" type="text" placeholder="¿Donde?" />
                </div>
                <button type="submit">Buscar</button>
            </form>
            {options.length > 0 && <select className='query-selector'  onChange={handleFly}>
                {options.map((option) => (
                    <option key={option.label} value={JSON.stringify(option.value)}>{option.label}</option>
                ))}
            </select>}
        </div>
    )
}