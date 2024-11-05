import React from 'react'
import price from '../../../../../assets/images/test4.svg'
import ship from '../../../../../assets/images/test3.svg'
import secure from '../../../../../assets/images/test2.svg'
import hand from '../../../../../assets/images/test.svg'

const QualitiesCard = ({title = "Random", desc = "Lorem epsilum xyepsilvLorem epsilum xyepsilvLorem epsilum xyepsilv", image = 1}) => {
  return (
    <div className='flex flex-col mx-auto items-center text-center space-y-2 max-w-little-qualities-card 768:max-w-qualities-card'>
      {
        (() => {
          if (image === 1) {
            return (
              <img className='768:max-w-28 size-32' src={hand} alt="" />
            )
          } else if (image === 2) {
            return (
              <img className='768:max-w-28 size-32' src={secure} alt="" />
            )
          } else if (image === 3) {
            return ( 
              <img className='768:max-w-28 size-32' src={ship} alt="" />
            )
          } else {
            return (
              <img className='768:max-w-28 size-32' src={price} alt="" />
            )
          }
        })()
      }
        <span className='768:text-xl'>{title}</span>
        <p className='leading-5 768:text-lg'>{desc}</p>
    </div>
  )
}

export default QualitiesCard