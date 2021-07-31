import TransactionService from "./TransactionService.js";

class TransactionController {
    async create(req, res) {
        try {
            const transaction = await TransactionService.create(req.body)
            res.json(transaction)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const transactions = await TransactionService.getAll();
            return res.json(transactions);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const transaction = await TransactionService.getOne(req.params.id)
            return res.json(transaction)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const updatedTransaction = await TransactionService.update(req.body);
            return res.json(updatedTransaction);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
            const transaction = await TransactionService.create(req.params.id);
            return res.json(transaction)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


export default new TransactionController();
