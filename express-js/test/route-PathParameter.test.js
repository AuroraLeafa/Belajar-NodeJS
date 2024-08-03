import express from "express";
import request from "supertest";
import { info } from "winston";

const app = express();

app.get("/products/:id", (req, res) => {
  const getId = req.params.id;
  res.status(200).send(`ID Produk adalah : ${getId}`);
});

app.get("/categories/:id(\\d+)", (req, res) => {
  const getId = req.params.id;
  res.status(200).send(`ID Kategori adalah : ${getId}`);
});

app.get("/sellers/:idSeller(\\d+)/products/:idProduct", (req, res) => {
  const getSellerId = req.params.idSeller;
  const getProductId = req.params.idProduct;
  res.status(200).send(`ID Seller adalah : ${getSellerId} \n ID Produk adalah : ${getProductId}`);
});

app.listen(3000);

// ----------------------- Unit Test -----------------------
test("Test Route Path with Parameter", async () => {
  let response = await request(app).get("/products/adalah");
  expect(response.text).toBe("ID Produk adalah : adalah");
  expect(response.status).toBe(200);
  
  response = await request(app).get("/products/123");
  expect(response.text).toBe("ID Produk adalah : 123");
  expect(response.status).toBe(200);

  response = await request(app).get("/categories/123");
  expect(response.status).toBe(200);
  expect(response.text).toBe("ID Kategori adalah : 123");
  
  response = await request(app).get("/sellers/1/products/123");
  expect(response.status).toBe(200);
  expect(response.text).toBe("ID Seller adalah : 1 \n ID Produk adalah : 123");
});
