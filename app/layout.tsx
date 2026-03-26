import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { setCredential } from "@/services/mainSerive";
import { CREDENTIAL } from "@/public/custom/credential";
// setCredential(CREDENTIAL);
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const raceSport = localFont({
  src: [
    {
      path: "../public/fonts/Race-Sport.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-race",
});

export const metadata: Metadata = {
  title: "FOE Voting",
  description: "Fitness Voting App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${poppins.variable} 
          ${raceSport.variable} 
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
