import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.status(302).redirect('http://www.auroraleafa.my.id/');
});

app.listen(3000);

// ----------------------- Unit Test -----------------------
test("Test Response Redirect", async () => {
  const response = await request(app).get("/");
  expect(response.get("location")).toBe("http://www.auroraleafa.my.id/");
  expect(response.status).toBe(302);
});
