import React, { useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from "react-redux";
import { SnackbarProvider } from 'notistack';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { history } from "./helpers/history";

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <HelmetProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
      </SnackbarProvider>
    </HelmetProvider>
  );
}
