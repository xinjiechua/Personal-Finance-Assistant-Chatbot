const express = require("express");

const app = express();

// Define routes
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
