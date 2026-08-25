import { Cormorant_Garamond } from "next/font/google";
import "./global.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://convite-maria-sage.vercel.app"
      : "http://localhost:3000"
  ),

  title: "Maria Clara | 15 Anos",

  description:
    "Você está convidado para uma noite inesquecível.",

  openGraph: {
    title: "Maria Clara • 15 Anos",
    description:
      "Um baile de máscaras, elegância e momentos inesquecíveis.",
    images: ["/fotos/maria8.jpeg"],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={cormorant.className}>
        {children}
      </body>
    </html>
  );
}