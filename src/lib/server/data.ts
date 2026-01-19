import { Station } from '../simulation';

// In-memory global state for the server
let stations: Station[] = [];

const delhiCenter = { lat: 28.6139, lng: 77.2090 };

let currentCenter = delhiCenter;

export function getInternalStations(center?: { lat: number; lng: number }) {
    // If a center is provided and it's different enough from the current one, or if no stations exist
    const shouldRegenerate = !userLocationMatch(center, currentCenter) || stations.length === 0;

    if (shouldRegenerate && center) {
        currentCenter = center;
        stations = Array.from({ length: 25 }).map((_, i) => ({
            id: `st-${i}`,
            name: `NeonHub ${i + 1}`,
            lat: center.lat + (Math.random() - 0.5) * 0.15,
            lng: center.lng + (Math.random() - 0.5) * 0.15,
            status: Math.random() > 0.4 ? 'available' : 'busy',
            price: Math.floor(Math.random() * 5) + 8,
            power: Math.random() > 0.4 ? 120 : 50,
            connectorType: Math.random() > 0.5 ? 'CCS' : 'Type 2'
        }));
    } else if (stations.length === 0) {
        // Fallback to default delhi if nothing exists and no center provided
        stations = Array.from({ length: 25 }).map((_, i) => ({
            id: `st-${i}`,
            name: `NeonHub ${i + 1}`,
            lat: delhiCenter.lat + (Math.random() - 0.5) * 0.15,
            lng: delhiCenter.lng + (Math.random() - 0.5) * 0.15,
            status: Math.random() > 0.4 ? 'available' : 'busy',
            price: Math.floor(Math.random() * 5) + 8,
            power: Math.random() > 0.4 ? 120 : 50,
            connectorType: Math.random() > 0.5 ? 'CCS' : 'Type 2'
        }));
    }
    return stations;
}

function userLocationMatch(loc1?: { lat: number; lng: number }, loc2?: { lat: number; lng: number }) {
    if (!loc1 || !loc2) return false;
    // Simple check if they are very close (roughly same area)
    return Math.abs(loc1.lat - loc2.lat) < 0.01 && Math.abs(loc1.lng - loc2.lng) < 0.01;
}


export function updateStationStatus(id: string, status: Station['status']) {
    stations = stations.map(s => s.id === id ? { ...s, status } : s);
}

// Background simulation on server
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * stations.length);
        if (stations[randomIndex]) {
            stations[randomIndex].status = Math.random() > 0.5 ? 'available' : 'busy';
        }
    }, 4000);
}

export function getStationById(id: string) {
    if (stations.length === 0) {
        getInternalStations();
    }
    return stations.find(s => s.id === id);
}
