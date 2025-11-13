import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "AI Standup Assistant",
  description: "Automated daily standups with AI insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
