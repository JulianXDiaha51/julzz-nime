import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { Config } from "./config";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: Config.name2,
  description: Config.description,
  icons: {
    icon: Config.logo,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-black to-neutral-950 min-h-screen custom-tiktok-background text-white`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}