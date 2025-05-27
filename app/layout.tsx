import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingCta } from '@/components/floating-cta';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Text to Infographic | AI Text to Infographic',
  description:
    'Convert your text into high-quality infographics using AI, free and no login required.',
  metadataBase: new URL('https://texttoinfographic.online'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* 添加移动端优化元标签 */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"
        />
        <meta name="theme-color" content="#7B2FF7" />
        <link rel="icon" href="/images/tab-icon.svg" type="image/svg+xml" sizes="32x32" />
        <link
          rel="icon"
          href="/images/android-chrome-512x512.png"
          type="image/png"
          sizes="512x512"
        />
        <link rel="apple-touch-icon" href="/images/apple-icon.png" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FR53PF6BGP"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FR53PF6BGP');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <FloatingCta />
        </div>
      </body>
    </html>
  );
}
