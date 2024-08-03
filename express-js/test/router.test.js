import express from "express";
import request from "supertest";

const app = express();

const router = express.Router();

router.use((req, res, next) => {
  console.info(`Received URL : ${req.method} ${req.originalUrl}`);

  next();
})

router.route("/products/route/a")
  .get((req, res) => {
    res.status(200).send(`Get Endpoint`);
  })
  .post((req, res) => {
    res.status(200).send(`Post Endpoint`);
  });

app.listen(3000);

// ----------------------- Unit Test -----------------------
test("Test Router Disabled", async () => {
  let response = await request(app).get("/products/route/a");
  expect(response.status).toBe(404);
});

test("Test Router Enabled", async () => {
  app.use(router)
  let response = await request(app).get("/products/route/a");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Get Endpoint");

  response = await request(app).post("/products/route/a");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Post Endpoint");
});

