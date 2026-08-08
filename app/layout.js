import "./globals.css";

export const metadata = {
  title: "Reparent - Parenting Reflection",
  description: "A reflection tool to help parents understand their patterns and heal their inner child",
};

import Clouds from "./components/Clouds";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Clouds />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
