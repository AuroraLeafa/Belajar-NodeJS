import express from "express";
import request from "supertest";

const logger = (req, res, next) => {
  console.info(`Received URL : ${req.method} ${req.originalUrl}`);
  next();
}

const addHeader = (req, res, next) => {
  res.setHeader('X-Powered-By', 'Express');
  next();
}

const apiKey = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

const app = express();
app.use(logger);
app.use(apiKey);
app.use(addHeader);

app.get("/", (req, res) => {
  res.status(200).send("Hello World With Express!");
});

app.get("/reff", (req, res) => {
  res.status(200).send("Hello World With Express!");
});

app.listen(3000);

// ----------------------- Unit Test -----------------------
test("Test Middleware AddHeader", async () => {
  const response = await request(app).get("/").query({ apiKey: "1234" });
  expect(response.get("X-Powered-By")).toBe("Express");
  expect(response.text).toBe("Hello World With Express!");
  expect(response.status).toBe(200);
});

test("Test Middleware AddHeader different endpoint", async () => {
  const response = await request(app).get("/reff").query({ apiKey: "1234" });
  expect(response.get("X-Powered-By")).toBe("Express");
  expect(response.status).toBe(200); 
});

test("Test Middleware ApiKey Middleware", async () => {
  const response = await request(app).get("/reff").query({ apiKey: "1234" });
  expect(response.get("X-Powered-By")).toBe("Express");
  expect(response.status).toBe(200); 
});

test("Test Middleware ApiKey Middleware UNAUTHORIZED", async () => {
  const response = await request(app).get("/reff");
  expect(response.get("X-Powered-By")).toBe("Express");
  expect(response.status).toBe(401); 
  expect(response.text).toBe("Unauthorized"); 
});