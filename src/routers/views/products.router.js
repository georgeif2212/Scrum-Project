import { Router } from "express";
import ProductModel from "../../models/product.model.js";

const router = Router();


router.get("/products", async (req, res) => {
  const products = await ProductModel.find({});
  const plainProducts = products.map((product) => product.toObject()); // Convertir los
  res.render("products_list", {
    title: "Alta de productos 🖐️",
    products: plainProducts,
  });
});

router.get("/post/products", (req, res) => {
  res.render("post_product", { title: "Alta de productos 🖐️" });
});

router.get("/delete/products", (req, res) => {
  res.render("delete_product", { title: "Baja de productos 🖐️" });
});



export default router;
