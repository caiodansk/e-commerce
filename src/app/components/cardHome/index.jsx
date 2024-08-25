"use client";
import Link from "next/link";
import { Grid, Card, CardContent, Typography, Button, Snackbar, Alert } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const API_URL = 'https://api-e-commerce-59rz.onrender.com/api/products';

export default function Cards() {
  const generateId = () => Math.floor(Math.random() * 1000000);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: "" }); // Estado para notificação

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
     
        const updatedProducts = data.products.map(product => ({
          ...product,
          price: parseFloat(product.price.replace('$', '').replace(',', '')) 
        }));

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Failed to fetch products from local API:", error);
      }
    };

    fetchProducts();

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    const productWithId = { ...product, id: generateId() };
    const updatedCart = [...cart, productWithId];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Mostrar notificação
    setNotification({ open: true, message: `${product.title} foi adicionado ao carrinho!` });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <>
      <Grid container spacing={4} sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{ marginTop: "6rem" }}>
              <Card sx={{ maxWidth: 345, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
                <Link href="#" prefetch={false}>
                  <Image
                    src={product.images[0] || "https://img.freepik.com/psd-gratuitas/modelo-de-banner-de-postagem-de-midia-social-ou-postagem-do-instagram-da-venda-da-sexta-feira-negra_505751-6102.jpg?t=st=1724552939~exp=1724556539~hmac=dbadcaeee11a9488732c1bff042bcc8631ced9c9e5837bf27ba02c9adb7529b7&w=740"}
                    alt={product.title}
                    width={345}
                    height={200}
                    style={{ objectFit: "cover", transition: "opacity 0.3s", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.8)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
                  />
                </Link>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                    {formatPrice(product.price)}
                  </Typography>
                  <Button variant="outlined" fullWidth onClick={() => addToCart(product)}>
                    Adicionar ao Carrinho
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" component="div">
            Carregando produtos...
          </Typography>
        )}
      </Grid>

    
      <Snackbar
        open={notification.open}
        autoHideDuration={600} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}
