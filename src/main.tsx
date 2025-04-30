import {lazy, StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router"
import Cart from "./pages/Cart/Cart.tsx";
import Error from "./pages/Error/Error.tsx";
import Layout from "./layout/Menu/Menu.tsx";
import Product from "./pages/Product/Product.tsx";
import axios from "axios";
import {PREFIX} from "./helpers/API.ts";

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Suspense fallback={<>ЗАГРУЗКА!</>}><Menu /></Suspense>,
                handle: { title: 'Главная' },
            },

            {
                path: '/cart',
                element: <Cart />,
                handle: { title: 'Корзина' }
            },

            {
                path: '/product/:id',
                element: <Product />,
                errorElement: <>Ошибка!</>,
                loader: async ({params}) => {
                    await new Promise<void>((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 2000)
                    })
                    const { data } = await axios.get(`${PREFIX}/products/${params.id}`);

                    return data;
                }
            }
        ]
    },
    {
        path: '*',
        element: <Error />
    }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
