import type { Metadata } from "next";
import { Paytone_One, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import RootContextProvider from "../context/RootContext";
import Head from "next/head";

const paytone = Paytone_One({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Web developer quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta content="#0f0d0e" name="theme-color" />
      </Head>
      <body className={`${paytone.className} poppins.className bg-dark`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootContextProvider>{children}</RootContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
