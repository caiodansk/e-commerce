"use client"; // Certifique-se de colocar isso na primeira linha do arquivo

import { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

export default function PrimarySearchBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showAppBar, setShowAppBar] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0); // Estado para armazenar o número de itens no carrinho

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const fadeOutThreshold = 15;
      const opacity = 1 - Math.min(1, scrollTop / fadeOutThreshold);
      setShowAppBar(opacity > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Recupera o carrinho do localStorage e calcula o número total de itens
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = savedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemCount(totalItems);
  }, []); // Executa apenas uma vez quando o componente é montado

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          color="inherit"
          position="fixed"
          sx={{
            background: '#DCDCDC',
            boxShadow: 'none',
            height: '70px',
            display: 'flex',
            justifyContent: 'center',
          }}>
          
          <Toolbar>
            {isMobile ? (
              <IconButton sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            ) : null}

            <Typography
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: isMobile ? 'center' : 'flex-start',
              }}>
              <Box
                component="img"
                src="/logo.svg"
                sx={{
                  ml: isMobile ? 3 : 0,
                  width: isMobile ? '65%' : '13%',
                }}
              />
            </Typography>

            <Box>
              <Link href="/pages/carrinhos" passHref>
                <IconButton sx={{ mr: isMobile ? 0 : 2 }}>
                  <Badge
                    badgeContent={cartItemCount} // Usa o número de itens do estado
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.7rem',
                        minWidth: '18px',
                        height: '16px',
                      },
                    }}>
                    <ShoppingCartIcon sx={{ width: '26px', height: '26px', color: '#8B96A5' }} />
                  </Badge>
                </IconButton>
              </Link>
              <IconButton>
                <Badge
                  badgeContent={0}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.7rem',
                      minWidth: '18px',
                      height: '16px',
                    },
                  }}>
                  <AccountCircleIcon
                    sx={{
                      width: '27px',
                      height: '27px',
                      color: '#778899',
                      display: isMobile ? 'none' : 'block',
                    }}
                  />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <AppBar
        sx={{
          marginTop: 7,
          width: '100%',
          background: '#DCDCDC',
          boxShadow: 'none',
          height: '70px',
          display: isMobile ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* Mobile AppBar content */}
      </AppBar>

      {showAppBar && (
        <AppBar
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: isMobile ? 16.5 : 9.5,
            background: 'blue',
            color: 'white',
            padding: 1,
            transition: 'opacity 0.5s ease-in-out',
            opacity: showAppBar ? 1 : 0,
          }}>
          Frete Grátis nas Compras acima de R$ 100
        </AppBar>
      )}
    </>
  );
}
