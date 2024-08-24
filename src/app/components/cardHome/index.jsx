"use client"
import Link from "next/link";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Image from 'next/image';
import testeImg from "../img/teste.jpg";

export default function Cards() {
  return (
    <Grid container spacing={4} sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
      {[ 
        { title: "Cozy Knit Sweater", price: "$49.99", image: testeImg },
        { title: "Leather Backpack", price: "$79.99", image: testeImg },
        { title: "Wireless Headphones", price: "$99.99", image: testeImg },
        { title: "Ceramic Mug Set", price: "$24.99", image: testeImg },
        { title: "Outdoor Camping Gear", price: "$149.99", image: testeImg },
        { title: "Bamboo Cutting Board", price: "$29.99", image: testeImg },
        { title: "Scented Candle Set", price: "$39.99", image: testeImg },
        { title: "Stainless Steel Thermos", price: "$34.99", image: testeImg },
      ].map((product, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ marginTop: "6rem" }}>
          <Card sx={{ maxWidth: 345, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
            <Link href="#" prefetch={false}>
        
              <Image
                src={product.image}
                alt="Product Image"
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
                {product.price}
              </Typography>
              <Button variant="outlined" fullWidth>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
