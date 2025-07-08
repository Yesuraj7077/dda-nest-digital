'use client';

import React from 'react';
import { Box, Typography, Button, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import withAuth from 'src/pages/withAuth';

const UnauthenticatedPage: React.FC = () => {
  const { login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md" sx={{ mt: isMobile ? 8 : 16 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        sx={{
          p: isMobile ? 3 : 6,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold" gutterBottom>
          You're not logged in
        </Typography>
        <Typography variant="body1" mb={4}>
          You must be authenticated to view this page.
        </Typography>

        <Button variant="contained" size="large" onClick={login}>
          Login Now
        </Button>
      </Box>
    </Container>
  );
};

export default withAuth(UnauthenticatedPage);
