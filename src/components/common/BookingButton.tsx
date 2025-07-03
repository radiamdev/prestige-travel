import React from 'react'

interface BookingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
    icon: string
    iconAlt?: string
    className?: string
    href?: string
}

const BookingButton: React.FC<BookingButtonProps> = ({
    label = 'Button',
    icon,
    iconAlt = 'icon',
    className = '',
    href,
    type = 'submit',
    ...rest
}) => {
    const baseClasses = 'flex items-center justify-start relative cursor-pointer' + className
    const buttonContent = (
        <>
            <div className="bg-pink-secondary text-white font-poppins font-bold flex items-center justify-center rounded-xl pl-12 px-6 py-3">
                {label}
            </div>
            <div className="bg-grey-primary flex items-center justify-center rounded-full w-14 h-14 absolute -left-5">
                <img src={icon} alt={iconAlt} width={32} height={32} />
            </div>
        </>
    )

    if (href) {
        return (
            <a href={href} className={baseClasses}>
                {buttonContent}
            </a>
        )
    }

    return (
        <button type={type} className={baseClasses} {...rest}>
            {buttonContent}
        </button>
    )
}

export default BookingButton
