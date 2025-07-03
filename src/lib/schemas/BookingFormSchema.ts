import { z } from 'zod'

export const bookingFormSchema = z.object({
    fullName: z.string().min(2, { message: 'Name is too short' }),
    email: z.string().email({ message: 'Invalid email address' }),
    desiredVehicle: z.string().min(1, 'Vehicle is required'),
    pickUpLocationAndDate: z.string().min(1, 'Pickup is required'),
    dropOffLocationAndDate: z.string().min(1, 'Drop-off is required'),
    numberOfPassengers: z.coerce.number().min(1, 'At least 1 passenger'),
    message: z.string().optional(),
})

export type BookingFormSchema = z.infer<typeof bookingFormSchema>
