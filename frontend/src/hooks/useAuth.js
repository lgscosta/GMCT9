import { api } from "../services/api"
export const useAuth = () => {
    const checkAuthentication = async () => {
        const isAuthenticated = await api.get('/isAuthenticate')
        console.log({ isAuthenticated })

    }

    return {checkAuthentication}
}