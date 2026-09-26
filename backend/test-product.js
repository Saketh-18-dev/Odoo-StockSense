const http = require("http");

const productId = "276b52fa-6715-4b43-b4da-ae8dfabef719";

const options = {
    hostname: "localhost",
    port: 5000,
    path: `/api/products/${productId}`,
    method: "DELETE"
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
    console.error("Error:", error.message);
});

req.end();
