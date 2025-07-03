import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputField from '../common/InputField'
import TextareaField from '../common/TextareaField'
import envoyerIcon from '../../assets/icons/envoyer.svg'
import BookingButton from '../common/BookingButton'
import { sendMail } from '../../lib/api/contact'
import {
    contactFormSchema,
    type ContactFormSchema,
} from '../../lib/schemas/contactFormSchema'
import { toast } from 'react-toastify'

export default function ContactUsForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormSchema>({
        resolver: zodResolver(contactFormSchema),
    })

    const onSubmit = async (data: ContactFormSchema) => {
        try {
            const response = await sendMail(data)
            console.log('✅ Email sent:', response)
            reset()
            toast.success('✅ Message sent successfully!')
        } catch (error) {
            console.error('❌ Failed to send:', error)
            toast.error('❌ Failed to send message.')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
                id="email"
                label="Email"
                placeholder="rova@prestige-travel.mg"
                {...register('email')}
                error={errors.email?.message}
            />

            <InputField
                id="fullName"
                label="Full name"
                placeholder="Rova"
                {...register('fullName')}
                error={errors.fullName?.message}
            />

            <InputField
                id="subject"
                label="Subject"
                placeholder="Asking for information"
                {...register('subject')}
                error={errors.subject?.message}
            />

            <TextareaField
                id="message"
                label="Message"
                placeholder="Your message..."
                {...register('message')}
                error={errors.message?.message}
            />

            <div className="pt-4 flex lg:justify-start justify-end">
                <BookingButton
                    type="submit"
                    label={isSubmitting ? 'Sending...' : 'Send'}
                    icon={envoyerIcon.src}
                    iconAlt="Send icon"
                />
            </div>
        </form>
    )
}
