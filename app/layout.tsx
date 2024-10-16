// layout.tsx

// Ensure the path to globals.css is correct
import '../styles/globals.css'; // Adjust the path as necessary

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}