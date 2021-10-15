const {
  AccountTransactions,
  TransactionInfo,
  CardInfo,
  CategoryInfo,
  AccountCards,
  AccountCategories,
} = require("../models");

class TransactionService {
  async create({ title, amount, cardId, categoryId, accountId }) {
    const createdTransaction = await AccountTransactions.create({
      accountId,
      accountCardId: cardId,
      accountCategoryId: categoryId,
    });

    const transactionInfo = await TransactionInfo.create({
      title,
      amount,
      accountTransactionId: createdTransaction.id,
    });

    return { ...createdTransaction.dataValues, ...transactionInfo.dataValues };
  }

  async getAll(accountId) {
    // todo: check if might be deleted
    const transactionIds = await AccountTransactions.findAll({
      where: { accountId },
    });

    const transactions = await AccountTransactions.findAll({
      attributes: ["id", "accountId"],
      where: { accountId },
      include: [
        {
          model: AccountCards,
          include: {
            model: CardInfo,
          },
        },
        {
          model: AccountCategories,
          include: {
            model: CategoryInfo,
          },
        },
        {
          model: TransactionInfo,
        },
      ],
    });

    return transactions;
  }
  async getOne(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const transaction = await AccountTransactions.findByPk(id, {
      include: [
        {
          model: AccountCards,
          include: {
            model: CardInfo,
          },
        },
        {
          model: AccountCategories,
          include: {
            model: CategoryInfo,
          },
        },
        {
          model: TransactionInfo,
          required: true,
        },
      ],
    });
    return transaction;
  }

  async update({ id, title, amount, date, cardId, categoryId }) {
    if (!id) {
      throw new Error("не указан ID");
    }

    if (cardId) {
      await AccountTransactions.update(
        { accountCardId: cardId },
        { where: { id } }
      );
    }

    if (categoryId) {
      await AccountTransactions.update(
        { accountCategoryId: categoryId },
        { where: { id } }
      );
    }

    await TransactionInfo.update(
      { title, amount, date },
      {
        where: { accountTransactionId: id },
      }
    );

    const updatedCard = this.getOne(id);

    return updatedCard;
  }

  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }

    const transaction = await AccountTransactions.findOne({
      where: { id },
    });

    return await transaction
      .destroy()
      .then(() => "ok")
      .catch(() => "error");
  }
}

module.exports = new TransactionService();
