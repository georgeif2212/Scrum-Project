import { Router } from "express";
import ProductModel from "../../models/product.model.js";

const router = Router();


router.get("/products", async (req, res) => {
  const products = await ProductModel.find({});
  const plainProducts = products.map((product) => product.toObject()); // Convertir los
  res.render("./products/products_list", {
    title: "Alta de productos 🖐️",
    products: plainProducts,
  });
});

router.get("/post/products", (req, res) => {
  res.render("./products/post_product", { title: "Alta de productos 🖐️" });
});

router.get("/delete/products", (req, res) => {
  res.render("./products/delete_product", { title: "Baja de productos 🖐️" });
});


router.get("/update/products/department", (req, res) => {
  res.render("./products/update_product_to_department", { title: "Alta de productos a departamento🖐️" });
});

router.get("/delete/products/department", (req, res) => {
  res.render("./products/delete_product_to_department", { title: "Baja de productos a departamento🖐️" });
});

router.get("/products/assign-price", (req, res) => {
  res.render("./products/assign_price_to_product", { title: "Asignar precio a producto 💰" });
});

export default router;
