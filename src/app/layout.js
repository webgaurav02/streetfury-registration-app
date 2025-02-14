import "./globals.css";
import LayoutComponent from "./components/LayoutComponent";

export const metadata = {
  title: "StreetFury | Minus01",
  description: "Register for MINUS01 STREETJAM 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`font-assistant antialiased`}
      >
        <LayoutComponent children={children} />
      </body>
    </html>
  );
}
