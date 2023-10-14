import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "@/components/SideBar";
import SessionProvider from "@/components/SessionProvider";
import Login from "@/components/Login";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geppetto",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any; // puedes usar un tipo más específico si lo tienes
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              {/* Sidebar*/}
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              </div>
              {/* ClientProvider - Notifications*/}
              <ClientProvider />

              <div className="bg-[#343541] flex-1"> {children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
