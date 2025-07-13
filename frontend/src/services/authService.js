import { api, requestConfig } from "../utils/config"

const register = async data => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/register", config)
            .then(r => r.json())
            .catch(err => err)

        if (res && !Object.keys(res).includes("errors")) {
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res
    } catch (error) {
        console.error(error)
    }
}

const logout = () => localStorage.removeItem("user")

const login = async data => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/login", config)
            .then(r => r.json())
            .catch(err => err)

        if (res && !Object.keys(res).includes("errors")) {
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res
    } catch (error) {
        console.error(error)
    }
}

const authService = { register, logout, login }

export default authService