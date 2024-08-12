import { Router } from "express";
import ProductModel from "../../models/product.model.js";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/main");
});

router.get("/main", (req, res) => {
  res.render("main", { title: "Menu principal 🖐️" });
});

router.get("/products-main", (req, res) => {
  res.render("products_menu", { title: "Menu de productos 🖐️" });
});

export default router;
