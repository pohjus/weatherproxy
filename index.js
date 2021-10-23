const express = require("express");
const app = express();
const axios = require("axios");
const port = process.env.PORT || 8080;

require("dotenv").config();

app.use(express.static("public"));

const checkdomain = (req, res, next) => {
  console.log(req.get("host"));
  if (req.get("host") == "https://myweatherproxy.herokuapp.com") {
    next();
  }
};

app.get("/q=:city([a-z]*)", checkdomain, async (req, res) => {
  const API_KEY = process.env.API_KEY;
  const cityName = req.params.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  let response = await axios.get(url);
  res.send(response.data);
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
