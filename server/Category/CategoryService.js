import Category from "./Category.js";

class CategoryService {
    async create(category) {
        const createdCategory = await Category.create({...category});
        return createdCategory;
    }

    async getAll() {
        const categories = await Category.find();
        return categories;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const category = await Category.findById(id);
        return category;
    }

    async update(category) {
        if (!category._id) {
            throw new Error('не указан ID')
        }
        const updatedCategory = await Category.findByIdAndUpdate(category._id, category, {new: true})
        return updatedCategory;
    }

    async delete(id) {
            if (!id) {
                throw new Error('не указан ID')
            }
            const category = await Category.findByIdAndDelete(id);
            return category;
    }
}


export default new CategoryService();
