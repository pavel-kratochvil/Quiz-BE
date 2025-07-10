import app from "../apiRunner";
import client from "../../database/database";
const path: string = "/questions";

//Získání všech otázek
app.get(`${path}`, async (req: any, res: any) => {
  try {
    let result = await client.query("select * from questions");
    return res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    return res.stack(400).send({ message: "error" });
  }
});

//Získání otázky podle zadaného ID
app.get(`${path}/:id`, async (req: any, res: any) => {
  try {
    let result = await client.query("select * from questions WHERE id = $1", [req.params["id"]]);
    if (result.rows.length === 0) {
      return res.status(404).send({ message: "Otázka neexistuje!" });
    }
    return res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    return res.stack(400).send({ message: "error" });
  }
});

//Vytvoření otázky
app.put(`${path}/create`, async (req: any, res: any) => {
  try {
    await client.query("INSERT INTO questions (text, answer, quiz_id) VALUES ($1, $2, $3)", [req.body.question, req.body.answer, req.body.quizId]);
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.stack(400).send({ message: "error" });
  }
});

//Smazání otázky
app.delete(`${path}/delete/:id`, async (req: any, res: any) => {
  try {
    await client.query("DELETE FROM questions WHERE id = $1", [req.params["id"]]);
    return res.status(200).send({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.stack(400).send({ message: "error" });
  }
});
