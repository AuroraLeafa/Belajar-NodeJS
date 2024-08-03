import express from "express";
import request from "supertest";

const app = express();

app.get("/hello/cuy", (req, res) => {
    res.status(200).json({
        path: req.path,
        method: req.method,
        originalUrl: req.originalUrl,
        hostname: req.hostname,
        protocol: req.protocol,
    })
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/")
})

// ----------------------- Unit Test -----------------------
test('Hello World With Express!', async () => { 
    const response = await request(app).get("/hello/cuy").query({ name: "World" });
    expect(response.body).toEqual({
        path: '/hello/cuy',
        method: 'GET',
        originalUrl: '/hello/cuy?name=World',
        hostname: '127.0.0.1',
        protocol: 'http',
    });
})
