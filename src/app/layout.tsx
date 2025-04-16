import type { Metadata } from "next";
import {  Roboto } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/react-query";
const roboto = Roboto({
    subsets : ["latin"],
    weight : "400"
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
      </body>
    </html>
  );
}
