module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeCostFirst: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeCostSecond: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: { // Меняем image на imageUrl
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true // Добавляем валидацию URL
      }
    }
  });

  return Category;
};