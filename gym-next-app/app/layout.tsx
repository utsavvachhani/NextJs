import "@/app/globals.css";
import Navbar from "../components/navbar/Navbar";

export const metadata = {
  title: "Fitnezz - Your Fitness Journey Starts Here",
  description: "Premium fitness and gym management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
