import alovaInstance from '../../lib/alova'

export const sendMail = (data: {
    email: string
    fullName: string
    subject: string
    message?: string
}) =>
    alovaInstance.Post(`${process.env.API_BASE_URL}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
