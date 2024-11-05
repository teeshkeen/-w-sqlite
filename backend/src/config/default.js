const path = require('path');
module.exports = {
  port: process.env.PORT || 5001,
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
    expiresIn: '1h'
  },
  database: {
    name: 'your_database_name',
    username: 'your_username',
    password: 'your_password',
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database', 'database', 'database.sqlite'),
  },
  uploads: {
    path: 'uploads/', // путь для сохранения файлов
    maxSize: 5 * 1024 * 1024, // максимальный размер файла в байтах (5MB)
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif'] // разрешенные типы файлов
  }
};