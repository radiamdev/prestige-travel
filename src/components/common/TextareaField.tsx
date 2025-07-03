import React from 'react'

interface TextareaFieldProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string
    label: string
    placeholder?: string
    rows?: number
    error?: string
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
    ({ id, label, placeholder = '', rows = 5, error, ...rest }, ref) => {
        return (
            <div className="space-y-2">
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
                <textarea
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    rows={rows}
                    ref={ref}
                    className="w-full px-4 py-3 bg-white border border-gray-900 rounded-xl focus:border-primary focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400 resize-none"
                    {...rest}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        )
    }
)

TextareaField.displayName = 'TextareaField'
export default TextareaField
