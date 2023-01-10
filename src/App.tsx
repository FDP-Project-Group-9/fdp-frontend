import { ThemeProvider } from '@mui/material';

import AppRoutes from './AppRoutes';
import Layout from './containers/Layout/Layout';

import { theme } from "./Theme";

import './App.css';

function App() {
  return (
    <ThemeProvider theme = {theme}>
      <Layout>
        <AppRoutes />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
