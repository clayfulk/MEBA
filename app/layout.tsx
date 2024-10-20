// src/app/layout.tsx
import { Metadata } from 'next';
import { Logo } from '../components/Logo';
import '../styles/globals.css'; // Adjust the path as necessary

export const metadata: Metadata = {
  title: 'MEBA App',
  description: 'Your MEBA app description',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>MEBA App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}