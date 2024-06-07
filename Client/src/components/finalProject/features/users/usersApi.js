import axios from 'axios'

const baseUrl="http://localhost:4000/user"
export const loginUser=async(user)=>{
    const response = await axios.post(`${baseUrl}/login`,user)
    return response.data
}

export const addUser=async(user)=>{
    const response = await axios.post(baseUrl,user)
    return response.data
}

export const getUsers=async()=>{
    const response = await axios.get(baseUrl)
    return response.data
}