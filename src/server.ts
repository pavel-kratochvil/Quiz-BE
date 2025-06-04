const express = require("express");
// Připojeí api
const quizApi = require("./api/quizApi.ts");
require("dotenv").config();

const PORT: number = Number(process.env.PORT);
const app = express();

app.use(express.json());
app.listen(PORT, () => {
  console.log(`server is running on: Port:${PORT}`);
});

module.exports = app;
