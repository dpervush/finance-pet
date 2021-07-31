import Router from 'express'
import TransactionController from "./TransactionController.js";

const router = new Router()

router.post('/transactions', TransactionController.create)
router.get('/transactions', TransactionController.getAll)
router.get('/transactions/:id', TransactionController.getOne)
router.put('/transactions', TransactionController.update)
router.delete('/transactions/:id', TransactionController.delete)

export default router;
