import { Router } from "express";
import ProductModel from "../../models/product.model.js";
import DepartmentModel from "../../models/department.model.js";
import mongoose from "mongoose";

const router = Router();

router.get("/products", async (req, res, next) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/products/:uid", async (req, res, next) => {
  try {
    const {
      params: { uid },
    } = req;
    const user = await ProductModel.findById(uid);
    if (!user) {
      return res.status(401).json({ message: `User id ${uid} not found 😨.` });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/products/", async (req, res, next) => {
  try {
    const { body } = req;
    const user = await ProductModel.create(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/products/:uid", async (req, res, next) => {
  try {
    const {
      body,
      params: { uid },
    } = req;
    await ProductModel.updateOne({ _id: uid }, { $set: body });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete("/products/:uid", async (req, res, next) => {
  try {
    const {
      params: { uid },
    } = req;
    await ProductModel.deleteOne({ _id: uid });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.post("/products/toDepartment", async (req, res, next) => {
  try {
    const { idProduct, keyDepartment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(idProduct)) {
      return res.status(400).render("error", {
        title: "Error 😨",
        messageError: "ID del producto no es válido."
      });
    }

    const department = await DepartmentModel.findOne({ keyDepartment });
    if (!department) {
      return res.status(404).render("error", {
        title: "Error 😨",
        messageError: `Clave del departamento "${keyDepartment}" no encontrada.`
      });
    }

    const product = await ProductModel.findById(idProduct);
    if (!product) {
      return res.status(404).render("error", {
        title: "Error 😨",
        messageError: `ID "${idProduct}" del producto no encontrado.`
      });
    }

    await ProductModel.updateOne(
      { _id: idProduct },
      { $set: { keyDepartment, price: -1 } }
    );

    res.render("notificacion", {
      title: "Éxito 🥳",
      message: `Producto con id: "${idProduct}" asignado al departamento "${keyDepartment}" correctamente.`
    });
  } catch (error) {
    next(error);
  }
});


router.post("/delete/products/toDepartment", async (req, res, next) => {
  try {
    const { idProduct, keyDepartment } = req.body;

    const department = await DepartmentModel.findOne({ keyDepartment });
    if (!department) {
      return res.status(404).render("error", {
        title: "Error 😨",
        messageError: `Clave del departamento "${keyDepartment}" no encontrada.`
      });
    }

    const product = await ProductModel.findOne({
      _id: idProduct,
      keyDepartment,
    });
    if (!product) {
      return res.status(404).render("error", {
        title: "Error 😨",
        messageError: "Producto no encontrado en el departamento especificado."
      });
    }

    await ProductModel.updateOne(
      { _id: idProduct },
      { $unset: { keyDepartment: "" } }
    );

    res.render("notificacion", {
      title: "Éxito 🥳",
      message: `Asociación del producto "${idProduct}" con el departamento "${keyDepartment}" eliminada exitosamente.`
    });
  } catch (error) {
    next(error);
  }
});


router.post("/products/assignPrice", async (req, res, next) => {
  try {
    const { keyDepartment, idProduct, price } = req.body;

    // Verificar si el departamento existe
    const department = await DepartmentModel.findOne({ keyDepartment });
    if (!department) {
      return res.status(404).render("error", {
        title: "Error 😨",
        messageError: `Clave del departamento "${keyDepartment}" no encontrada.`
      });
    } 

    // Verificar si el producto existe y pertenece al departamento
    const product = await ProductModel.findOne({
      _id: idProduct,
      keyDepartment,
    });
    if (!product) {
      return res.status(404).render("error", {
        title: "Error 😨",
        messageError: "Producto no encontrado en el departamento especificado."
      });
    }

    // Asignar el precio al producto
    await ProductModel.updateOne({ _id: idProduct }, { $set: { price } });

    res.render("notificacion", {
      title: "Éxito 🥳",
      message: `Precio "${price}" asignado exitosamente al producto con id "${idProduct}".`
    });
  } catch (error) {
    next(error);
  }
});

router.post("/products/by-department", async (req, res, next) => {
  try {
    const { keyDepartment } = req.body;

    // Verificar si el departamento existe
    const department = await DepartmentModel.findOne({ keyDepartment });
    if (!department) {
      return res.status(404).render("error", {
        title: "Error 😨",
        messageError: `Clave del departamento ${keyDepartment} no encontrada.`
      });
    }

    // Buscar productos en el departamento especificado
    const products = await ProductModel.find({ keyDepartment });
    const plainProducts = products.map((product) => product.toObject());

    res.render("./products/products_list", {
      title: "Consulta de productos 🛒",
      products: plainProducts,
    });
  } catch (error) {
    next(error);
  }
});


export default router;
