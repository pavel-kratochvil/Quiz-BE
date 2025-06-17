const express = require("express");
const PORT: number = Number(process.env.PORT);
const app = express();

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server běží na portu:${PORT}`);
});

export default app;
