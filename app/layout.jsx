import { Cormorant_Garamond } from "next/font/google";
import "./global.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={cormorant.className}>
        {children}
      </body>
    </html>
  );
}