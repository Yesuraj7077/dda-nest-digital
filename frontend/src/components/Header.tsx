'use client';
import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography, 
  Box,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserMenu from './UserMenu';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
  //userDetails: any

}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  isMobile,
  //userDetails,
}) => {
  const { user, isAdmin, isAuthenticated, login, logout, loading} = useAuth() // Fallback to 'User' if name is not available
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - 280px)` },
        ml: { md: '280px' },
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)',
      }}
      elevation={1}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { md: 'none' } }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
        )}

        
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
         {!isAuthenticated ? 'Login Page' : 'Dashboard'}
        </Typography>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={()=> login() }>
              Login
            </Button>
          ) : (
            
            <UserMenu
              userDetails={ user}
              onLogout={() => logout() }
            />
            
          )}
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
