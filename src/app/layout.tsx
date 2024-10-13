import { Metadata } from 'next'
import { Logo } from '../components/Logo'

export const metadata: Metadata = {
  title: 'MEBA App',
  description: 'Your MEBA app description',
  icons: {
    icon: '/images/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="flex flex-col items-center mt-4">
          <Logo />
          <h1 className="text-2xl font-bold mt-2">MEBA App</h1>
        </header>
        {children}
      </body>
    </html>
  )
}
