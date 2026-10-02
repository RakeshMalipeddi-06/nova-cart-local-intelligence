import './globals.css';

export const metadata = {
  title: 'NOVA Local Intelligence | NOVA CART',
  description: 'Availability intelligence for local stores. Know what is actually available.',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
