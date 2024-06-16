"use client";

import { Inter, Josefin_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./Provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { useLogedUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "@/components/Loader";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "800"],
  variable: "--font-Poppins",
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["200", "400", "500"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} bg-white dark:bg-gray-900   dark:from-gray-900 dark:to-black dark:bg-gradient-to-b transition duration-200 ease-in-out bg-no-repeat`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>
              {children}
              </Custom>
              <ToastContainer draggable position="top-center" />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}


type CustomProps = {
  children: React.ReactNode;
};

const Custom: React.FC<CustomProps> = ({ children }) => {

  const { isLoading } = useLogedUserQuery({});
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div><Loader /></div>; 
  }
  return (
    <div>
      {isLoading ? <Loader /> : <>{children}</>}
    </div>
  );
};