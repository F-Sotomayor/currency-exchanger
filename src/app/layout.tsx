import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Currency Exchange",
  description: "Exchange your currency with realtime information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container">
        <header className="fixed-header">
          <h2>Currency Exchange</h2>
        </header>
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
