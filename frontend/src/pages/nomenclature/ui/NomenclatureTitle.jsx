import React from 'react'

const NomenclatureTitle = ({title = 'Конденсаторы', cost = '50 000'}) => {
  return (
    <div className='mb-5 mt-10 768:mb-10'>
        <div className="font-gilroyMedium text-2xl">{title}</div>
        <div className="font-gilroyLight text-base">Оптовые цены от {cost} тысяч рублей</div>
    </div>
  )
}

export default NomenclatureTitle