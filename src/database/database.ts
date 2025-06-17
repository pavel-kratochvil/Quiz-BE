const { Client } = require("pg");
const fs = require("fs");
const changelogs_directory = "./src/database/changelogs";

// Nastavení databáze
const dbConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

// Vytvoření klienta
const client = new Client(dbConfig);

// Připojení k databázi
client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err: any) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

//Console log v případě chyby
client.on("error", (err: any) => {
  console.error("something bad has happened!", err.stack);
});

// Ověření databáze
console.log("Ověřuji databázi!");
CheckDB();

// Ověření zdali je již DB Vyvořená
async function CheckDB() {
  const res = await client.query(`SELECT EXISTS(SELECT FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_name = 'changelogs');`);
  if (res.rows[0].exists) {
    console.log("Databáze již existuje!");
    return applyDBChanges();
  }
  console.log("Databáze není vytvořena!");
  return createDBTables();
}

//Vytvoření DB
async function createDBTables() {
  console.log("Vytvářím tabulky v databázi!");
  let createDBSQL = fs.readFileSync(`${changelogs_directory}/createDB.sql`, { encoding: "utf8" });
  try {
    console.log(`Provádím changelog 'createDB.sql'`);
    await client.query(createDBSQL);
  } catch (err) {
    console.log(err);
  }
  applyDBChanges();
}

// Ověření changelogů vůči databázi
/*
Changelogy je potřeba tvořit tak aby se spouštely podle data vyvoření:
Například:
changelog_2025_06_16.sql
changelog_2025_06_17.sql
changelog_2025_06_18_1.sql
changelog_2025_06_18_2.sql
*/
async function applyDBChanges() {
  console.log(`Ověřuji změny v DB!`);
  let changelogs: string[] = await getChangelogs();
  fs.readdir(changelogs_directory, (err: any, files: string[]) => {
    files.forEach(async (fileName) => {
      changelogs.includes(fileName) ? console.log(`Changelog skip '${fileName}'`) : await applyChangelog(fileName);
    });
  });
}

// Získání již provedených změn na databázi
async function getChangelogs() {
  try {
    let data = await client.query("Select * from changelogs");
    let changelogs: string[] = [];
    data.rows.forEach((row: { file_name: string }) => {
      changelogs.push(row.file_name);
    });
    return changelogs;
  } catch (err) {
    console.log(err);
    return [];
  }
}

// Apikování změn v databázi podle sql v changelogu
async function applyChangelog(fileName: string) {
  try {
    console.log(`Provádím changelog '${fileName}'`);
    let sql = fs.readFileSync(`${changelogs_directory}/${fileName}`, { encoding: "utf8" });
    await client.query(sql);
    await client.query(`INSERT INTO changelogs (file_name) VALUES ('${fileName}');`);
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = client;
