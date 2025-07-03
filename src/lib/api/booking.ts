import alovaInstance from '../../lib/alova'

const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL

export const sendRequest = (data: {
    fullName: string
    email: string
    desiredVehicle: string
    pickUpLocationAndDate: string
    dropOffLocationAndDate: string
    numberOfPassengers: number
    message?: string
}) =>
    alovaInstance.Post(`${BASE_URL}/booking`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
