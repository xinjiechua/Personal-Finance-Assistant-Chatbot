// frontend/server/server.js

const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001; // You can change the port number as needed

// Proxy requests to NestJS backend
// app.use("/nest", async (req, res) => {
//     try {
//         console.log(req.url);
//         const response = await axios.get("http://localhost:3000" + req.url); // Assuming NestJS server runs on port 3000
//         res.json(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error communicating with NestJS backend");
//     }
// });

app.use("/django", async (req, res) => {
    try {
        console.log(req.url);
        const response = await axios.get(
            "http://localhost:8000/umhack_app/test"
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error communicating with NestJS backend");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
