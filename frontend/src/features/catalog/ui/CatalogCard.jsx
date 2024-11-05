import React from 'react'
import Button from '../../../shared/ui/Button'
import handleCardClick from '../../../shared/utils/scroll'

const CatalogCard = ({ title, cost, imageUrl }) => {
    return (
        <div onClick={handleCardClick} className="flex flex-col text-center h-full rounded overflow-hidden shadow-lg">
            <div className="relative pt-[75%]"> {/* 4:3 Aspect Ratio */}
                <img
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={imageUrl}
                    alt={title}
                />
            </div>
            <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                <div>
                    <div className="font-bold text-xl mb-2 line-clamp-2">{title}</div>
                    <p className="text-gray-700 text-base 768:text-lg">
                        до {cost} т.р. / кг
                    </p>
                </div>
                <div className="mt-4">
                    <Button text='Подробнее' />
                </div>
            </div>
        </div>
    )
}

export default CatalogCard