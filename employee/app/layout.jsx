import "./globals.css";

export const metadata = {
  title: "Employee Management",
  description: "Learning Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}