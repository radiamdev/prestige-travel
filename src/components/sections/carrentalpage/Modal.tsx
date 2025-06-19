import React from 'react'

// Interface for modal props
interface ModalProps {
    image: { src: { src: string }; description: string } | null
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ image, onClose }) => {
    if (!image) return null

    return (
        <button
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300"
            onClick={onClose}
        >
            <button
                className="relative bg-white rounded-2xl p-12 max-w-3xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Modal content */}
                <img
                    src={image.src.src}
                    alt={image.description}
                    className="w-full h-auto rounded-xl max-h-[70vh] object-contain"
                />
                <p className="mt-4 text-center text-gray-800">
                    {image.description}
                </p>
            </button>
        </button>
    )
}

export default Modal
