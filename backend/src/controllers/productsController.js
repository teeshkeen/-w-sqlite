const { Product } = require('../config/database')

const productsController = {
  // Получить все продукты категории
  async getProductsByCategoryId(req, res) {
    try {
      const { categoryId } = req.params;
      const products = await Product.findAll({
        where: { categoryId: categoryId }
      });
      res.json({ products });
    } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Создать новый продукт
  async createProduct(req, res) {
    try {
      const { categoryId } = req.params;
      const productData = { ...req.body, categoryId };
      console.log('Creating product with data:', productData);
      
      const product = await Product.create(productData);
      console.log('Product created:', product);
      
      res.status(201).json({ product });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  },

  // Обновить продукт
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      await product.update(req.body);
      res.json({ product });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Удалить продукт
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      await product.destroy();
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = productsController;