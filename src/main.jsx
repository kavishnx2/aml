import React, { lazy, Suspense, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/main.css';

const queryClient = new QueryClient();

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Integration = lazy(() => import('./pages/Integration'));
const Overview = lazy(() => import('./pages/Overview'));
const Documentation = lazy(() => import('./pages/Documentation'));
const UserDetails = lazy(() => import('./pages/UserDetails'));
const Navbar = lazy(() => import('./components/Navbar'));
const BarLoader = lazy(() => import('./pages/Basic/BarLoader'));
const Map = lazy(() => import('./pages/Map'));
const LineChart = lazy(() => import('./components/LineChart'));

const Loading = () => {
  return <div>Loading...</div>;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = 500; // 2 seconds in milliseconds

    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Overview />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/integration',
      element: <Integration />,
    },
    {
      path: '/UserDetails',
      element: <UserDetails />,
    },
    {
      path: '/Map',
      element: <Map />,
    },
    {
      path: '/LineChart',
      element: <LineChart />,
    },
    {
      path: '/documentation',
      element: <Documentation />,
    },
  ]);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<BarLoader />}>
          {isLoading ? (
            <BarLoader />
          ) : (
            <>
              <Navbar />
              <RouterProvider router={router} />
            </>
          )}
        </Suspense>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
