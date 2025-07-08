// components/UserMenu.tsx

import React, { useState, MouseEvent, useCallback, useEffect } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from '@mui/material';

import { useDeveloperModal } from 'src/context/ModalContext';
import api from 'src/utils/api';
import { Developer } from 'src/utils/types';
interface UserMenuProps {
  userDetails: any;
  onViewProfile?: () => void;
  onEditProfile?: () => void;
  onLogout?: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  userDetails,

  onLogout,
}) => {
  const [developer, setDeveloper] = useState<Developer>();
  const { openModal } = useDeveloperModal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const apiUrl = process.env.API_URL
  const fetchDevelopers = useCallback(async () => {
  
  try {
    if(userDetails?.user_id){
      const res = await api.get(`${apiUrl}/developers/${userDetails?.user_id}`);
      const data = res.data;
      setDeveloper(data);
      console.log(res)
    }
    
  } catch (error) {
    console.error('Error fetching developers:', error);
  }
}, []);

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);
const user = {
  _id: 1,
  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  skills: ["JavaScript", "React", "Node.js"],
  experience: "3 years",
  location: "New York, USA",
  createdAt: "2024-12-01T10:30:00.000Z",
  userId: "u123456789"
};
  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = () => {
    handleMenuClose();
    onLogout?.();
  };

  return (
   
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body2" color="text.secondary">
        {userDetails?.name ?? 'User'}
      </Typography>
      <IconButton onClick={handleMenuOpen} size="small">
        <Avatar sx={{ width: 32, height: 32 }}>
          {userDetails?.name?.charAt(0).toUpperCase() ?? 'User'}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={ () => {
          openModal(developer, 'view')
          handleMenuClose();
          }  
          }>View Profile</MenuItem>
        <MenuItem onClick={ () => {
          openModal(developer, 'edit')
          handleMenuClose();
          }  }>Edit Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
    
  );
};

export default UserMenu;
