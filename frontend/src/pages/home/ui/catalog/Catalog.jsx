import React, { useState, useEffect } from 'react';
import { categoryAPI } from '../../../../shared/services/api';
import BlockTitle from '../../../../shared/ui/BlockTitle';
import CatalogCard from '../../../../features/catalog/ui/CatalogCard';
import CatalogNav from '../catalog/ui/CatalogNav'
import { useNavigate } from 'react-router-dom';
const Catalog = () => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
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

  const handleCardClick = (id) => {
    navigate(`/nomenclature/${id}`); // Переход на страницу nomenclature с id категории
  };

  return (
    <div id='catalog' className='mb-14 768:mb-24'>
    <div className='mb-5'>
      <BlockTitle>Каталог</BlockTitle>
    </div>
    <div className="1280:flex 1280:flex-row 1280:justify-between 1280:items-start 1280:gap-14">
      <CatalogNav styles='hidden 1280:flex'/>
      <div id='catalogCards' className='grid grid-cols-1 768:grid-cols-2 1280:grid-cols-3 1440:grid-cols-4 1920:grid-cols-5 gap-4 auto-rows-fr
                    '>
                      {categories.map(category => (
          <div key={category.id} onClick={() => handleCardClick(category.id)}>
            <CatalogCard name={category.name} title={category.name} cost={category.cost} imageUrl={category.imageUrl} /> {/* Pass category name and image to CatalogCard */}
          </div>
        ))}
    </div>
    </div>
    
  </div>
    
  );
};

export default Catalog;
