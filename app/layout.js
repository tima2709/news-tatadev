import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import {Toaster} from "@/components/ui/toaster";
import {getMetaTags} from "@/lib/fetchData";

const inter = Inter({ subsets: ["latin"] });
const data = await getMetaTags('home');

export const metadata = {
    title: data?.title || "Чуйские известия",
    description: data?.description || "Актуальные новости",
    logo: data?.image ||  "/logo-image.svg",
    openGraph: {
        title: data?.title || "Чуйские известия",
        description: data?.description || "Актуальные новости",
        url: data?.url || "https://chuiskieizvestia.kg/",
        type: "website",
        images: [
            {
                url: data?.image || "/logo-with-name.svg",
                width: 800,
                height: 600,
                alt: data?.title || "Чуйские известия",
            },
        ],
    },
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
