import { Router } from "express";
import ProductManager from "../DAL/DAOs/products/ProductManagerMongo.js";
import CartManager from "../DAL/DAOs/cats/CartManagerMongo.js";
import UsersManager from "../DAL/DAOs/users/UsersManagerMongo.js";
import { auth, isLogged, jwtAuth, jwtAuthCookie } from "../controller/auth.middleware.js";

const router = Router();
const usersManager = new UsersManager();

router.get("/chat", (req, res) => {
    res.render("chat", {
        title: "Chat",
        StyleSheet: "chat.css",
    });
});

// Ruta para visualizar todos los productos
router.get("/products", auth, async (req, res) => {
    // console.log("1 REQ: ", req);
    // console.log("2 REQUSER: ", req.user);

    const { first_name, last_name, email, age, role } = req.user;
    // const userLogged = await usersManager.getUserById(userId);
    // const { first_name, last_name, email, age } = userLogged;

    const productManager = new ProductManager();
    const products = await productManager.getProducts(2);

    res.render("products", {
        products,
        first_name,
        last_name,
        email,
        age,
        isAdmin,
        role,
    });
});

// Ruta para visualizar todos los productos con paginación
router.get("/products/page/:page", jwtAuthCookie, async (req, res) => {
    const page = req.params.page || 1;

    const productManager = new ProductManager();
    const products = await productManager.getProducts(2, page);
    // console.log(products);

    res.render("products", { products });
});

// Ruta para visualizar un producto en particular
router.get("/products/:id", jwtAuthCookie, async (req, res) => {
    const productManager = new ProductManager();
    const product = await productManager.getProductById(req.params.id);

    // console.log(product);

    const { _id, title, description, price, code, stock, category, thumbnail } =
        product;

    res.render("product", {
        id: _id,
        title,
        description,
        price,
        code,
        stock,
        category,
        thumbnail,
    });
});

// Ruta para visualizar el carrito de compras
router.get("/carts/:cid", async (req, res) => {
    const cartManager = new CartManager();
    const cart = await cartManager.getCartById(req.params.cid);

    const { products } = cart;

    res.render("cart", { products });
});

// Ruta registro de usuario
router.get("/register", isLogged, (req, res) => {
    res.render("register");
});

// Ruta login de usuario
router.get("/login", isLogged, (req, res) => {
    res.render("login");
});

// Ruta perfil de usuario
router.get("/profile", jwtAuthCookie, async (req, res) => {
    const { first_name, last_name, email, age, role } = req.user;
    // const { userId, isAdmin, role } = req.session;
    // const userLogged = await usersManager.getUserById(userId);
    // const { first_name, last_name, email, age } = userLogged;
    res.render("profile", { first_name, last_name, email, age, role });
});

// Ruta Error de registro
router.get("/errorRegister", (req, res) => {
    res.render("errorRegister");
});

// Ruta Error de login
router.get("/errorLogin", (req, res) => {
    res.render("errorLogin");
});

export default router;
