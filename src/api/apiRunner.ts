const express = require("express");
const PORT: number = Number(process.env.PORT);
const app = express();

//CORS
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server běží na portu:${PORT}`);
});

export default app;
