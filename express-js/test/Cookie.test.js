import cookieParser from "cookie-parser";
import express from "express";
import request from "supertest";


const app = express();
app.use(cookieParser())
app.use(express.json());

app.get("/", (req, res) => {
  const name = req.cookies["name"]
  res.status(200).send(`Hello, ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login",name, {path: "/", httpOnly: true});
  res.status(200).send(`Hello, ${name}`);
});

app.listen(3000);

// ----------------------- Unit Test -----------------------
test("Test Cookie Read", async () => {
  const response = await request(app)
  .get("/")
  .set("Cookie", "name=Reff;Author:Reff Author");
  expect(response.text).toBe("Hello, Reff");
});

test("Test Cookie Write", async () => {
  const response = await request(app)
  .post("/login").send({name: "Reff"})
  expect(response.get("Set-Cookie").toString()).toBe("Login=Reff; Path=/; HttpOnly");
  expect(response.text).toBe("Hello, Reff");
});