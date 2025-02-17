import { api,requestConfig } from "@/utils/useBaseApi";
import Cookies from "js-cookie";

const register = async (data: any) => {
    const config  = requestConfig("POST", data)

    try {

        const res = await fetch(api + 'user/signIn', config)
        .then((res) => res.json())
        .catch((res) => res)

        if(res.erros) {
            return res 
        }

        return res

    } catch(err) {
        console.log(err)
    }
}

const logout = () => {
    Cookies.remove("token")
}

const login = async (data: any) => {
    const config  = requestConfig("POST", data)

    try {

        const res = await fetch(api + 'user/login', config)
        .then((res) => res.json())
        .catch((res) => res)

        if(res.erros) {
            return res 
        }

        return res

    } catch(err) {
        console.log(err)
    }
}
 
export const authServices = {
    register,
    logout,
    login
}