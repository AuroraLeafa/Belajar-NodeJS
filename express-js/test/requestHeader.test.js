import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
    const apiKey = req.get("x-api-key");
    res.status(200).send("API Key is " + apiKey);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/")
})

// ----------------------- Unit Test -----------------------
test('Request Header', async () => { 
    const response = await request(app).get("/").set("x-api-key", "1234");
    expect(response.text).toBe("API Key is 1234");
})
