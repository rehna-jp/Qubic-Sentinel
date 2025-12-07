import type { Metadata } from "next";
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
  title: 'Community Sentinel - Earn Discord Status with Qubic Activity',
  description: 'Transform your blockchain activity into social capital. Automatically earn Discord roles based on verified Qubic on-chain activity.',
  keywords: ['Qubic', 'Discord', 'Blockchain', 'Reputation', 'Automation', 'EasyConnect'],
  openGraph: {
    type: 'website',
    url: 'https://sentinel.qubic.com',
    title: 'Community Sentinel',
    description: 'Where Blockchain Activity Becomes Social Capital',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
