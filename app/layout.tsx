import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ClientProviders from "@/components/client-providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

export const metadata = {
    title: "CreatorID - Student Content App",
    description: "The ultimate content creation platform for students.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
                <ClientProviders>
                    {children}
                    <Toaster />
                </ClientProviders>
            </body>
        </html>
    );
}
