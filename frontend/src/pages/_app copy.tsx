// pages/_app.tsx
import * as React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@mui/x-data-grid/styles.css'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // bootstrap primary blue color
    },
  },
  spacing: 8, // MUI spacing base like Bootstrap 8px grid
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
