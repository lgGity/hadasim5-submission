import axios from '../utils/axios'
import { Product } from "../types/product.types"
import { getSession } from '../auth/auth.utils'

export const getAllProducts = async () => {
    try {
        const response = await axios.get('/Product')
        const prods = response.data
        return prods
    }
    catch (error) {
        console.error('Error fetching ads:', error);
        throw error;
    }
}
export const getProduct = async (id: number) => {
    try {
        const response = await axios.get(`/Product/${id}`)
        console.log(response.data)
        const prod = response.data
        return prod
    }
    catch (error) {
        console.error('Error fetching ad by id:', error);
        throw error;
    }
}

export const addProduct = async (prod: Omit<Product, 'id'>) => {
    try {
        const token=getSession()?.token
        const response = await axios.post('/Product', prod,
        {
            headers:{
            Authorization:`Bearer ${token}`
        }

        })
        const newProd = response.data
        return newProd
    }
    catch (error) {
        console.error('Error adding ad:', error);
        throw error;
    }
}
