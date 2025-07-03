import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputField from '../common/InputField'
import TextareaField from '../common/TextareaField'
import envoyerIcon from '../../assets/icons/envoyer.svg'
import BookingButton from '../common/BookingButton'
import { toast } from 'react-toastify'
import SelectField from '../common/SelectField'
import {
    bookingFormSchema,
    type BookingFormSchema,
} from '../../lib/schemas/BookingFormSchema'
import { sendRequest } from '../../lib/api/booking'
import type { Lang } from '../../types'
import { useTranslationStore } from '../../i18n/useTranslationStore'
import { useEffect } from 'react'

type Props = {
    lang: Lang
}

const vehicles = [
    `Hyundai Grand Starex CVX 10 places, climatisée`,
    `Hyundai Starex 4x4 7 places, climatisée`,
    `Hyundai Terracan 5 places, climatisée `,
    `Ssangyang Rexton 5 places, climatisée `,
    `Toyota Prado 120 5 places, climatisée`,
]

export default function BookingForm({ lang }: Readonly<Props>) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        reset,
    } = useForm<BookingFormSchema>({
        resolver: zodResolver(bookingFormSchema),
    })

    const { setLang, t } = useTranslationStore()

    useEffect(() => {
        setLang(lang)
    }, [lang])

    const onSubmit = async (data: BookingFormSchema) => {
        try {
            const response = await sendRequest(data)
            console.log('✅ Request sent:', response)
            reset()
            toast.success(t('carRentalPage.bookNowSection.bookingForm.success'))
        } catch (error) {
            console.error('❌ Failed to send:', error)
            toast.error(t('carRentalPage.bookNowSection.bookingForm.error'))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
                id="fullname"
                label={t('carRentalPage.bookNowSection.bookingForm.fullName')}
                placeholder="John Doe"
                {...register('fullName')}
                error={errors.fullName?.message}
            />
            <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="david@prestige-travel.mg"
                {...register('email')}
                error={errors.email?.message}
            />

            <Controller
                control={control}
                name="desiredVehicle"
                rules={{
                    required: t(
                        'carRentalPage.bookNowSection.bookingForm.vehicleRequired'
                    ),
                }}
                render={({ field }) => (
                    <SelectField
                        id="desiredVehicle"
                        label={t(
                            'carRentalPage.bookNowSection.bookingForm.desiredVehicle'
                        )}
                        options={vehicles}
                        required
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.desiredVehicle?.message}
                    />
                )}
            />

            <InputField
                id="pickUpLocationAndDate"
                label={t('carRentalPage.bookNowSection.bookingForm.pickup')}
                placeholder="Antananarivo - 2025-06-15"
                {...register('pickUpLocationAndDate')}
                error={errors.pickUpLocationAndDate?.message}
            />

            <InputField
                id="dropOffLocationAndDate"
                label={t('carRentalPage.bookNowSection.bookingForm.dropoff')}
                placeholder="Nosy Be - 2025-06-20"
                {...register('dropOffLocationAndDate')}
                error={errors.dropOffLocationAndDate?.message}
            />

            <InputField
                id="numberOfPassengers"
                label={t('carRentalPage.bookNowSection.bookingForm.passengers')}
                type="number"
                min="1"
                placeholder="e.g. 5"
                {...register('numberOfPassengers')}
                error={errors.numberOfPassengers?.message}
            />

            <TextareaField
                id="message"
                label={t('carRentalPage.bookNowSection.bookingForm.message')}
                placeholder={t(
                    'carRentalPage.bookNowSection.bookingForm.messagePlaceholder'
                )}
                {...register('message')}
                error={errors.message?.message}
            />

            <div className="pt-4 flex lg:justify-start justify-end">
                <BookingButton
                    type="submit"
                    label={
                        isSubmitting
                            ? t(
                                  'carRentalPage.bookNowSection.bookingForm.sending'
                              )
                            : t('carRentalPage.bookNowSection.bookingForm.send')
                    }
                    icon={envoyerIcon.src}
                    iconAlt="Send icon"
                />
            </div>
        </form>
    )
}
