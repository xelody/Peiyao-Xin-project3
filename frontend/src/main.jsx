import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Password from './components/Password';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import { AuthProvider } from './components/AuthContext';

const router = createBrowserRouter([
  {
    path: '/password/:userId',
    element: <Password />
  },
  {
    path: '/password',
    element: <Password />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <CreateUser />
  },
  {
    path: '/',
    element: <Home />
  },


])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
