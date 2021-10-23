const express = require("express");
const app = express();
const axios = require("axios");
const port = process.env.PORT || 8080;
const ipfilter = require("express-ipfilter").IpFilter;

const ips = ["127.0.0.1"];

require("dotenv").config();

app.use(express.static("public"));

app.use(ipfilter(ips, { mode: "allow" }));

app.get("/q=:city([a-z]*)", async (req, res) => {
  const API_KEY = process.env.API_KEY;
  const cityName = req.params.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  let response = await axios.get(url);
  res.send(response.data);
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
