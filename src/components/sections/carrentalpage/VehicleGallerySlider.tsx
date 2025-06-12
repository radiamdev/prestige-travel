import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

import blackTerracan from '../../../assets/images/car_rental/vehicles/black_terracan.webp'
import greyStarex   from '../../../assets/images/car_rental/vehicles/grey_starex.webp'
import greyTerracan from '../../../assets/images/car_rental/vehicles/grey_terracan.webp'
import whiteStarex from '../../../assets/images/car_rental/vehicles/white_starex.webp'
import yellowTerracan from '../../../assets/images/car_rental/vehicles/yellow_terracan.webp'

import ArrowLeftIcon from '../../../assets/icons/arrow_left.svg'
import ArrowRightIcon from '../../../assets/icons/arrow_right.svg'


const galleryImages = [
    { id: '1', src: blackTerracan },
    { id: '2', src: greyStarex},
    { id: '3', src: greyTerracan},
    { id: '4', src: whiteStarex},
    { id: '5', src: yellowTerracan},
    { id: '6', src: blackTerracan},
    { id: '7', src: whiteStarex},

]

const VehicleGallerySlider = () => {
    const swiperRef = useRef<SwiperType | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="w-full flex justify-center">
            <div className="relative z-0 w-full max-w-6xl !px-4 overflow-visible">
                <Swiper
                    onBeforeInit={(swiper) => (swiperRef.current = swiper)}
                    modules={[Autoplay]}
                    slidesPerView="auto"
                    loop={true}
                    centeredSlides={true}
                    spaceBetween={30} // ✅ padding between slides
                    autoplay={{
                        delay: 0, // ✅ autoplay without delay
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        stopOnLastSlide: false,
                        waitForTransition: false,
                    }}
                    speed={3000} // ✅ smooth continuous scrolling
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    className="overflow-visible !pt-16 !pb-4"
                >
                    {galleryImages.map((image, index) => {
                        const isActive = index === activeIndex
                        const translateY = isActive
                            ? '-translate-y-6'
                            : 'translate-y-4'
                        const scale = isActive
                            ? 'scale-110'
                            : 'scale-90 opacity-60'
                        const zIndex = isActive ? 'z-30' : 'z-10'

                        return (
                            <SwiperSlide
                                key={image.id}
                                className="flex justify-center !w-[250px]"
                            >
                                <div
                                    className={`transition-all duration-700 ease-in-out transform ${translateY} ${scale} ${zIndex}`}
                                >
                                    <img
                                        src={image.src.src}
                                        alt="prestige travel"
                                        className="object-contain h-auto w-xs rounded-4xl shadow-lg"
                                    />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

                {/* Navigation buttons & pagination dots */}
                <div className="md:flex justify-center items-center !space-x-8 !mt-8 hidden">
                    <button className='cursor-pointer' onClick={() => swiperRef.current?.slidePrev()}>
                        <img
                            src={ArrowLeftIcon.src}
                            alt="left"
                            className="w-14 !h-auto aspect-square !rounded-full !bg-white shadow-lg"
                        />
                    </button>

                    <div className="!flex !space-x-2">
                        {galleryImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    swiperRef.current?.slideToLoop(index)
                                }
                                className={`!h-2 transition-all rounded-full ${
                                    index === activeIndex
                                        ? '!bg-primary !w-8'
                                        : '!bg-gray-300 !w-2 !hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>

                    <button className='cursor-pointer' onClick={() => swiperRef.current?.slideNext()}>
                        <img
                            src={ArrowRightIcon.src}
                            alt="left"
                            className="w-14 !h-auto aspect-square !rounded-full !bg-white shadow-lg"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VehicleGallerySlider
