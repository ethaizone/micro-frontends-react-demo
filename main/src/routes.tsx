import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './Layout';
import Page404 from './Page404';
import Home from './pages/Home';
import Pricing from './pages/Pricing';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { element: <Navigate to="/" replace /> },
        { path: '/', element: <Home /> },
        { path: 'pricing', element: <Pricing /> },
        // { path: '/', element: <>123123</> },
        // { path: 'pricing', element: <></> },
        { path: '404', element: <Page404 /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
