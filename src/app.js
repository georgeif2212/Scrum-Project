import express from "express";
import handlebars from "express-handlebars";
import path from "path";

import productsRouter from "./routers/api/products.router.js";
import departmentsRouter from "./routers/api/departments.router.js";

import indexRouter from "./routers/views/index.router.js";
import productsViewsRouter from "./routers/views/products.router.js";
import departmentsViewsRouter from "./routers/views/departments.router.js";

import { __dirname } from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/", indexRouter, productsViewsRouter, departmentsViewsRouter);
app.use("/api", productsRouter, departmentsRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.log(message);

  res.render("error", { title: "Error", error: message });
});

export default app;
