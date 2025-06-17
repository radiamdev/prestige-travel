'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

interface GalleryBlockProps {
  images: string[]
  alt: string
}

export default function GalleryBlock({ images, alt }: GalleryBlockProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="w-full h-full overflow-hidden"
    >
      {images.map((img, index) => (
        <SwiperSlide key={img}>
          <img
            src={`/galleries/${img}`}
            alt={`${alt} ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
