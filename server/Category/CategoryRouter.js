import Router from 'express'
import CategoryController from "./CategoryController.js";

const router = new Router()

router.post('/categories', CategoryController.create)
router.get('/categories', CategoryController.getAll)
router.get('/categories/:id', CategoryController.getOne)
router.put('/categories', CategoryController.update)
router.delete('/categories/:id', CategoryController.delete)

export default router;
