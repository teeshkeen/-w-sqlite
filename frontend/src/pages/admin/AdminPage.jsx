import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryAPI, productAPI } from '../../shared/services/api';
import CategoryModal from '../../features/admin-panel/category/CategoryModal';
import ProductModal from '../../features/admin-panel/product/ProductModal';

const AdminPage = () => {
  const [categories, setCategories] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    name: '',
    cost: '',
    typeCostFirst: '',
    typeCostSecond: '',
    imageUrl: ''
  });
  const [currentCategoryProducts, setCurrentCategoryProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      loadCategories();
    }
  }, [navigate]);

  const loadCategories = async () => {
    try {
      const response = await categoryAPI.getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error loading categories:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentCategory.id) {
        console.log('Updating category:', currentCategory);
        await categoryAPI.updateCategory(currentCategory.id, currentCategory);
      } else {
        await categoryAPI.createCategory(currentCategory);
      }
      loadCategories();
      setIsCategoryModalOpen(false);
      resetCategoryForm();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category: ' + (error.response?.data?.message || error.message));
    }
  };

  const resetCategoryForm = () => {
    setCurrentCategory({
      name: '',
      cost: '',
      typeCostFirst: '',
      typeCostSecond: '',
      imageUrl: ''
    });
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await categoryAPI.deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleOpenProductModal = async (categoryId) => {
    try {
      const response = await productAPI.getProductsByCategoryId(categoryId);
      setCurrentCategoryProducts(response.data.products);
      setCurrentCategory({...currentCategory, id: categoryId});
      setIsProductModalOpen(true);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const newProduct = await productAPI.createProduct(currentCategory.id, product);
      setCurrentCategoryProducts(prevProducts => [...prevProducts, newProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Ошибка при добавлении продукта: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdateProduct = async (product) => {
    try {
      await productAPI.updateProduct(product.id, product);
      const response = await productAPI.getProductsByCategoryId(currentCategory.id);
      setCurrentCategoryProducts(response.data.products);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productAPI.deleteProduct(id);
      const response = await productAPI.getProductsByCategoryId(currentCategory.id);
      setCurrentCategoryProducts(response.data.products);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <button onClick={() => setIsCategoryModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Category
      </button>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center py-2">
            <span>{category.name}</span>
            <div>
              <button onClick={() => handleEditCategory(category)} className="mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                Edit
              </button>
              <button onClick={() => handleDeleteCategory(category.id)} className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Delete
              </button>
              <button onClick={() => handleOpenProductModal(category.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                Products
              </button>
            </div>
          </li>
        ))}
      </ul>
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        category={currentCategory}
        onChange={handleCategoryInputChange}
        onSubmit={handleCategorySubmit}
      />
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        categoryId={currentCategory.id}
        products={currentCategoryProducts}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default AdminPage;