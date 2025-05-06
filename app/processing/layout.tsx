import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creating Your Infographic | AI-Powered Design in Progress',
  description: 'Our AI is transforming your text into a stunning infographic. Just a few moments and your professional visual content will be ready to download and share.',
  keywords: ['ai text to infographic', 'creating infographic', 'text to infographic ai free', 'infographic generator', 'text to visual content', 'ai infographic creation', 'infographic processing'],
  alternates: {
    canonical: 'https://texttoinfographic.online/processing',
  },
  openGraph: {
    title: 'Creating Your Infographic | AI-Powered Design in Progress',
    description: 'Our AI is transforming your text into a stunning infographic. Just a few moments and your professional visual content will be ready to download and share.',
    url: 'https://texttoinfographic.online/processing',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creating Your Infographic | AI-Powered Design in Progress',
    description: 'Our AI is transforming your text into a stunning infographic. Just a few moments and your professional visual content will be ready to download and share.',
  },
};

export default function ProcessingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
