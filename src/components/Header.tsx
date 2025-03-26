export default function Header () {
    return (
        <div style={{ display: 'flex', gap: '1rem', position: 'fixed', padding: '4px', top: 0, height: 50, zIndex: 1000, background: '#000', width: '100%'}}>
                <p style={{ color: '#fff' }}>Lat: {10}</p>
                <p style={{ color: '#fff' }}>Lng: {30}</p>
                <p style={{ color: '#fff' }}>Zoom: {20}</p>
            </div>
    )
} 