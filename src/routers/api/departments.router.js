import { Router } from "express";
import DepartmentModel from "../../models/department.model.js";

const router = Router();

router.get("/departments", async (req, res, next) => {
  try {
    const departments = await DepartmentModel.find({});
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
});

router.get("/departments/:uid", async (req, res, next) => {
  try {
    const {
      params: { uid },
    } = req;
    const department = await DepartmentModel.findById(uid);
    if (!department) {
      return res
        .status(401)
        .json({ message: `department id ${uid} not found 😨.` });
    }
    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
});

router.post("/departments/", async (req, res, next) => {
  try {
    const { body } = req;
    const department = await DepartmentModel.create(body);
    res.status(201).json(department);
  } catch (error) {
    next(error);
  }
});

router.put("/departments/:uid", async (req, res, next) => {
  try {
    const {
      body,
      params: { uid },
    } = req;
    await DepartmentModel.updateOne({ _id: uid }, { $set: body });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete("/departments", async (req, res, next) => {
  try {
    // Obtiene la keyDepartment del cuerpo de la solicitud
    const { keyDepartment } = req.body;

    // Valida que keyDepartment esté presente
    if (!keyDepartment) {
      return res
        .status(400)
        .json({ error: "La clave del departamento es requerida" });
    }

    // * Elimina el departamento usando keyDepartment
    const result = await DepartmentModel.deleteOne({ keyDepartment });

    // Si no se encuentra el departamento
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Departamento no encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
