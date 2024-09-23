import localFont from "next/font/local";

import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/authContext";
import { Suspense } from "react";
import { Roboto } from "@next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  return (
    <html lang="en">
      <body className={roboto.className}>
        <GoogleOAuthProvider clientId={clientId}>
          <AuthProvider>
            <Suspense>
              <ChakraProvider>{children}</ChakraProvider>
            </Suspense>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
