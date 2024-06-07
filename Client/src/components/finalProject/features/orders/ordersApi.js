import axios from "axios";

const baseUrl = "http://localhost:4000/order"

export const getOrdersA = async () => {
    const response = await axios.get(baseUrl)
    return response.data;
}

export const getOrderByIdA = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const addOrderA = async (newOrder) => {
    const response = await axios.post(baseUrl,newOrder)
    return response.data
}

