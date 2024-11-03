const express = require("express");
const { products } = require("./data");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1> Home Page </h1><a href='/api/products'>products</a>");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:productId", (req, res) => {
  const { productId } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productId)
  );
  if (singleProduct === undefined)
    return res.status(404).send("<h1>Product doesn't exist</h1>");
  res.json(singleProduct);
});
//we can absolutely join both /v1/query and /products to be the same .get if there's no query string.
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search)
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search)
    );
  if (limit) sortedProducts = sortedProducts.slice(0, Number(limit));
  if (sortedProducts.length < 1) {
    // return res
    //   .status(200)
    //   .send("<h1>There's no product with this search param</h1>");
    return res.status(200).json({ success: true, data: [] }); // you can shape the response as much as you desire.
  }

  res.status(200).json(sortedProducts);
});
app.all("*", (req, res) => {
  res.send("<h1>This resource doesn't exist</h1>");
});
app.listen(5000, () => {
  console.log("SERVER IS LISTENING ON PORT 5000...");
});
