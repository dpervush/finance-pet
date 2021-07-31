import Transaction from "./Transaction.js";

class TransactionService {
    async create(transaction) {
        const createdTransaction = await Transaction.create({...transaction});
        return createdTransaction;
    }

    async getAll() {
        const transactions = await Transaction.find();
        return transactions;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const transaction = await Transaction.findById(id);
        return transaction;
    }

    async update(transaction) {
        if (!transaction._id) {
            throw new Error('не указан ID')
        }
        const updatedTransaction = await Transaction.findByIdAndUpdate(transaction._id, transaction, {new: true})
        return updatedTransaction;
    }

    async delete(id) {
            if (!id) {
                throw new Error('не указан ID')
            }
            const transaction = await Transaction.findByIdAndDelete(id);
            return transaction;
    }
}


export default new TransactionService();
