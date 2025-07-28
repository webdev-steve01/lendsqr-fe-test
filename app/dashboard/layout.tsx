import NavBar from "@/components/navigation/NavBar";
import SearchBar from "@/components/ui/seacrhbar/SearchBar";
import DesktopSideBar from "@/components/ui/sidebar/DesktopSideBar";
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
