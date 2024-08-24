"use client"; 
import React, { useState } from 'react';
import { Button, Card, CardContent, CardActions, Typography, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartComponent() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Cozy Blanket', price: 29.99, quantity: 2 },
    { id: 2, name: 'Autumn Mug', price: 12.99, quantity: 1 },
    { id: 3, name: 'Fall Fragrance Candle', price: 16.99, quantity: 1 },
  ]);

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: 'auto' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Cart
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
                      Unit Price: ${item.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography variant="body1" style={{ marginBottom: '8px' }}>
                      ${(item.price * item.quantity).toFixed(2)}
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
              <Typography variant="h6">Order Summary</Typography>
              <Typography variant="h4" style={{ marginTop: '8px' }}>
                ${total.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" size="large" fullWidth>
                Proceed to Checkout
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
