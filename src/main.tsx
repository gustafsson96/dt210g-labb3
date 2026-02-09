import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { protectedRoutes } from './routes/ProtectedRoutes.tsx'
import { publicRoutes } from './routes/PublicRoutes.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
