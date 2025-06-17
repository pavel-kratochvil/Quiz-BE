import app from "../apiRunner";

let path: string = "/quiz";
app.get(`${path}`, async (req: any, res: any) => {
  res.send("test");
});
