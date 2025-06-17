import app from "../apiRunner";
import client from "../../database/database";

let path: string = "/quiz";

// ískání všech kvízů
app.get(`${path}/getAll`, async (req: any, res: any) => {
  let data = await client.query("SELECT * FROM quiz");
  return res.status(200).send(data.rows);
});

// Vytvoření kvízu
app.put(`${path}/create`, async (req: any, res: any) => {
  await client.query("INSERT INTO quiz (name) VALUES ($1);", [req.body.name]);
  return res.status(201).send({ message: "Quiz vytvořen!" });
});

// Smazání kvízu
app.delete(`${path}/delete/:id`, async (req: any, res: any) => {
  let data = await client.query("SELECT * FROM quiz WHERE id = $1 ", [req.params["id"]]);
  if (data.rows.length === 0) {
    return res.status(404).send({ message: "Quiz neexistuje!" });
  }
  await client.query("DELETE FROM quiz WHERE id = $1 ", [req.params["id"]]);
  return res.status(200).send({ message: "Quiz smazán!" });
});
