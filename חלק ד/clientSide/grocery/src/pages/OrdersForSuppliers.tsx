import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrders } from '../redux/order/order.selectors';
import { setOrders as setOrdersRe, updateOrder } from '../redux/order/order.slice';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Order, OrderDetails } from '../types/order.type';
import { useNavigate } from 'react-router-dom';
import {
  getOrdersBySupplier as getOrdersApi,
  updateOrderStatus as updateOrderStatusApi,getOrderDetailsByOrderId} from "../services/order.service";
import { selectAuth } from "../redux/auth/auth.selectors";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PATHS } from "../routes/paths";
import { removeSession } from "../auth/auth.utils";

const SupplierOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuth);
  const orders = useSelector(selectOrders);

  const [expandedOrders, setExpandedOrders] = useState<{ [key: number]: OrderDetails[] }>({});

  const fetchOrders = async () => {
    const ordersData = await getOrdersApi(user.user.supplierId);
    const actualOrders = Array.isArray(ordersData) && Array.isArray(ordersData[0]) ? ordersData[0] : ordersData;
    dispatch(setOrdersRe(actualOrders));
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number) => {
    try {
      const order = orders.find(o => o.orderId === orderId);
      if (!order) {
        console.error("הזמנה לא נמצאה");
        return;
      }
      const updatedOrder: Order = { ...order, orderStatus: "Processing" };
      await updateOrderStatusApi(updatedOrder);
      dispatch(updateOrder(updatedOrder));
    } catch (err) {
      console.error("שגיאה בעדכון סטטוס להזמנה:", err);
    }
  };

  const handleToggleDetails = async (orderId: number) => {
    if (expandedOrders[orderId]) {
      setExpandedOrders(prev => {
        const copy = { ...prev };
        delete copy[orderId];
        return copy;
      });
    } else {
      try {
        const details = await getOrderDetailsByOrderId(orderId);
        setExpandedOrders(prev => ({ ...prev, [orderId]: details }));
      } catch (err) {
        console.error("שגיאה בטעינת פרטי הזמנה:", err);
      }
    }
  };

  return (
    <>

    <Box display="flex" justifyContent="flex-start" mt={2} ml={2} sx={{ p: 4, direction: "rtl" }}>
    <Typography variant="h5" gutterBottom>
       ההזמנות מהמכולת
     </Typography>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() =>{
          removeSession()
          navigate(PATHS.login)
        } }
      >
        חזרה להתחברות
      </Button>
    </Box>
    <Grid container spacing={3} dir="rtl">
      {orders.map((order) => (
        <Grid item xs={12} sm={6} xl={3} key={order.orderId}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">מס' הזמנה: {order.orderId}</Typography>
              <Typography variant="body2" color="textSecondary">תאריך: {order.orderDate}</Typography>
              <Typography variant="body2" color="textSecondary">סטטוס: {order.orderStatus}</Typography>

              <Box mt={2}>
                <Button
                  variant="outlined"
                  onClick={() => handleToggleDetails(order.orderId)}
                  fullWidth
                >
                  {expandedOrders[order.orderId] ? "הסתר פרטים" : "הצג פרטי הזמנה"}
                </Button>

                {expandedOrders[order.orderId] && (
                  <Box mt={2}>
                    <Typography variant="subtitle2" color="textPrimary">פרטי הזמנה:</Typography>
                    <ul>
                      {expandedOrders[order.orderId].map((product, index) => (
                        <li key={index}>
                          מוצר: {product.productId} - כמות: {product.quantity}
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
              </Box>
            {(order.orderStatus === "Pending") && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleStatusChange(order.orderId)}
                disabled={order.orderStatus != "Pending"}
                sx={{ mt: 2 }}
              >
                עדכון סטטוס
              </Button>
            )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default SupplierOrdersPage;
