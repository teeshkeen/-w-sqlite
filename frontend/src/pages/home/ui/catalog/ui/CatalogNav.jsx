import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryAPI } from '../../../../../shared/services/api';
import CatalogNavItem from '../../../../../features/catalog/ui/CatalogNavItem';
const CatalogNav = ({styles = ''}) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()
  const handleCardClick = (id) => {
    navigate(`/nomenclature/${id}`); // Переход на страницу nomenclature с id категории
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryAPI.getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  return (
    <div className={`flex flex-col bg-white p-5 rounded-lg min-w-64 shadow-lg ${styles}`}>
        <ul>
            {categories.map(category => (
            <li key={category.id} onClick={() => handleCardClick(category.id)}>
              <CatalogNavItem title={category.name}/> {/* Pass category name and image to CatalogCard */}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default CatalogNav;