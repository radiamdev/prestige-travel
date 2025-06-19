import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

import ArrowLeftIcon from '../../../assets/icons/arrow_left.svg'
import ArrowRightIcon from '../../../assets/icons/arrow_right.svg'
import type { GalleryImage } from '../../../types'
import { galleryImages } from '../../../data/vehicleGallery'
import Modal from './Modal'

const VehicleGallerySlider = () => {
    const swiperRef = useRef<SwiperType | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(
        null
    )

    // Function to open modal with the clicked image
    const openModal = (image: GalleryImage) => {
        setSelectedImage(image)
        setIsModalOpen(true)
    }

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedImage(null)
    }

    // Handle Escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal()
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    return (
        <div className="w-full flex justify-center">
            <div className="relative z-0 w-full max-w-6xl !px-4 overflow-visible">
                <Swiper
                    onBeforeInit={(swiper) => (swiperRef.current = swiper)}
                    modules={[Autoplay]}
                    slidesPerView="auto"
                    loop={true}
                    centeredSlides={true}
                    spaceBetween={30}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        stopOnLastSlide: false,
                        waitForTransition: false,
                    }}
                    speed={3000}
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
                                <button
                                    className={`relative transition-all duration-700 ease-in-out transform ${translateY} ${scale} ${zIndex}`}
                                    onMouseEnter={() =>
                                        isActive && setIsHovered(true)
                                    }
                                    onMouseLeave={() => setIsHovered(false)}
                                    onClick={() => openModal(image)}
                                    aria-label={`View ${image.description}`}
                                >
                                    <img
                                        src={image.src.src}
                                        alt={image.description}
                                        className="object-contain h-auto w-xs rounded-4xl shadow-lg"
                                    />
                                    {isActive && isHovered && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-white/80 text-black text-center py-8 px-4 rounded-4xl cursor-pointer">
                                            <p className="text-sm">
                                                {image.description}
                                            </p>
                                        </div>
                                    )}
                                </button>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

                {/* Navigation buttons & pagination dots */}
                <div className="md:flex justify-center items-center !space-x-8 !mt-8 hidden">
                    <button
                        className="cursor-pointer"
                        onClick={() => swiperRef.current?.slidePrev()}
                        aria-label="Previous slide"
                    >
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
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        className="cursor-pointer"
                        onClick={() => swiperRef.current?.slideNext()}
                        aria-label="Next slide"
                    >
                        <img
                            src={ArrowRightIcon.src}
                            alt="right"
                            className="w-14 !h-auto aspect-square !rounded-full !bg-white shadow-lg"
                        />
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <Modal image={selectedImage} onClose={closeModal} />
            )}
        </div>
    )
}

export default VehicleGallerySlider
