import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Order } from '../../types/order.type'

type StateType = {
    orders: Order[]
}

const adSlice = createSlice({
    name: 'order',
    initialState: { orders: [] } as StateType,
    reducers: {
        setOrders:(state: StateType,action:PayloadAction<Order[]>)=>{
            state.orders=action.payload
         },
        setOrderById: (state: StateType, action: PayloadAction<number>) => {
            state.orders.filter(o => o.orderId == action.payload)
        },        
        addOrder: (state: StateType, action: PayloadAction<Order>) => {
            state.orders.push(action.payload)
        },
        updateOrder: (state: StateType, action: PayloadAction<Order>) => {
            const p = state.orders.filter(pp => pp.orderId === action.payload.orderId)
            state.orders = state.orders.filter(p => p.orderId !== action.payload.orderId)
            p[0].orderStatus = action.payload.orderStatus
            state.orders = [...state.orders, p[0]]
        }
    }
})

export const { addOrder, updateOrder, setOrders,setOrderById } = adSlice.actions

export default adSlice.reducer