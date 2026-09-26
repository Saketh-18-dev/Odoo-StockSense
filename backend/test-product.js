const http = require("http");

const inventoryId = "e879cf36-df4b-455a-adb9-3b2a9358a068";

const data = JSON.stringify({
    quantity: 60
});

const options = {
    hostname: "localhost",
    port: 5000,
    path: `/api/inventory/${inventoryId}`,
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data)
    }
};

const req = http.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        console.log("Status:", res.statusCode);
        console.log("Response:", body);
    });
});

req.on("error", (error) => {
    console.error("Error:", error);
});

req.write(data);
req.end();

