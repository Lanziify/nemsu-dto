import { app } from '@/lib/firebaseClient'
import { axiosErrorHandler } from '@/lib/utils'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'

export interface UserLoginField {
    email: string,
    password: string
}

export const useAuth = () => {
    const auth = getAuth(app)
    const router = useRouter()
    const searchParams = useSearchParams()

    const loginUser = async ({ email, password }: UserLoginField) => {
        try {
            const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const token = await userCredential.user.getIdToken(true)

            const result = await axios.post('/api/auth/login', {
                token
            })

            if(!result) {
                throw new Error('Error while trying to login your account')
            }

            router.push(callbackUrl)
        } catch (error) {
            axiosErrorHandler(error)
        }
    }

    const logoutUser = async () => {
        try {
            await axios.post('/api/auth/logout')
            router.push('/')
        } catch (error) {
            axiosErrorHandler(error)
        }
    }

    return {
        loginUser,
        logoutUser
    }
}