export type Order={
    orderId:number,
    orderDate: string,
    orderStatus:'Pending' | 'Processing' | 'Completed',
    supplierId:string,
    orderDetails: OrderDetails[]
}
export type OrderDetails={
    id:number,
    orderId:number
    productId: number,
    quantity:number
}