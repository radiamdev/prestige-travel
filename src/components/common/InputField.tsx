import React from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string
    label: string
    placeholder?: string
    required?: boolean
    error?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    (
        { id, label, placeholder = '', required = false, error, ...rest },
        ref
    ) => {
        return (
            <div className="space-y-2">
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
                <input
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    required={required}
                    ref={ref}
                    className="w-full px-4 py-2 bg-white border border-gray-900 rounded-xl focus:border-primary focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400"
                    {...rest}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        )
    }
)

InputField.displayName = 'InputField'
export default InputField
