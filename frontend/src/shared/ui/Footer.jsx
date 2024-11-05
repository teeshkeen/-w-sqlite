import React from 'react'

const Footer = () => {
    const today = new Date();
    
    return (
        <div className='relative text-white'>
            <div className="bg-color-full-w"></div>
            <div className="relative py-10 768:px-5">
                <div className="mb-14 space-y-10 768:flex 768:flex-row 768:justify-between 768:items-start 768:space-y-0 768:mb-24">
                    <div className="">
                        <div className="mb-5 text-lg 768:text-xl">Меню</div>
                        <ul className='font-gilroyLight text-base space-y-2 768:text-lg'>
                            <li><a className='hover:text-gray-400' href="/">Главная</a></li>
                            <li><a className='hover:text-gray-400' href="/#about">О компании</a></li>
                            <li><a className='hover:text-gray-400' href="/#catalog">Каталог</a></li>
                            <li><a className='hover:text-gray-400' href="/#feedback">Отзывы</a></li>
                            <li><a className='hover:text-gray-400' href="/#contacts">Контакты</a></li>
                        </ul>
                    </div>

                    <div className="">
                        <div className="mb-5 text-lg 768:text-xl">Контакты</div>
                        <ul className='font-gilroyLight text-base space-y-2 768:text-lg'>
                            <li><a className='hover:text-gray-400' href="tel:+73517767013">+7 (351) 776-70-13</a></li>
                            <li><a className='hover:text-gray-400' href="mailto:uralplata74@yandex.ru">uralplata74@yandex.ru</a></li>
                        </ul>
                    </div>

                    <div className="">
                        <div className="mb-5 text-lg 768:text-xl">Адрес</div>
                        <ul className='font-gilroyLight text-base space-y-2 768:text-lg'>
                            <li>г. Челябинск</li>
                            <li>
                                <ul className='space-y-1'>
                                    <li>пер. Ужгородский, д. 23/1</li>
                                    <li>Круглосуточно</li>
                                </ul>
                            </li>
                            <li>
                                <ul className='space-y-1'>
                                    <li>ул. Шоссе металлургов д. 78</li>
                                    <li>Пн-Пт 9:00 — 18:00</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center">
                    <div className="font-gilroyLight text-base 768:text-lg">Copyright © 2019 - <span>{today.getFullYear()}</span></div>
                    <div className="text-lg 768:text-xl">УралПлата</div>
                    <div className="text-sm text-gray-400"><a href="https://t.me/teeshkeen">site created by teeshkeen</a></div>
                </div>
            </div>
        </div>
    )
}

export default Footer