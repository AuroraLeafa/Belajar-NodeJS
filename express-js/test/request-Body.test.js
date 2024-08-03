import express from "express";
import request from "supertest";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/json", (req, res) => {
  let name = req.body.name;
  res.status(200).json({
    hello: `Hello, ${name}`,
  });
});

app.post("/form", (req, res) => {
  let name = req.body.name;
  res.status(200).json({
    hello: `Hello, ${name}`,
  });
});

app.listen(3000);

// ----------------------- Unit Test -----------------------
test("Test Request Body JSON", async () => {
  const response = await request(app)
    .post("/json")
    .set("Content-Type", "application/json")
    .send({ name: "Reff" });
  expect(response.body).toEqual({ hello: `Hello, Reff` });
});

test("Test Request Body Form", async () => {
  const response = await request(app)
  .post("/form")
  .set("Content-Type", "application/x-www-form-urlencoded")
  .send("name=Reff");
  expect(response.body).toEqual({ hello: `Hello, Reff` });
});
