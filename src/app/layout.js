import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'T T I Meal Reviewer',
  description: 'TTI Meal Reviewer - People associated with TTI can review meals served using this app.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <title>TTI Meal Reviewer</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} bg-light`}>
      {children}
      </body>
    </html>
  )
}
