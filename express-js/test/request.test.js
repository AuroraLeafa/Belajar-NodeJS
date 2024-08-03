import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Hello World With Express!");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/")
})

// ----------------------- Unit Test -----------------------
test('Test Request', async () => { 
    const response = await request(app).get("/");
    expect(response.text).toBe("Hello World With Express!");
})
