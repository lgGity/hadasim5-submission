import { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { addUser as addUserApi, getUsers, login as loginApi } from '../services/user.service';
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/auth.selectors";
import { Product } from "../types/product.types";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";
import ProductForm from "../components/ProductCard"; // ייבוא הקומפוננטה החדשה
import { useLocation } from "react-router-dom";
import { Supplier } from "../types/supplier.types";
import { setUser } from '../redux/auth/auth.slice';
import { useAppDispatch } from '../redux/store';
import { setSession } from '../auth/auth.utils';
import AnimationSuccess from "../sections/AnimationSuccess";


export default function SupplierProductForm() {
  const [products, setProducts] = useState<Product[]>([
    { prodId: 0, name: "", priceForItem: 0, minQuantity: 0, supplierId: "" },
  ]);
  const [user1, setUser1] = useState<Supplier>()
  useEffect(() => {
    if (user1 != undefined) {
      handleAnimationEnd(user1);
    }
  }, [user1]);
  const user = useSelector(selectAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const newSupplier = location.state as Supplier;
  const dispatch = useAppDispatch();
  
  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    const newProducts = [...products];
    (newProducts[index] as any)[field] = field === "name" ? value : Number(value);
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([...products, { prodId: 0, name: "", priceForItem: 0, minQuantity: 0, supplierId: "" }]);
  };

  const handleSave = async () => {
    try {
      const newU: Supplier = {
        ...newSupplier,
        products: products
      };     
      const newUser = await addUserApi(newU);
      console.log("new user entered: ", newUser);
      setUser1(newUser)       
      alert("המוצרים נשמרו בהצלחה!");
    } catch (err) {
      console.error("שגיאה בשמירת מוצרים:", err);
      alert("ארעה שגיאה בעת השמירה.");
    }
  };
  const handleAnimationEnd = async (newUser: Supplier) => {
    dispatch(setUser(newUser));
    const newUserWithToken = await loginApi(newUser.supplierId, newUser.password);
    setSession(newUserWithToken);
    navigate(PATHS.suppliersOrders);
  };
  if (user1 != undefined) {
    return <AnimationSuccess message='המשתמש נרשם בהצלחה' duration={10} onAnimationEnd={() => handleAnimationEnd(user1)} />;
  }
  return (
    <Box sx={{ p: 4, direction: "rtl" }}>
      <Typography variant="h5" gutterBottom>
        הגדרת מוצרים לספק
      </Typography>

      {products.map((product, index) => (
        <ProductForm
          key={index}
          product={product}
          index={index}
          onChange={handleProductChange}
          editable={true}
        />
      ))}

      <IconButton color="primary" onClick={addProduct}>
        <Add />
      </IconButton>

      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          שמור
        </Button>
      </Box>
    </Box>
  );
}
