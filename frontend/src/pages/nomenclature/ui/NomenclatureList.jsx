import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categoryAPI, productAPI } from '../../../shared/services/api';
import NomenclatureCard from '../../../features/nomenclature/ui/NomenclatureCard';
import NomenclatureTitle from './NomenclatureTitle';

const NomenclatureList = () => {
  const [category, setCategory] = useState({
    name: '',
    cost: '',
    typeCostFirst: '',
    typeCostSecond: '',
    products: []
  });
  const { id } = useParams();

  useEffect(() => {
    loadCategoryAndProducts();
  }, [id]);

  const loadCategoryAndProducts = async () => {
    try {
      // Загрузка информации о категории
      const categoryResponse = await categoryAPI.getCategories();
      const currentCategory = categoryResponse.data.categories.find(cat => cat.id === parseInt(id));
      
      // Загрузка продуктов для категории
      const productsResponse = await productAPI.getProductsByCategoryId(id);
      
      setCategory({
        ...currentCategory,
        products: productsResponse.data.products
      });
      
    } catch (error) {
      console.error('Error loading category and products:', error);
    }
  };

  return (
    <>
      <NomenclatureTitle title={category.name} cost={category.cost} />
      <div className="">
        <div className='space-y-4 mb-16 1440:hidden'>
          {category.products.map(product => (
            <NomenclatureCard 
              key={product.id} 
              title={product.name} 
              desc={product.desc} 
              countType={product.countType} 
              typeCostFirst={category.typeCostFirst}
              typeCostSecond={category.typeCostSecond}
              image={product.imageUrl} 
              costFirst={product.costFirst} 
              costSecond={product.costSecond}
            />
          ))}
        </div>

        <div className="hidden w-min flex-col justify-start items-start gap-10 1440:inline-flex mb-16">
          <div className="self-stretch justify-start items-center gap-[60px] inline-flex">
            <div className="w-[260px] text-[#212121] text-xl font-gilroyMedium">Фото детали</div>
            <div className="justify-start items-center gap-5 flex">
              <div className="w-[380px] text-[#212121] text-xl font-gilroyMedium">Наименование</div>
              <div className="w-[220px] text-[#212121] text-xl font-gilroyMedium">Ед.Изм.</div>
              <div className="w-[220px] text-[#212121] text-xl font-gilroyMedium">{category.typeCostFirst}</div>
              <div className="w-[220px] text-[#212121] text-xl font-gilroyMedium">{category.typeCostSecond}</div>
            </div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-5 flex">
            {category.products.map(product => (
              <NomenclatureCard 
                key={product.id} 
                title={product.name} 
                desc={product.desc} 
                countType={product.countType} 
                typeCostFirst={category.typeCostFirst}
                typeCostSecond={category.typeCostSecond}
                image={product.imageUrl} 
                costFirst={product.costFirst} 
                costSecond={product.costSecond}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NomenclatureList;