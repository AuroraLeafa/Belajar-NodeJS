import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
    res.status(200).send(`Hello ${req.query.name}, ${req.query.age} y.o`);
});

app.listen(3000)

// ----------------------- Unit Test -----------------------
test('Query Params Test', async () => { 
    const response = await request(app).get("/").query({ name: "Reff", age: "20" });
    expect(response.text).toBe("Hello Reff, 20 y.o");
})


