import { Router } from "express";
import DepartmentModel from "../../models/department.model.js";

const router = Router();


router.get("/departments", async (req, res) => {
  const departments = await DepartmentModel.find({});
  const plainDepartments = departments.map((department) => department.toObject()); // Convertir los
  res.render("departments_list", {
    title: "Alta de departamentos 🖐️",
    departments: plainDepartments,
  });
});

router.get("/post/departments", (req, res) => {
  res.render("post_department", { title: "Alta de departamentos 🖐️" });
});

router.get("/delete/departments", (req, res) => {
  res.render("delete_department", { title: "Baja de departamentos 🖐️" });
});



export default router;
