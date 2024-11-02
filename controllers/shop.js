const Product = require("../models/product");

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

const getProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
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

const getCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render("shop/cart", {
        products: products,
        path: "/cart",
        pageTitle: "Your Cart",
      });
    })
    .catch();
};

const postCart = (req, res) => {
  const { productId } = req.body;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({
        where: {
          id: productId,
        },
      });
    })
    .then((products) => {
      let product;
      if (products.length > 0) product = products[0];

      //if the cart already has this product.
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity += oldQuantity;
        return product;
      }

      //if the cart doesn't have this product.
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
const postCartDeleteProduct = (req, res) => {
  const { productId } = req.body;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
module.exports = {
  getIndex,
  getProducts,
  getProduct,
  getCart,
  postCart,
  postCartDeleteProduct,
};
