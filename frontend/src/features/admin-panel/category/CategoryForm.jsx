import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    typeCostFirst: '',
    typeCostSecond: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        cost: category.cost,
        typeCostFirst: category.typeCostFirst,
        typeCostSecond: category.typeCostSecond,
        image: null
      });
      if (category.image) {
        setPreviewImage(category.image);
      }
    }
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Название категории"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="cost"
        value={formData.cost}
        onChange={handleInputChange}
         placeholder="Стоимость"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="typeCostFirst"
        value={formData.typeCostFirst}
        onChange={handleInputChange}
        placeholder="Тип стоимости 1"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="typeCostSecond"
        value={formData.typeCostSecond}
        onChange={handleInputChange}
        placeholder="Тип стоимости 2"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      {previewImage && (
        <img src={previewImage} alt="Preview" className="w-full h-48 object-cover rounded" />
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        {category ? 'Обновить' : 'Добавить'}
      </button>
      <button
        onClick={onCancel}
        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Отмена
      </button>
    </form>
  );
};

export default CategoryForm;