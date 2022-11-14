'use strict';

const fs = require("fs");
const https = require("https");
const express = require("express");

var serveStatic = require('serve-static');
const app = express();  
app.use(serveStatic(__dirname + "/dist"));

const privateKey = fs.readFileSync("/home/node/app/cert/privkey.pem", "utf8");
const certificate = fs.readFileSync("/home/node/app/cert/cert.pem", "utf8")
const ca = fs.readFileSync("/home/node/app/cert/chain.pem", "utf8")
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const httpsServer = https.createServer(credentials, app);

var port = 8080;


app.get("/", (req, res) => {
    console.log("------ https get / -----" + (new Date()).toLocaleString());
    console.log("req.ip => " + req.ip);
    console.log("req.hostname => " + req.hostname);
    console.log(req.url);
    console.log(req.originalUrl);

    res.send("<h1>HTTPS Server running on port 8080</h1>");
})


httpsServer.listen(port,()=>{
	console.log((new Date()).toLocaleString());
	console.log(`HTTPS -- listening on port ${port} ...`);
})
