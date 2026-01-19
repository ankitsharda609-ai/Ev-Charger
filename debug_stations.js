// using native fetch

async function testStations() {
    try {
        console.log("Testing Local API...");
        // using native fetch
        const res = await fetch('http://localhost:3000/api/stations?lat=28.61&lng=77.23');
        const apiData = await res.json();
        console.log("API Status:", res.status);
        console.log("API Data Length:", Array.isArray(apiData) ? apiData.length : 'Not Array');
        if (Array.isArray(apiData) && apiData.length > 0) {
            console.log("API Sample ID:", apiData[0].id);
        }
    } catch (e) {
        console.error("Test Error:", e);
    }
}

testStations();
