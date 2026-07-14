import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SISTEMA — Práctica de autenticación",
  description:
    "Login, registro y mi cuenta sobre localStorage, con contexto de sesión y modo claro/nocturno. Proyecto de práctica 100% frontend.",
};

/*
 * Aplica el tema guardado ANTES del primer pintado para evitar el flash
 * de tema incorrecto. Por eso vive como <script> inline y no en React.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem("sistema:theme");var dark=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(dark)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <AuthProvider>
            <div className="grain" aria-hidden="true" />
            <Navbar />
            <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10">
              {children}
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
