import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Student Management System",
  description: "Student Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}