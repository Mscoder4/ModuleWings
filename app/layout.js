import "./globals.css";

export const metadata = {
  title: "Admin Panel",
  description: "ModuleWings Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/fonts.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
