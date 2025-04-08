import { Product } from "./product.types"

export type Supplier = {
    supplierId: string,
    company: string,
    phone: string,
    supplierName: string,
    password: string,
    role:string,
    products:Product[]
}
export type AuthUser={
    user: Supplier,
    token: string,
}