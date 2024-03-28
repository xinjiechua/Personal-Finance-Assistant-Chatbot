// routes/djangoRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Proxy requests to Django backend
router.all("*", async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: "http://localhost:8000" + req.originalUrl,
            data: req.body,
            headers: req.headers,
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error communicating with Django backend");
    }
});

module.exports = router;
