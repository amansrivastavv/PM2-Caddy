const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("crash", (req, res) => {
  res.send("App is crashing...");
  process.exit(1);
});

//take input from parameter and return it back
app.get("/:id", (req, res) => {
  res.send(`Hello world  ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
