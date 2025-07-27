import NavBar from "@/components/navigation/NavBar";
import SearchBar from "@/components/ui/seacrhbar/SearchBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <NavBar />
      {children}
    </section>
  );
}
