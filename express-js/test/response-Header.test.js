import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res
    .set({
      "X-API-KEY": "1234",
      "X-FOO": "bar",
      "X-BAR": "foo",
    });

  res.status(200).send("Hello World With Express!");
});

app.listen(3000);

// ----------------------- Unit Test -----------------------
test("Test Response Header", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello World With Express!");
  expect(response.status).toBe(200);
  expect(response.get("X-API-KEY")).toBe("1234");
  expect(response.get("X-FOO")).toBe("bar");
  expect(response.get("X-BAR")).toBe("foo");
});
