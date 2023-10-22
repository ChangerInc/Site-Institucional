import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// Páginas
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Converter from "./pages/Converter";
import Pagamento from "./pages/Pagamento";
import UserInterface from "./pages/UserInterface";
import Grupos from "./pages/Grupos";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cadastro",
        element: <Cadastro />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/converter",
        element: <Converter />
      },
      {
        path: "/pagamento",
        element: <Pagamento />
      },
      {
        path: "/user",
        element: <UserInterface />
      },
      {
        path: "/grupo",
        element: <Grupos />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
