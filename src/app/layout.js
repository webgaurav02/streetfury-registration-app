import "./globals.css";
import LayoutComponent from "./components/LayoutComponent";

export const metadata = {
  title: "MINUS01 STREETJAM",
  description: "Register for MINUS01 STREETJAM 2025, an adrenaline-fueled event designed for passionate street sports enthusiasts. Participate in high-energy competitions, showcase your skills, and experience an electrifying atmosphere with like-minded individuals. Secure your spot now and be part of the action!",
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
