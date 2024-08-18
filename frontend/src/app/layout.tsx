import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "@/providers/theme.provider";
import { CssBaseline } from "@mui/material";
import { ReactQueryClientProvider } from "@/providers/react-query.provider";
import { Header } from "./layout/header";
import Footer from "./layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Captal",
  description: "One place to analyze all your financial investments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/title.svg" sizes="any" />
      </head>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <AppThemeProvider>
            <CssBaseline />
            <Header />
            {children}
            <Footer />
          </AppThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
