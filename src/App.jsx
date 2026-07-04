import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { GuestRoute } from "./GuestRoute"
import { ProtectedRoute } from "./ProtectedRoute"
import Layout from "./Layout"
import Politic from './pages/Politica/Politic'


const Login = lazy(() => import("./pages/Login"))
const HomePage = lazy(() => import("./pages/Home/HomePage"))
const Delivery = lazy(() => import("./pages/deliver/Delivery"))
const Payment = lazy(() => import("./pages/Payment"))
const Contacts = lazy(() => import("./pages/Contact/Contacts"))
const Catalog = lazy(() => import("./pages/Catalog"))
const Prvl = lazy(() => import("./pages/deliver/Prvl"))
const Stm = lazy(() => import("./pages/deliver/Stm"))
const Shop = lazy(() => import("./pages/Shop/Shop"))

export default function App() {           
  const router = createBrowserRouter([    
    {
      path: '/login',
      element:
        <GuestRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        </GuestRoute>
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: "true",
          element: <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        },
        {
          path: "delivery",
          element: <Suspense fallback={<div>Loading...</div>}>
            <Delivery />
          </Suspense>
        },
        {
          path: "payment",
          element: <Suspense fallback={<div>Loading...</div>}>
            <Payment />
          </Suspense>
        },
        {
          path: "contacts",
          element: <Suspense fallback={<div>Loading...</div>}>
            <Contacts />
          </Suspense>
        },
        {
          path: "catalog",
          element: <Suspense fallback={<div>Loading...</div>}>
            <Catalog />
          </Suspense>
        },
        {
          path: "prvl",
          element: <Suspense fallback={<div>Loading...</div>}>
            <Prvl />
          </Suspense>
        },
        {
          path: "stm",
          element: <Suspense fallback={<div>Loading...</div>}>
            <Stm />
          </Suspense>
        },
        {
          path: "shop",
          element: <Suspense fallback={<div>Loading...</div>}>
            <Shop />
          </Suspense>
        },  
        {
          path: "/politica",
          element: <Suspense fallback={<div>Loading...</div>}>
            <Politic />
          </Suspense>
        },
      ]
    }
  ])
  return <RouterProvider router={router} />
}


