import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ReduxProvider } from "./provider";
import FooterComponent from "@/components/FooterComponent";

export const metadata: Metadata = {
  title: "Yksynk | Gerencie Projetos com Estilo e Eficiência",
  description:
    "Com o Yksynk você cria, organiza e monitora seus projetos em um só lugar. Esqueça planilhas e ganhe produtividade com nosso dashboard visual e intuitivo.",
  keywords: [
    "gerenciamento de projetos",
    "dashboard",
    "Next.js",
    "produtividade",
    "Yksynk",
    "organização de tarefas",
    "plataforma de projetos",
  ],
  authors: [{ name: "Daniel Rocha", url: "https://github.com/Dannick10" }],
  creator: "Daniel Rocha",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://yksynk.vercel.app",
    title: "Yksynk | Gerencie Projetos com Estilo e Eficiência",
    description:
      "Transforme ideias em projetos bem organizados com a plataforma Yksynk. Visualize tarefas, acompanhe prazos e evolua com clareza.",
    siteName: "Yksynk",
    images: [
      {
        url: "https://yksynk.vercel.app/preview.png",
        width: 1200,
        height: 630,
        alt: "Dashboard do Yksynk com projetos organizados",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Header />
          <main className="pt-10 md:pt-20 bg-gray-50 min-h-screen">
          {children}
          </main>
          <FooterComponent />
        </ReduxProvider>
      </body>
    </html>
  );
}
