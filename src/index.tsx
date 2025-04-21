import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderForm from "./pages/Orderform";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/orderForm",
    element: <OrderForm />,
  },
]);

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
