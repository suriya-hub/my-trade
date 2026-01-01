"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function ClientProvider({ children }: { children: ReactNode }) {


  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        icon={false}
        toastClassName="custom-toast"
        closeButton={false}
      />
    </Provider>
  );
}

