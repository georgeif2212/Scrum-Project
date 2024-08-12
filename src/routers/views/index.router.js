import { Router } from "express";
import ProductModel from '../../models/product.model.js';

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Hello People 🖐️" });
});

router.get("/main", (req, res) => {
  res.render("menu_main", { title: "Menu principal 🖐️" });
});

router.get("/menu-products", (req, res) => {
  res.render("menu_productos", { title: "Menu de productos 🖐️" });
});

router.get("/products", (req, res) => {
  res.render("alta_producto", { title: "Alta de productos 🖐️" });
});

router.get("/products-delete", (req, res) => {
  res.render("baja_producto", { title: "Baja de productos 🖐️" });
});

router.get("/products-list", async (req, res) => {
  const products = await ProductModel.find({});
  const plainProducts = products.map((product) => product.toObject()); // Convertir los
  res.render("products_list", {
    title: "Alta de productos 🖐️",
    products: plainProducts,
  });
});

export default router;
