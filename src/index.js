const express = require("express");
const path = require("path");
const requests = require("requests");

const app = express();

//declaring the templet engine
app.set("view engine", "hbs");

// home page router
app.get("/", (req, res) => {
  // calling api
  requests(
    `http://api.openweathermap.org/data/2.5/weather?q=bangladesh&appid=aabbfb93a86b2cfd6cd5beb5650d7539&units=metric`
  ).on("data", (chunk) => {
    //convert the data JSON to Object
    const objData = JSON.parse(chunk);
    //convert the data Object to Array
    const data = [objData];
    //dispaling the data
    res.render("index", {
      country: `${data[0].name}`,
      temp: `${data[0].main.temp}`,
      clouds: `${data[0].clouds.all}`,
      speed: `${data[0].wind.speed}`,
      humidity: `${data[0].main.humidity}`,
      description: `${data[0].weather[0].description}`,
      pressure: `${data[0].main.pressure}`,
    });
  });
});

app.get("*", (req, res) => {
  res.send(`<h1>Page Not Found</h1>`);
});
app.listen(3000);
