// using native fetch

async function testContact() {
    try {
        const res = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Debug User',
                email: 'debug@example.com',
                message: 'Debug message'
            })
        });

        console.log("Status:", res.status);
        const data = await res.json();
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

testContact();
