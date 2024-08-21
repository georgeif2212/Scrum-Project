import { Router } from 'express';
import ProductModel from '../../models/product.model.js';
import DepartmentModel from '../../models/department.model.js';
import mongoose from 'mongoose';

const router = Router();

router.get('/products', async (req, res, next) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/products/:uid', async (req, res, next) => {
  try {
    const { params: { uid } } = req;
    const user = await ProductModel.findById(uid);
    if (!user) {
      return res.status(401).json({ message: `User id ${uid} not found 😨.` });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/products/', async (req, res, next) => {
  try {
    const { body } = req;
    const user = await ProductModel.create(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/products/:uid', async (req, res, next) => {
  try {
    const { body, params: { uid } } = req;
    await ProductModel.updateOne({ _id: uid }, { $set: body });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/products/:uid', async (req, res, next) => {
  try {
    const { params: { uid } } = req;
    await ProductModel.deleteOne({ _id: uid });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.post('/products/toDepartment', async (req, res, next) => {
  try {
    const { idProduct, keyDepartment } = req.body;
    if (!mongoose.Types.ObjectId.isValid(idProduct)) {
      return res.status(400).json({ message: 'ID del producto no es válido.' });
    }
    const department = await DepartmentModel.findOne({ keyDepartment });
    if (!department) {
      return res.status(404).json({ message: 'Clave del departamento no encontrada.' });
    }


    const product = await ProductModel.findById(idProduct);
    if (!product) {
      return res.status(404).json({ message: 'Id del producto no encontrada.' });
    }
    
    await ProductModel.updateOne(
      { _id: idProduct },
      { $set: { keyDepartment, price: -1 } }
    );

    res.status(200).json({ message: 'Producto asignado al departamento correctamente.' });
  } catch (error) {
    next(error);
  }
});

export default router;