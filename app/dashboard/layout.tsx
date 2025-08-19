import NavBar from "@/components/navigation/NavBar";
import DesktopSideBar from "@/components/navigation/sidebar/DesktopSideBar";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <NavBar />
      <div className={"dash-body" + ` ${workSans.className}`}>
        <DesktopSideBar />
        {children}
      </div>
    </section>
  );
}
