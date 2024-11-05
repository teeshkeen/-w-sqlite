import React from 'react'

const NavItem = ({ id, children, isRouting = true}) => {
  return (
    <div>
      {isRouting ? <a href={`/#${id}`} className='hover:text-gray-400'>{children}</a> : <a href={`#${id}`} className='hover:text-gray-400'>{children}</a>}
    </div>
  )
}

export default NavItem