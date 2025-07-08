'use client';
import React, { useState } from 'react';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
// import { useAuth } from '../context/AuthContext';


const drawerWidth = 280;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  //const { user, isAdmin, login, logout, loading } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <CssBaseline />

      {/* Header */}
      <Header
        onMenuClick={handleDrawerToggle}
        isMobile={isMobile}
       // userDetails={{ user, isAdmin, login, logout }}
      />

      {/* Sidebar + Main Content */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            mt: { xs: 7, sm: 8 },
            p: { xs: 2, sm: 3, md: 4 },
            bgcolor: '#f9fafb',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
