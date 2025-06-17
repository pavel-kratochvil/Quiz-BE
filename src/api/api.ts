require("./quiz/quizApi");

import app from "./apiRunner";

app.get(``, async (req: any, res: any) => {
  res.send("test");
});
