import axios from "axios"

export const loginEmail = async (username:string,password:string) =>
{
    const response = await axios.post('http://localhost:3001/auth/login', { username, password })

    return response.data.token
}
