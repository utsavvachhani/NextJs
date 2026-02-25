import "@/app/globals.css";
import Navbar from "../components/navbar/Navbar";
import { Providers } from "../components/Providers";
import { AuthGuard } from "../components/AuthGuard";
import CustomAlert from "../components/CustomAlert";


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
        <Providers>
          <AuthGuard>
            <CustomAlert />
            <Navbar />
            <main>{children}</main>
          </AuthGuard>
        </Providers>

      </body>
    </html>
  );
}
