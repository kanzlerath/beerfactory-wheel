import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = { title:"Beer Factory — Твой счастливый стол", description:"Колесо подарков Beer Factory" };
export const viewport: Viewport = { width:"device-width", initialScale:1, viewportFit:"cover", themeColor:"#f8f5ee" };
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) { return <html lang="ru"><body>{children}</body></html>; }
