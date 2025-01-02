import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Чуйские известия",
  description: "Актуальные новости",
    logo: "/logo-image.png"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
      <Header/>
        <main>
            {children}
        </main>
      <Toaster />
      <Footer/>
      </body>
    </html>
  );
}
