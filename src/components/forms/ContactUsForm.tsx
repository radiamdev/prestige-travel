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
import { useTranslationStore } from '../../i18n/useTranslationStore'
import { useEffect } from 'react'
import type { Lang } from '../../types'

type Props = {
    lang: Lang
}

export default function ContactUsForm({ lang }: Readonly<Props>) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormSchema>({
        resolver: zodResolver(contactFormSchema),
    })

    const { setLang, t } = useTranslationStore()

    useEffect(() => {
        setLang(lang)
    }, [lang])

    const onSubmit = async (data: ContactFormSchema) => {
        try {
            const response = await sendMail(data)
            console.log('✅ Email sent:', response)
            reset()
            toast.success(t('homePage.contactUsSection.contact.success'))
        } catch (error) {
            console.error('❌ Failed to send:', error)
            toast.error(t('homePage.contactUsSection.contact.error'))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
                id="email"
                label={t('homePage.contactUsSection.contact.email')}
                placeholder="rova@prestige-travel.mg"
                {...register('email')}
                error={errors.email?.message}
            />

            <InputField
                id="fullName"
                label={t('homePage.contactUsSection.contact.fullName')}
                placeholder="Rova"
                {...register('fullName')}
                error={errors.fullName?.message}
            />

            <InputField
                id="subject"
                label={t('homePage.contactUsSection.contact.subject')}
                placeholder={t(
                    'homePage.contactUsSection.contact.subjectPlaceholder'
                )}
                {...register('subject')}
                error={errors.subject?.message}
            />

            <TextareaField
                id="message"
                label={t('homePage.contactUsSection.contact.message')}
                placeholder={t(
                    'homePage.contactUsSection.contact.messagePlaceholder'
                )}
                {...register('message')}
                error={errors.message?.message}
            />

            <div className="pt-4 flex lg:justify-start justify-end">
                <BookingButton
                    type="submit"
                    label={
                        isSubmitting
                            ? t('homePage.contactUsSection.contact.sending')
                            : t('homePage.contactUsSection.contact.send')
                    }
                    icon={envoyerIcon.src}
                    iconAlt="Send icon"
                />
            </div>
        </form>
    )
}
