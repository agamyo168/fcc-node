const path = require("path");

const express = require("express");

const sequelize = require("./util/database");
const errorController = require("./controllers/error");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//This is a spicy way of passing the authenticated user in the back-end world I guess
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Associations:
//This is a relation that User created this product
//Cascade deletes product when user is deleted
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product); // a single user could create many products
//Cart Association:
User.hasOne(Cart);
Cart.belongsTo(User); // This is redundant since we already wrote User.hasOne(Cart)

Cart.belongsToMany(Product, { through: CartItem }); //through: the relation table
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem }); //redundant?
//THIS WILL SYNC DB WITH JS-> [Creating table and columns]
sequelize
  //   .sync({ force: true }) //We set {force: true} in Development only to drop existing tables and recreate them when setting relations
  .sync()
  .then(() => {
    return User.findByPk(1);
    //Start server only when DB sync is success.
  })
  .then((user) => {
    if (!user) {
      return User.create({ email: "drm@test.com" });
    }
    return Promise.resolve(user); //You can technically just return user since then will automatically wrap it with promise.resolve
  })
  .then((user) => {
    user.getCart().then((cart) => {
      if (!cart) {
        return user.createCart();
      }
    });
  })
  .then(
    app.listen(3000, () => {
      console.log("START LISTENING ON PORT 3000...");
    })
  )
  .catch((err) => console.log(err));
