import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.set("content-type", "text/html");
  res.status(200).send(`<html><head><title>Hello World With Express!</title></head></html>`);
});

app.listen(3000);

// ----------------------- Unit Test -----------------------
test("Test Response Body", async () => {
  const response = await request(app).get("/");
  expect(response.get("content-type")).toContain("text/html");
  expect(response.status).toBe(200);
  expect(response.text).toBe("<html><head><title>Hello World With Express!</title></head></html>");
});
