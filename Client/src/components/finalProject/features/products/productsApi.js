import axios from 'axios'

const baseUrl="http://localhost:4000/product"

export const getProducts=async()=>{
    const response = await axios.get(baseUrl)
    return response.data
}

export const getProductByIdA=async(id)=>{
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const addProductA=async(newProduct)=>{
    const response = await axios.post(baseUrl,newProduct)
    return response.data
}

export const putProductA=async(id,newProduct)=>{
 
    const response = await axios.put(`${baseUrl}/${id}`,newProduct)   
    return response.data
}

export const deleteProductA=async(id)=>{
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}