import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";
import { ToastContainer, Slide } from "react-toastify";
import { AppWrapper } from "@/context/index";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-inter">
        <SessionWrapper>
          <AppWrapper>
            <Navbar />
            <ToastContainer
              position="top-right"
              autoClose={1500}
              limit={3}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="colored"
              transition={Slide}
            />
            <main>{children}</main>
          
          </AppWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}