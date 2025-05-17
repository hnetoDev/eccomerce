"use client"

import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import '@/app/globals.css'
export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        containerClassName="!w-screen !left-0 !right-0 !mx-0 px-0"
        position="top-center"
        toastOptions={{
          className: "!w-full !rounded-none sm:w-auto sm:rounded-md mx-0 sm:mx-auto",
          duration: 3000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "12px 24px",
            fontWeight: "500",
          },
          success: {
            className: 'w-screen',
            style: {
              background: "#02c248",
              color: "#fff",
            },
            iconTheme: {
              primary: "#ffffff", // green-500
              secondary: "#02d448",
            },
          },
          error: {
            className: 'w-full',
            style: {
              background: "#ef4444",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff", // red-500
              secondary: "#ef4444",
            },
          },
          loading: {
            className: '',
            iconTheme: {
              primary: "#3b82f6", // blue-500
              secondary: "#fff",
            },
          }
        }}
      />
    </>
  )
}
