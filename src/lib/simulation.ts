export interface Station {
    id: string;
    name: string;
    lat: number;
    lng: number;
    status: 'available' | 'busy' | 'offline';
    price: number;
    power: number; // kW
    connectorType: 'CCS' | 'CHAdeMO' | 'Type 2';
}

const delhiCenter = { lat: 28.6139, lng: 77.2090 };

export const generateStations = (count: number = 10, center: { lat: number; lng: number } = delhiCenter): Station[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `st-${i}-${Date.now()}`, // Unique ID for regeneration
        name: `EV Station ${i + 1}`,
        lat: center.lat + (Math.random() - 0.5) * 0.1,
        lng: center.lng + (Math.random() - 0.5) * 0.1,
        status: Math.random() > 0.3 ? 'available' : 'busy',
        price: Math.floor(Math.random() * 20) + 10,
        power: Math.random() > 0.5 ? 150 : 50,
        connectorType: 'CCS',
    }));
};

export const simulateUpdates = (stations: Station[]): Station[] => {
    return stations.map(station => {
        if (Math.random() > 0.8) {
            return {
                ...station,
                status: Math.random() > 0.5 ? 'available' : 'busy'
            };
        }
        return station;
    });
};
