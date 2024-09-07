import React, { useState}  from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import RootPage from './routes/root';
import LoginPage from './routes/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}


// root.render(
//   <React.StrictMode>
//     <ThemeProviderWrapper attribute="class">
//       <Theme>
//         <RouterProvider router={router} />
//       </Theme>
//     </ThemeProviderWrapper>
//   </React.StrictMode>
// );

