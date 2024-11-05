import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import FeedbackSlide from './FeedbackSlide';
import feedbackData from '../api/feedbackData'

import 'swiper/css';
import 'swiper/css/pagination';

const FeedbackSlider = () => {
  return (
<Swiper
      slidesPerView={1}
      centeredSlides={false}
      spaceBetween={10}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
          centeredSlides: false,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 10,
          centeredSlides: false,
        },
        1920: {
          slidesPerView: 3,
          spaceBetween: 10,
          centeredSlides: false,
        }
      }}
      autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Autoplay, Pagination]}
      className='mb-16'
    >
      <div className="feedback-slider flex justify-center items-center">
            {feedbackData.map((feedback, id) => (
              <SwiperSlide>
                <FeedbackSlide 
                    key={id} // Используйте уникальный ключ, если возможно
                    avatar={feedback.avatar}
                    name={feedback.name}
                    date={feedback.date}
                    text={feedback.text}
                />
              </SwiperSlide>
            ))}
      </div>
    </Swiper>
  )
}

export default FeedbackSlider