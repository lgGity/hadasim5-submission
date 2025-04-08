// ManagerOrderForm.tsx
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, MenuItem, Select, FormControl, InputLabel, TextField, SelectChangeEvent, IconButton } from "@mui/material";
import { Product } from "../types/product.types";
import { Supplier } from "../types/supplier.types";
import { getUsers as getUsersApi, getProductsFromSupplier as getProductsFromSupplierApi } from "../services/user.service"; // שירות לקבלת ספקים
import { CheckCircle } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { Order, OrderDetails } from "../types/order.type";
import { addOrder as addOrderApi } from "../services/order.service";
import { PATHS } from "../routes/paths";
import { useNavigate } from "react-router-dom";

export default function NewOrder() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [prodMinQuantity, setProdMinQuantity] = useState<number[]>([]);
    const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
    const [error, setEror] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSuppliers = async () => {
            const data = await getUsersApi();
            setSuppliers(data.filter((s: Supplier) => s.role == "user"));
        };
        fetchSuppliers();
    }, []);

    const handleSupplierChange = async (e: SelectChangeEvent<string>) => {
        const supplierId = e.target.value as string;
        const supplier = suppliers.find((s) => s.supplierId === supplierId);
        setSelectedSupplier(supplier || null);
        const products = await getProductsFromSupplierApi(supplierId)
        setSelectedProducts(products);
        const minQuantity = products.map((p: Product) => p.minQuantity);
        setProdMinQuantity(minQuantity)
    };

    const handleProductChange = (index: number, quantity: number) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[index].minQuantity = quantity;
        setSelectedProducts(updatedProducts);
    };
    const handleSubmit = async () => {
        try {
            var newOrd = {
                orderId: 0,
                orderDate:new Date().toISOString(),
                orderStatus: 'Pending',
                supplierId:selectedSupplier?.supplierId,
                orderDetails: orderDetails
            } as Order
            console.log(newOrd)
            const newOrder = await addOrderApi(newOrd)
            if (newOrder != null)
                alert('ההזמנה נוספה בהצלחה')
        }
        catch (err) {
            console.error("שגיאה בהוספת הזמנה חדשה", err);
        }
    };

    const handleAddToOrder = (index: number, prodId: number, qantity: number) => {
        var newDetail = {
            id: 0,
            orderId: 0,
            productId: prodId,
            quantity: qantity
        } as OrderDetails
        if (qantity < prodMinQuantity[index]) {
            setEror("הכמות קטנה מהכמות המינימלית")
        }
        else {
            setOrderDetails((prevDetails) => [...prevDetails, newDetail]);
            setEror('')
            alert('הפריט נוסף בהצלחה!')
        }
    };

    return (
        <Box sx={{ p: 4, direction: "rtl" }}>
            <Typography variant="h5" gutterBottom>
                הוספת הזמנה חדשה
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>בחר חברה</InputLabel>
                <Select value={selectedSupplier?.supplierId || ""} onChange={handleSupplierChange}>
                    {suppliers.map((supplier) => (
                        <MenuItem key={supplier.supplierId} value={supplier.supplierId}>
                            {supplier.company}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {selectedProducts.length > 0 && (
                <Grid container spacing={2}>
                    {selectedProducts.map((product, index) => (
                        <Grid item xs={12} sm={6} key={product.prodId}>
                            <Box>
                                <Typography>{product.name}</Typography>
                                <Typography>מחיר: {product.priceForItem} ₪</Typography>
                                <TextField
                                    label="שנה כמות"
                                    type="number"
                                    value={product.minQuantity}
                                    inputProps={{
                                        min: prodMinQuantity[index]// להוסיף את המינימום
                                    }}
                                    onChange={(e) => handleProductChange(index, Number(e.target.value))}
                                />
                            </Box>

                            <Grid item xs={12} sm={4}>
                                <Typography color="green">בחר</Typography>
                                <IconButton
                                    color="primary"
                                    onClick={() => handleAddToOrder(index, product.prodId, product.minQuantity)}>
                                    <CheckCircle />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    {error && (
                        <Grid item xs={12}>
                            <Typography variant="body2" color="error" align="center">
                                {error}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            )}


            <Box mt={3}>
                <Button variant="contained" color="primary" onClick={() => { handleSubmit() }}>
                    סיום הזמנה
                </Button>
            </Box>
            <IconButton color="primary" onClick={() => navigate(PATHS.managerOrders)}>
                <HomeIcon />
            </IconButton>
        </Box>
    );
}
