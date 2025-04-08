import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Grid,Typography,Box,Button,MenuItem,Select,InputLabel,FormControl, IconButton,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {getOrders,getOrderDetailsByOrderId,updateOrderStatus as updateOrderStatusApi,} from "../services/order.service";
import {setOrders as setOrdersRe,updateOrder,} from "../redux/order/order.slice";
import { selectOrders } from "../redux/order/order.selectors";
import { selectAuth } from "../redux/auth/auth.selectors";
import { logout } from "../redux/auth/auth.slice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PATHS } from "../routes/paths";
import OrderCard from "../components/OrderCard";

import { Order, OrderDetails } from "../types/order.type";
import { Add } from "@mui/icons-material";

const ManagerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuth);
  const orders = useSelector(selectOrders);
  const [doRefresh,setDoRefresh]=useState<boolean>(false); 
  const [expandedOrders, setExpandedOrders] = useState<{
    [key: number]: OrderDetails[];
  }>({});
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchOrders = async () => {
    const allOrders = await getOrders();
    dispatch(setOrdersRe(allOrders));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [doRefresh]);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const order = orders.find((o) => o.orderId === orderId);
      if (!order || !newStatus) 
        {
        console.log("order is empty")
        return
        }
        console.log(order)
      const updatedOrder = {
        ...order,
        orderStatus: newStatus as "Pending" | "Processing" | "Completed",
      };

      await updateOrderStatusApi(updatedOrder);
      dispatch(updateOrder(updatedOrder));
      doRefresh?setDoRefresh(false):setDoRefresh(true);
    } catch (err) {
      console.error("שגיאה בעדכון סטטוס להזמנה:", err);
    }
  };

  const handleToggleDetails = async (orderId: number) => {
    if (expandedOrders[orderId]) {
      setExpandedOrders((prev) => {
        const copy = { ...prev };
        delete copy[orderId];
        return copy;
      });
    } else {
      try {
        const details = await getOrderDetailsByOrderId(orderId);
        setExpandedOrders((prev) => ({ ...prev, [orderId]: details }));
      } catch (err) {
        console.error("שגיאה בטעינת פרטי הזמנה:", err);
      }
    }
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.orderStatus === statusFilter);

  return (
    <>
    <Typography variant="h5">hello {user?.user.supplierName}</Typography>
    <Box sx={{ p: 4, direction: "rtl" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">ניהול הזמנות</Typography>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            dispatch(logout());
            navigate(PATHS.login);
          }}
        >
          יציאה
        </Button>
      </Box>

      <Box mb={3} display="flex" justifyContent="flex-start">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">סינון לפי סטטוס</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="סינון לפי סטטוס"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">הכל</MenuItem>
            <MenuItem value="Pending">ממתין</MenuItem>
            <MenuItem value="Processing">בטיפול</MenuItem>
            <MenuItem value="Completed">הושלם</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredOrders.map((order) => (
          <Grid item xs={12} sm={6} xl={3} key={order.orderId}>
            <OrderCard
              order={order}
              expandedOrders={expandedOrders}
              onToggleDetails={handleToggleDetails}
            />

            {(order.orderStatus === "Processing") && (
              <Button
                fullWidth
                sx={{ mt: 1 }}
                variant="contained"
                color="primary"
                onClick={() => handleStatusChange(order.orderId, "Completed")}
              >
                סיום טיפול
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
      <IconButton color="primary" onClick={()=>{navigate(PATHS.newOrder)}}>
        <Add>הזמנה חדשה</Add>
        הזמנה חדשה
      </IconButton>
    </Box>
    </>
  );
};

export default ManagerPage;
