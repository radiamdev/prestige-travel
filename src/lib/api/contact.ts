import alovaInstance from '../../lib/alova'

const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL

export const sendMail = (data: {
    email: string
    fullName: string
    subject: string
    message?: string
}) =>
    alovaInstance.Post(`${BASE_URL}/contact`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
