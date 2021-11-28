const { Op } = require("sequelize");
const {
  AccountTransactions,
  TransactionInfo,
  CardInfo,
  CategoryInfo,
  AccountCards,
  AccountCategories,
} = require("../models");
const cardsService = require("./cardsService");

class TransactionService {
  async create({ title, type, amount, date, cardId, categoryId, accountId }) {
    const createdTransaction = await AccountTransactions.create({
      accountId,
      accountCardId: cardId,
      accountCategoryId: categoryId,
    });

    const transactionInfo = await TransactionInfo.create({
      title,
      amount,
      type,
      date,
      accountTransactionId: createdTransaction.id,
    });

    const cardBalance = await AccountCards.findByPk(cardId, {
      attributes: [],
      include: [
        {
          model: CardInfo,
          required: true,
          attributes: ["createdAt", "updatedAt", "balance"],
        },
      ],
    });

    const transactionAmount = type === "Income" ? amount : -amount;

    await cardsService.update({
      id: cardId,
      balance: cardBalance.card_info.balance + +transactionAmount,
    });

    return { ...createdTransaction.dataValues, ...transactionInfo.dataValues };
  }

  async getAll(accountId, cardId, categoryId, type, page, size) {
    // todo: check if might be deleted
    const transactionIds = await AccountTransactions.findAll({
      where: { accountId },
    });

    const transactions = await AccountTransactions.findAndCountAll({
      attributes: ["id"],
      where: { accountId },
      limit: size * page,
      include: [
        {
          model: AccountCards,
          required: true,
          include: {
            model: CardInfo,
            required: true,
            attributes: {
              exclude: ["createdAt", "updatedAt", "accountCardId", "id"],
            },
            where: cardId ? { id: cardId } : {},
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "accountId"],
          },
        },
        {
          model: AccountCategories,
          required: true,
          include: {
            model: CategoryInfo,
            required: true,
            attributes: {
              exclude: ["createdAt", "updatedAt", "accountCategoryId", "id"],
            },
            where: categoryId ? { id: categoryId } : {},
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "accountId"],
          },
        },
        {
          model: TransactionInfo,
          required: true,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id", "accountTransactionId"],
          },
          where: type ? { type } : {},
        },
      ],
    });

    return transactions;
  }
  async getLast(accountId) {
    const transactions = await AccountTransactions.findAll({
      attributes: ["id"],
      where: { accountId },
      limit: 3,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: AccountCards,
          required: true,
          include: {
            model: CardInfo,
            required: true,
            attributes: {
              exclude: ["createdAt", "updatedAt", "accountCardId", "id"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "accountId"],
          },
        },
        {
          model: AccountCategories,
          required: true,
          include: {
            model: CategoryInfo,
            required: true,
            attributes: {
              exclude: ["createdAt", "updatedAt", "accountCategoryId", "id"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "accountId"],
          },
        },
        {
          model: TransactionInfo,
          required: true,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id", "accountTransactionId"],
          },
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
          required: true,
          include: {
            model: CardInfo,
            required: true,
            attributes: {
              exclude: ["createdAt", "updatedAt", "accountCardId", "id"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "accountId"],
          },
        },
        {
          model: AccountCategories,
          required: true,
          include: {
            model: CategoryInfo,
            required: true,
            attributes: {
              exclude: ["createdAt", "updatedAt", "accountCategoryId", "id"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "accountId"],
          },
        },
        {
          model: TransactionInfo,
          required: true,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id", "accountTransactionId"],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "accountId",
          "accountCardId",
          "accountCategoryId",
        ],
      },
    });
    return transaction;
  }
  async update({ id, title, amount, date, type, cardId, categoryId }) {
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

    const [oldAmount, oldType] = await this.getOne(id).then((res) => [
      res.transaction_info.amount,
      res.transaction_info.type,
    ]);

    console.log(oldAmount);

    await TransactionInfo.update(
      { title, amount, date, type },
      {
        where: { accountTransactionId: id },
      }
    );

    const cardBalance = await AccountCards.findByPk(cardId, {
      attributes: [],
      include: [
        {
          model: CardInfo,
          required: true,
          attributes: ["createdAt", "updatedAt", "balance"],
        },
      ],
    });

    const transactionNewAmount = type === "Income" ? amount : -amount;
    const transactionOldAmount = oldType === "Income" ? oldAmount : -oldAmount;

    await cardsService.update({
      id: cardId,
      balance:
        cardBalance.card_info.balance +
        +transactionNewAmount -
        transactionOldAmount,
    });

    const updatedTransaction = await this.getOne(id);

    return updatedTransaction;
  }
  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }

    const transaction = await AccountTransactions.findByPk(id, {
      attributes: ["accountCardId"],
      include: {
        model: TransactionInfo,
        required: true,
        attributes: ["amount", "type"],
      },
    });

    const transactionAmount =
      transaction.transaction_info.type === "Income"
        ? transaction.transaction_info.amount
        : -transaction.transaction_info.amount;

    const cardBalance = await AccountCards.findByPk(transaction.accountCardId, {
      attributes: [],
      include: [
        {
          model: CardInfo,
          required: true,
          attributes: ["createdAt", "updatedAt", "balance"],
        },
      ],
    });

    console.log(transactionAmount);

    await cardsService.update({
      id: transaction.accountCardId,
      balance: cardBalance.card_info.balance - transactionAmount,
    });

    const transactionToDelete = await AccountTransactions.findByPk(id);

    return await transactionToDelete
      .destroy()
      .then(() => "ok")
      .catch(() => "error");
  }
}

module.exports = new TransactionService();
