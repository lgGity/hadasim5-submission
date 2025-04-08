// components/ProductForm.tsx
import React from 'react';
import { TextField, Grid } from "@mui/material";
import { Product } from "../types/product.types";

type ProductFormProps = {
  product: Product;
  index: number;
  onChange: (index: number, field: keyof Product, value: string | number) => void;
  editable: boolean;
};

const ProductForm = ({ product, index, onChange, editable }: ProductFormProps) => {
  return (
    <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={4}>
        <TextField
          label="שם מוצר"
          fullWidth
          value={product.name}
          onChange={(e) => editable && onChange(index, "name", e.target.value)}
          disabled={!editable}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="מחיר ליחידה"
          type="number"
          fullWidth
          value={product.priceForItem}
          onChange={(e) => editable && onChange(index, "priceForItem", e.target.value)}
          disabled={!editable}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="כמות מינימלית"
          type="number"
          fullWidth
          value={product.minQuantity}
          onChange={(e) => editable && onChange(index, "minQuantity", e.target.value)}
          disabled={!editable}
        />
      </Grid>
    </Grid>
  );
};

export default ProductForm;
