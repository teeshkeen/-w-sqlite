const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/default');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const categoriesController = require('./controllers/categoriesController');
const { sequelize } = require('./config/database');
const categoriesRoutes = require('./routes/categories');

const app = express();

// Расширенная настройка CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200

  
}));

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// логирование 

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то пошло не так!');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Добавляем middleware для логирования запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API маршруты
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api', productsRoutes);
// Маршруты для категорий с добавленным логированием
app.get('/api/categories', (req, res, next) => {
  console.log('Получен запрос на получение категорий');
  categoriesController.getCategories(req, res, next);
});
app.use('/api/categories', categoriesRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

app.get('/api/categories/:id', (req, res, next) => {
  console.log(`Получен запрос на получение категории с id: ${req.params.id}`);
  categoriesController.getCategory(req, res, next);
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то пошло не так!');
});

// Раздача статических файлов в production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
  });
}

// Запуск сервера на фиксированном порту
const PORT = process.env.PORT || 5001;

// В backend/src/index.js
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });



// Обработка необработанных ошибок
process.on('unhandledRejection', (err) => {
  console.log('Необработанная ошибка:', err);
});