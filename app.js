// express, file share dependencies
// =============================================================
const express = require("express");
const fs = require("fs");


// express set up
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080

// express data parse
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("./assets"));

// routes
require("./routing/html-routes")(app);
require("./routing/api-routes")(app);

// server successfully configured msg
// =============================================================
app.listen(PORT, function() {
    console.log("Successfully listening in on port: " + PORT);
});
