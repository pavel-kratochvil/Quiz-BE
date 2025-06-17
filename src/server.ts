require("dotenv").config();
// pro lokální prostředí číst z .env.local
require("dotenv").config({ path: ".env.local", override: true });

// Připojení databáze
require("./database/database");

// Připojeí api
require("./api/api");

//Zjištění lokálního čí produkčního prostředí
process.env.DB_HOST == "localhost" ? console.log("Pracuji na lokálním prostředí!") : console.log("Pracuji na produkčním prostředí!");
