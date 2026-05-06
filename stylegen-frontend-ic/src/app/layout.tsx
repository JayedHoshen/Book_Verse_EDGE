import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "../styles/globals.css";

const hindiSiliguri = Hind_Siliguri({
  variable: "--font-hindi-siliguri",
  weight: ["300", "400", "500", "600", "700",],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "StyleGen",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hindiSiliguri.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
