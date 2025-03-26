

const usePosition = () => {


    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');
    const lng = params.get('lng');
    const zoom = params.get('zoom');




    return {
        lat: Number(lat) || 47.21725,
        lng: Number(lng) || -1.55336,
        zoom: Number(zoom) || 13
    }
}

export default usePosition