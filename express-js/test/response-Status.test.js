import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
    if (req.query.name) {
        res.status(200).send("Hello, " + req.query.name);
    } else {
        res.status(404).end();
    }
});

app.listen(3000)

// ----------------------- Unit Test -----------------------
test('Test Response Status Code', async () => { 
    let response = await request(app).get("/").query({ name: "Reff" });
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, Reff");

    response = await request(app).get("/");
    expect(response.status).toBe(404);
})
