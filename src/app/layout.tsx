import "./globals.css";

export const metadata = {
  title: "Holo Unit Quiz",
  description: "Test your knowledge of Hololive units!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
