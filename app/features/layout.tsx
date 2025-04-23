import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Text to Infographic Features | Free Infographic Generator',
  description: 'Explore the powerful features of our AI text to infographic tool. Convert text to stunning infographics with our free, no-login required infographic maker.',
  keywords: ['ai text to infographic', 'text to infographic generator', 'text to infographic ai free', 'free infographic maker', 'convert text to infographic', 'infographic generator online'],
  alternates: {
    canonical: 'https://texttoinfographic.online/features',
  },
  openGraph: {
    title: 'AI Text to Infographic Features | Free Infographic Generator',
    description: 'Explore the powerful features of our AI text to infographic tool. Convert text to stunning infographics with our free, no-login required infographic maker.',
    url: 'https://texttoinfographic.online/features',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Text to Infographic Features | Free Infographic Generator',
    description: 'Explore the powerful features of our AI text to infographic tool. Convert text to stunning infographics with our free, no-login required infographic maker.',
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
