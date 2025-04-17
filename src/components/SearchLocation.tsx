import { useState } from 'react';
import { CiSearch } from 'react-icons/ci'
import { useMap } from 'react-leaflet';
import './SearchLocation.css';
import PopupSearch, { Option } from './PopupSearch';

export default function SearchLocation() {
    
    const [options, setOptions] = useState<Option[]>([]);

    const map = useMap();

    const onAction = async (payload: FormData) => {
        const currentOptions: Option[] = [];
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

        setOptions(currentOptions);
    }

    const handleFly = (option: Option) => {
        const { lat, lng } = option.value;
        map.flyTo([lat, lng], 15);
        setOptions([]);
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
            {options.length > 0 && 
                <PopupSearch onChange={handleFly} options={options} />
            }
        </div>
    )
}