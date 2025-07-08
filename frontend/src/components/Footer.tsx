import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 2,
      px: 4,
      mt: 'auto',
      bgcolor: 'background.paper',
      borderTop: '1px solid #ddd',
      textAlign: 'center',
    }}
  >
    <Typography variant="body2" color="text.secondary">
      &copy; {new Date().getFullYear()} My Developer Dashboard. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
