import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zprávy",
  description: "iPhone-style message board aplikace",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="m-0 p-0">
        <div className="iphone-container">
          <div className="iphone-notch" />
          <div className="iphone-screen">
            {children}
          </div>
          <div className="iphone-home-indicator" />
        </div>
      </body>
    </html>
  );
}
