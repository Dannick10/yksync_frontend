import { api,requestConfig } from "@/utils/useBaseApi";

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

export const authServices = {
    register
}