import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProtectedRoutes from './routes/ProtectedRoutes.tsx'
import { PublicRoutes } from './routes/PublicRoutes.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([...PublicRoutes, ...ProtectedRoutes]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
