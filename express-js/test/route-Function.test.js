import express from "express";
import request from "supertest";
import { info } from "winston";

const app = express();

app.route("/products/")
  .get((req, res) => {
    res.status(200).send(`Get Endpoint`);
  })
  .post((req, res) => {
    res.status(200).send(`Post Endpoint`);
  })
  .put((req, res) => {
    res.status(200).send(`Put Endpoint`);
  })
  .patch((req, res) => {
    res.status(200).send(`Patch Endpoint`);
  })
  .delete((req, res) => {
    res.status(200).send(`Delete Endpoint`);
  });

app.listen(3000);

// ----------------------- Unit Test -----------------------
test("Test Route with Function", async () => {
  let response = await request(app).get("/products/");
  expect(response.text).toBe("Get Endpoint");
  expect(response.status).toBe(200);
  
  response = await request(app).post("/products/");
  expect(response.text).toBe("Post Endpoint");
  expect(response.status).toBe(200);

  response = await request(app).put("/products/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Put Endpoint");

  response = await request(app).patch("/products/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Patch Endpoint");
  
  response = await request(app).delete("/products/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Delete Endpoint");
});
