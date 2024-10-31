const Product = require("../models/product");

const getProducts = (req, res) => {
  Product.findAll().then((products) => {
    res
      .render("shop/product-list", {
        prods: products,
        pageTitle: "All products",
        path: "/products",
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
const getProduct = (req, res) => {
  const prodId = req.params.productId;
  //This is findAll approach
  //   Product.findAll({
  //     where: {
  //       id: prodId,
  //     },
  //   })
  //     .then((products) => {
  //       res.render("shop/product-detail", {
  //         product: products[0],
  //         pageTitle: products[0].title,
  //         path: "/products",
  //       });
  //     })
  //     .catch();

  // Built in findById method
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch();
};
const getIndex = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getIndex, getProducts, getProduct };
