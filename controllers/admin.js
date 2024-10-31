const Product = require("../models/product");

const getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

const getProducts = (req, res) => {
  req.user
    .getProducts()
    //  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
const getEditProduct = (req, res) => {
  const { productId } = req.params;
  req.user
    .getProducts({ where: { id: productId } }) // This searches for a product with same user.id implicitly and productId explicitly
    //   Product.findByPk(productId)
    .then((products) => {
      const product = products[0];
      res.render("admin/edit-product", {
        editing: true,
        product: product,
        pageTitle: "Edit Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
const postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  // since req.user is a row in User table, we can use createProduct which is a method created by sequelize because User.hasMany(Product) / Product.belongsTo(User) relation.
  //Perks, we don't need to explicitly provide userId.
  req.user
    .createProduct({
      title,
      description,
      imageUrl,
      price,
    })
    //   Product.create({
    //     title,
    //     description,
    //     imageUrl,
    //     price,
    //     userId: req.user.id, // We had to expilicitly provide user.id
    //   })
    .then((result) => {
      console.log(result);
      res.status(300).redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const postEditProduct = (req, res) => {
  console.log(req.body);
  const { productId, title, imageUrl, price, description } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      product.title = title;
      product.image = imageUrl;
      product.description = description;
      product.price = price;
      return product.save();
    })
    .then((result) => {
      console.log(result);
      res.status(300).redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
const postDeleteProduct = (req, res) => {
  const { prodId } = req.body;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log(result);
      res.status(300).redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getProducts,
  getAddProduct,
  getEditProduct,
  postAddProduct,
  postEditProduct,
  postDeleteProduct,
};
