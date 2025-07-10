require("./quiz/quizApi");
require("./question/questionsApi");

import app from "./apiRunner";

app.get(``, async (req: any, res: any) => {
  res.status(200).send({ message: "Server běží!" });
});
