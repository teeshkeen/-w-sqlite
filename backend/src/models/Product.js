module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true // Валидация URL
      }
    },
    countType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    costFirst: {
      type: DataTypes.STRING,
      allowNull: false
    },
    costSecond: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Product;
};