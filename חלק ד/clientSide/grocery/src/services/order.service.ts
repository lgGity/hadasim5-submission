import axios from '../utils/axios'
import { Order, OrderDetails } from "../types/order.type"

export const getOrders = async () => {
    try{
        const response = await axios.get('/Order')
        const orders = response.data
        return orders
    }
    catch(error)
    {
        console.error('Error fetching orders:', error);
        throw error;
    }
}
export const getOrdersBySupplier = async (id:string) => {
    try{
        const response = await axios.get(`/Order/bySupplier/${id}`)
        const orders = response.data
        return orders
    }
    catch(error)
    {
        console.error('Error fetching orders by supplier:', error);
        throw error;
    }
}

export const addOrder = async (ord: Order) => {
    try {
        console.log("react service: ")
        const response = await axios.post('/Order', ord)
        console.log(response.data)
        const newOrder = response.data
        return newOrder
    }
    catch (error) {
        console.error('Error adding order:', error);
        throw error;
    }
}

export const addOrderDetails = async (orderdetail: OrderDetails) => {
    try {
        console.log("react service: ")
        const response = await axios.post('/OrderDetails', orderdetail)
        console.log(response.data)
        const newOrderDetail = response.data
        return newOrderDetail
    }
    catch (error) {
        console.error('Error adding orderDetail:', error);
        throw error;
    }
}
export const updateOrderStatus=async(order:Order)=>
{
    try{
        console.log("react service: ")
        const response = await axios.put(`/Order/${order.orderId}`, order)
        console.log(response.data)
        const updatedOrder = response.data
        return updatedOrder

    }
    catch (error) {
        console.error('Error update order status :', error);
        throw error;
    }
}
export const getOrderDetailsByOrderId= async (id:number) => {
    try{
        const response = await axios.get(`/OrderDetails/`)
        const ordersDetails = response.data
        const filtered = ordersDetails.filter((detail: any) => detail.orderId == id);
        return filtered
    }
    catch(error)
    {
        console.error('Error fetching orders by supplier:', error);
        throw error;
    }
}
