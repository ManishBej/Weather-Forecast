export const metadata = {
  title: 'Weather Forecast App',
  description: 'Get accurate weather forecasts for any location',
  keywords: 'weather, forecast, temperature, climate',
  viewport: 'width=device-width, initial-scale=1',
}
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <link 
            rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" 
          />
        </head>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    )
  }