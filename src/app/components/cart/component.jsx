"use client";
import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardActions, Typography, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartComponent() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart); 
  };

  const updateCartCount = (cartItems) => {
    const totalItems = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
    localStorage.setItem('cartItemCount', totalItems);
  };

  useEffect(() => {
    updateCartCount(cart); 
  }, [cart]);

  const total = cart.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);

  const handleCheckout = () => {
    alert(`Seu pedido deu no total de $${total.toFixed(2)}`);
    
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.removeItem('cartItemCount');
    
   
  };

  return (
    <div style={{ padding: '50px', maxWidth: '1200px', margin: 'auto', background:'black'}}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
          Meu Carrinho
          </Typography>
          <Grid container spacing={2}>
            {cart.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card variant="outlined" style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                  <img
                    src="https://img.freepik.com/psd-gratuitas/modelo-de-banner-de-postagem-de-midia-social-ou-postagem-do-instagram-da-venda-da-sexta-feira-negra_505751-6102.jpg?t=st=1724524306~exp=1724527906~hmac=52765a6ba0f375be5a88c47f12e755b1a12c9e68451e7eeec723e1fe90679b23&w=740"
                    alt={item.name}
                    style={{ width: '64px', height: '64px', objectFit: 'cover', marginRight: '16px' }}
                  />
                  <CardContent style={{ flex: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {item.quantity}
                      <br />
                      Unit Price: ${Number(item.price).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography variant="body1" style={{ marginBottom: '8px' }}>
                      ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                    </Typography>
                    <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" style={{ padding: '16px' }}>
            <CardContent>
              <Typography variant="h6">Resumo do Pedido</Typography>
              <Typography variant="h4" style={{ marginTop: '8px' }}>
                ${total.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleCheckout}
              >
                Finalizar Pedido
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
