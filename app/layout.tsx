import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "@/redux/provider";
import ThemeProvider from "@/contexts/ThemeContext";
import "./globals.css";
import NavBar from "@/components/layout/NavBar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DBC Desk",
  description: "HelpDesk DBC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <ThemeProvider>
            <NavBar />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
