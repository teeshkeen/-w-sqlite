const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { Product } = require('../config/database');
// Получить все продукты категории
router.get('/categories/:categoryId/products', productsController.getProductsByCategoryId);

// Создать новый продукт
router.post('/categories/:categoryId/products', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const productData = req.body;

    console.log('Received product data:', productData);

    // Проверка наличия необходимых полей
    if (!productData.name || !productData.costFirst || !productData.costSecond) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProduct = await Product.create({ ...productData, categoryId });
    console.log('New product created:', newProduct.toJSON());
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// Обновить продукт
router.put('/products/:id', productsController.updateProduct);

// Удалить продукт
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;