import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Hello World With Express!");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/")
})