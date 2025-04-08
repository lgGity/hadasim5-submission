import axios from '../utils/axios'
import { Supplier } from "../types/supplier.types"
import { getAllProducts } from './product.service'
import { Product } from '../types/product.types'


export const login = async (userId: string, password: string) => {
    debugger
    const response = await axios.get(`/Supplier/Login/${userId}/${password}`)
    return {
        user: response.data.user1,
        token: response.data.token1,
        role: response.data.user1.role
    }
}

export const addUser = async (user: Supplier) => {
    try {
        console.log("react service: ")
        // console.log(user)
        const response = await axios.post('/Supplier', user)
        console.log(response.data)
        const newUser = response.data
        return newUser
    }
    catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}



export const getUsers = async () => {
    try {
        const response = await axios.get(`/Supplier/`,)
        return response.data
    }
    catch (error) {
        console.error(`Error fetching users`, error);
        throw error;
    }
}

export const updateUser=async (user:Supplier, id:string) => {
    try {
        const response = await axios.put(`/Supplier/${id}`,user)
        return response.data
    }
    catch (error) {
        console.error(`Error adding products`, error);
        throw error;
    }
}
export const getProductsFromSupplier=async(supplier:string)=>
{
    try{
        const response=await getAllProducts();
        const chosenProducts=response.filter((prod: Product) => prod.supplierId===supplier)
        return chosenProducts
    }
    catch (error) {
        console.error(`Error getting products from supplier`, error);
        throw error;
    }

}