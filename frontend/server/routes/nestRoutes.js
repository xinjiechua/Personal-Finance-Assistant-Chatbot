// routes/nestRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();


// Proxy requests to NestJS backend
// router.all("*", async (req, res) => {
    
//     try {
//         console.log(req.url);
//         const response = await axios.get('http://localhost:3000/')
//         // const response = await axios({
//         //     method: req.method,
//         //     url: "http://localhost:3000" + req.originalUrl,
//         //     data: req.body,
//         //     headers: req.headers,
//         // });
//         // res.json(response.data);
//         res.json(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error communicating with NestJS backend");
//     }
// });


router.post("users/login", async (req, res) => {
    try {
        console.log('hit users/login');
        // const response = await axios.post(
        //     "http://localhost:3000/users/login",
        //     req.body,
        //     { headers: req.headers }
        // );
        // res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error communicating with NestJS backend");
    }
});

module.exports = router;



