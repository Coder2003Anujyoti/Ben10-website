// server.js
const express = require('express');
const app = express();
const PORT = 3000;
const aliens=require("./aliens.json");
// define the route
app.get('/',
    (req, res) => {
        res.send(
            `<h1 style="color: green;">
            Hello Gfg!</h1>`
        );
    });
app.get('/aliens', (req, res) => {
// Send the posts array as a JSON response
return res.json(aliens);
});
app.listen(PORT,
    () => {
        console.log(
            `Server is listening at 
            http://localhost:${PORT}`
        );
    });