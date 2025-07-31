import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./styles/global.scss";
import Head from "next/head";

export const metadata: Metadata = {
  title: "lendsqr-fe-test by osesojeh sylvester paul",
  description: "this is an assessment project for lendsqr ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
