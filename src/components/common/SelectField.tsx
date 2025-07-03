import React from 'react'

interface SelectFieldProps {
    id: string
    label: string
    options: string[]
    required?: boolean
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
    error?: string
}

const SelectField: React.FC<SelectFieldProps> = ({
    id,
    label,
    options,
    required = false,
    value,
    onChange,
    error,
}) => {
    return (
        <div className="space-y-2 relative">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <select
                id={id}
                name={id}
                required={required}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2 pr-10 bg-white border ${
                    error ? 'border-red-500' : 'border-gray-900'
                } rounded-xl focus:border-primary focus:outline-none transition-colors duration-300 text-gray-700 appearance-none`}
            >
                <option value="" disabled>
                    Choose vehicle
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            {/* Chevron icon */}
            <div className="pointer-events-none absolute inset-y-0 top-6 right-4 flex items-center">
                <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default SelectField
