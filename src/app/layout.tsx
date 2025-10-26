import type { Metadata } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  title: '$DEPE - Dead Pepe | The Undead Meme That Refuses to Die',
  description: 'Dead Pepe ($DEPE) - The legendary meme token that rises from the crypt. Join the undead community and witness the resurrection of the most iconic meme in crypto.',
  keywords: ['Dead Pepe', 'DEPE', 'meme token', 'crypto', 'pumpfun', 'solana'],
  authors: [{ name: 'Dead Pepe Community' }],
  openGraph: {
    title: '$DEPE - Dead Pepe',
    description: 'The undead meme that refuses to die',
    type: 'website',
    images: ['/deadpepe.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '$DEPE - Dead Pepe',
    description: 'The undead meme that refuses to die',
    images: ['/deadpepe.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/deadpepe.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
