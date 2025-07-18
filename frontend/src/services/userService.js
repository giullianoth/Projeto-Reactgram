import { api, requestConfig } from "../utils/config"

const profile = async (data, token) => {
    const config = requestConfig("GET", data, token)

    try {
        const res = await fetch(api + "/users/profile", config)
            .then(r => r.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const updateProfile = async (data, token) => {
    const config = requestConfig("PUT", data, token, true)

    try {
        const res = await fetch(api + "/users/", config)
            .then(r => r.json())
            .catch(err => err)

        console.log(res, JSON.parse(localStorage.getItem("user")));

        if (res && !Object.keys(res).includes("errors")) {
            const authData = JSON.parse(localStorage.getItem("user"))
            localStorage.setItem("user", JSON.stringify({ ...authData, profileImage: res.profileImage }))
        }

        return res
    } catch (error) {
        console.error(error)
    }
}

const userService = { profile, updateProfile }

export default userService