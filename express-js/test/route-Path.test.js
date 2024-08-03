import express from "express";
import request from "supertest";
import { info } from "winston";

const app = express();

app.get("/products/*.json", (req, res) => {
  res.status(200).send(req.originalUrl);
});

app.get("/categories/*(\\d+).json", (req, res) => {
  res.status(200).send(req.originalUrl);
});

app.listen(3000);

// ----------------------- Unit Test -----------------------
test("Test Route Path", async () => {
  let response = await request(app).get("/products/reff.json");
  expect(response.text).toBe("/products/reff.json");
  expect(response.status).toBe(200);

  response = await request(app).get("/products/123.json");
  expect(response.status).toBe(200);
  expect(response.text).toBe("/products/123.json");

  response = await request(app).get("/categories/123.json");
  expect(response.status).toBe(200);
  expect(response.text).toBe("/categories/123.json");

  response = await request(app).get("/categories/reff.json");
  expect(response.status).toBe(404);
});
