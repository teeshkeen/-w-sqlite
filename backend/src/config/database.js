const Sequelize = require('sequelize');
const path = require('path');
const config = require('./default');

// Определяем путь к файлу базы данных
const dbPath = path.join(__dirname, '../database', 'database', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath, // Указываем путь к файлу базы данных
  logging: console.log, // Включаем логирование SQL-запросов
  ...config.database, // Добавляем остальные настройки из конфига
});

const Category = require('../models/Category')(sequelize, Sequelize.DataTypes);
const Product = require('../models/Product')(sequelize, Sequelize.DataTypes);

// Определение связей
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = {
  sequelize,
  Category,
  Product
};