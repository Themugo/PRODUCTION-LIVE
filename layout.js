export const metadata = {
  title: "SIMTRACE",
  description: "Phone intelligence and tracking system"
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ fontFamily: "Arial", padding: 20 }}>
        <h1>SIMTRACE V2</h1>
        {children}
      </body>
    </html>
  )
}
