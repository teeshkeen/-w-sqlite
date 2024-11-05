import React from 'react'

const FormButton = ({text, href, styles, fun, disabled}) => {
  return (
    <button onClick={()=>fun()} href={href} className={`ButtonFormSubmit cursor-pointer px-10 py-3 rounded-lg bg-green-600 hover:bg-button-hover transition-all text-base font-normal text-white 768:text-xl ${styles}`} disabled={!disabled}>{text}</button>
  )
}

export default FormButton