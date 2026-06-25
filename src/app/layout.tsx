import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Haarini SK — Data Science Engineer',
  description:
    'Portfolio of Haarini SK, a final-year Integrated M.Tech Data Science Engineering student at VIT Vellore, building machine learning systems and data-driven solutions.',
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
