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

const vehicles = [
    `Hyundai Grand Starex CVX 10 places, climatisée`,
    `Hyundai Starex 4x4 7 places, climatisée`,
    `Hyundai Terracan 5 places, climatisée `,
    `Ssangyang Rexton 5 places, climatisée `,
    `Toyota Prado 120 5 places, climatisée`,
]

export default function BookingForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        reset,
    } = useForm<BookingFormSchema>({
        resolver: zodResolver(bookingFormSchema),
    })

    const onSubmit = async (data: BookingFormSchema) => {
        try {
            const response = await sendRequest(data)
            console.log('✅ Request sent:', response)
            reset()
            toast.success('✅ Request sent successfully!')
        } catch (error) {
            console.error('❌ Failed to send:', error)
            toast.error('❌ Failed to send request.')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
                id="fullname"
                label="Full name"
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
                rules={{ required: 'Vehicle is required' }}
                render={({ field }) => (
                    <SelectField
                        id="desiredVehicle"
                        label="Desired vehicle"
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
                label="Pickup location and date"
                placeholder="Antananarivo - 2025-06-15"
                {...register('pickUpLocationAndDate')}
                error={errors.pickUpLocationAndDate?.message}
            />
            <InputField
                id="dropOffLocationAndDate"
                label="Drop-off location and date"
                placeholder="Nosy Be - 2025-06-20"
                {...register('dropOffLocationAndDate')}
                error={errors.dropOffLocationAndDate?.message}
            />

            <InputField
                id="numberOfPassengers"
                label="Number of passengers"
                type="number"
                min="1"
                placeholder="e.g. 5"
                {...register('numberOfPassengers')}
                error={errors.numberOfPassengers?.message}
            />

            <TextareaField
                id="message"
                label="Message"
                placeholder="Your note or message..."
                {...register('message')}
                error={errors.message?.message}
            />

            <div className="pt-4 flex lg:justify-start justify-end">
                <BookingButton
                    type="submit"
                    label={isSubmitting ? 'Sending...' : 'Send Request'}
                    icon={envoyerIcon.src}
                    iconAlt="Send icon"
                />
            </div>
        </form>
    )
}
