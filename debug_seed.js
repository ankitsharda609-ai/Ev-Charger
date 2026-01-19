// using native fetch

async function testSeed() {
    try {
        const res = await fetch('http://localhost:3000/api/seed', { method: 'POST' });
        const data = await res.json(); // Takes text if json fails? No, api returns json.
        console.log("Status:", res.status);
        console.log("Body:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

testSeed();
