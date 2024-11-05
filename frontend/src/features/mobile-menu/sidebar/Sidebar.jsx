import React from 'react'

const SideBar = ({isOpen = true, onClose}) => {
  return (
<>
    <div className={`${isOpen ? 'flex' : 'hidden'}`}>
       <div className={`absolute left-0 right-0 bg-sidebar-full-w opacity-100 z-10 h-screen`}/>
       <div className={`text-black z-30 absolute top-0 left-0 ${isOpen ? 'flex flex-col' : 'hidden'}`}>
        <div className=" flex flex-row mb-10">
        {/* <div className="font-gilroyMedium text-2xl 768:text-3xl">УралПлата.рф</div> */}
        </div>
          <div className="font-gilroyLight text-base mb-10 768:text-lg">
            <ul className='space-y-5'>
              <li><a onClick={onClose} className='hover:text-gray-400' href="/">Главная</a></li>
              <li><a onClick={onClose} className='hover:text-gray-400' href="/#about">О компании</a></li>
              <li><a onClick={onClose} className='hover:text-gray-400' href="/#catalog">Каталог</a></li>
              <li><a onClick={onClose}  href='/#feedback' className='hover:text-gray-400' >Отзывы</a></li>
              <li><a onClick={onClose} href='/#contacts' className='hover:text-gray-400'>Контакты</a></li>
            </ul>
          </div>

          <div className="font-gilroyLight text-base 768:text-lg">
            <ul className='space-y-2'>
              <li className='hover:text-gray-400'>+7 (351) 776-70-13</li>
              <li className='hover:text-gray-400'>uralplata74@yandex.ru</li>
            </ul>
          </div>
        </div>
       <div className={`text-black sidebar-full-w absolute z-20 min-h-[250vh] ${isOpen ? 'flex' : 'hidden'}`}/>
    </div>
    </>
  )
}

export default SideBar