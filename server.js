const express = require("express");
const app = express();
const port = 4000;
let data = {};

app.get("/set", (req, res) => {
  const key = req.query.somekey;
  const value = req.query.somevalue;

  key && value
    ? (data[key] = value) &&
      res.send(`Key "${key}" with value "${value}" has been set.`)
    : res.send(
        "Invalid request. Please provide both 'somekey' and 'somevalue' as query parameters."
      );
});

app.get("/get/:input", (req, res) => {
  const key = Object.keys(data).toString();
  const input = req.params.input;
  console.log(key, input, data[key]);
  switch (input) {
    case key:
      res.send(`Your value is ${data[key]}.`);
      break;
    case data[key]:
      res.send(`Your key is ${key}.`);
      break;
    default:
      res.send("You have not searched for a valid key or value.");
      break;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
