"use client"

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "../styles/index.css";
import "node_modules/react-modal-video/css/modal-video.css";
import ScrollToTop from "@/components/ScrollToTop";
import './layout.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-dark-blut-dark">
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
import { Providers } from "./providers";