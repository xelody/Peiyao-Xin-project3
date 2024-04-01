import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Home from './components/Home'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Password from './components/Password';
import Login from './components/Login';
import CreateUser from './components/CreateUser';

const router = createBrowserRouter([
  {
    path: '/password/:userId',
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
    <RouterProvider router={router } />
  </React.StrictMode>,
)
