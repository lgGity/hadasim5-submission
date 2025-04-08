import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Order, OrderDetails } from "../types/order.type";

interface OrderCardProps {
  order: Order;
  expandedOrders: { [key: number]: OrderDetails[] };
  onToggleDetails: (orderId: number) => void;
}

const OrderCard = ({ order, expandedOrders, onToggleDetails }: OrderCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">מס' הזמנה: {order.orderId}</Typography>
        <Typography variant="body2" color="textSecondary">תאריך: {order.orderDate}</Typography>
        <Typography variant="body2" color="textSecondary">סטטוס: {order.orderStatus}</Typography>

        <Box mt={2}>
          <Button
            variant="outlined"
            onClick={() => onToggleDetails(order.orderId)}
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
      </CardContent>
    </Card>
  );
};

export default OrderCard;
