const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const https = require("https");

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log(`Request path: ${req.path}`);
  next();
});

app.get("/create/:q", (req, res) => {
  const query = req.params.q;
  const options = {
    hostname: "api.thecatapi.com",
    path: `/v1/breeds/search?q=${query}`,
    method: "GET",
    headers: {
      "x-api-key": process.env.CAT_API_KEY,
    },
  };

  const apiRequest = https.request(options, (apiResponse) => {
    let data = "";

    apiResponse.on("data", (chunk) => {
      data += chunk;
    });

    apiResponse.on("end", () => {
      let id = JSON.parse(data)[0]["image"]["id"];
      console.log(data);
      // `${id}.json`
      //save data to file to the "cats" dir
      fs.writeFileSync(`./cats/${id}.json`, data);
      res.status(201).send(data);
    });
  });

  apiRequest.on("error", (error) => {
    console.error(error);
  });

  apiRequest.end();
});

app.listen(3001, () => console.log("Server is running"));
