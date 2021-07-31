import Card from "./Card.js";

class CardService {
    async create(card, picture) {
        const createdCard = await Card.create({...card});
        return createdCard;
    }

    async getAll() {
        const cards = await Card.find();
        return cards;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const card = await Card.findById(id);
        return card;
    }

    async update(card) {
        if (!card._id) {
            throw new Error('не указан ID')
        }
        const updatedCard = await Card.findByIdAndUpdate(card._id, card, {new: true})
        return updatedCard;
    }

    async delete(id) {
            if (!id) {
                throw new Error('не указан ID')
            }
            const card = await Card.findByIdAndDelete(id);
            return card;
    }
}


export default new CardService();
