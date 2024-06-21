import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import NavBar from "./NavBar";
import LocalFont from "next/font/local";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppin = LocalFont({
  src: "../public/fonts/poppins-regular-webfont.woff2",
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Github Issue  Tracker",
  description: "Track Github Issues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={poppin.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme radius="large">
              <NavBar />

              <main className="p-4">
                <Container>{children}</Container>
              </main>
              {/* <ThemePanel /> to customize the theme */}
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
