const express = require("express");
// Připojeí api
const quizApi = require("./api/quizApi.ts");
require("dotenv").config();
// pro lokální prostředí číst z .env.local
require("dotenv").config({ path: ".env.local", override: true });
// Připojení databáze
require("./database/database");
const PORT: number = Number(process.env.PORT);
const app = express();

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server běží na portu:${PORT}`);
});

//Zjištění lokálního čí produkčního prostředí
process.env.DB_HOST == "localhost" ? console.log("Pracuji na lokálním prostředí!") : console.log("Pracuji na produkčním prostředí!");

module.exports = app;
