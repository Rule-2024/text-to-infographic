import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creating Your Infographic | AI Text to Infographic Tool',
  description: 'Watch as our AI transforms your text into a beautiful infographic. Our free text to infographic tool works in seconds with no design skills required.',
  keywords: ['ai text to infographic', 'creating infographic', 'text to infographic ai free', 'infographic generator', 'text to visual content', 'ai infographic creation'],
  alternates: {
    canonical: 'https://texttoinfographic.online/processing',
  },
  openGraph: {
    title: 'Creating Your Infographic | AI Text to Infographic Tool',
    description: 'Watch as our AI transforms your text into a beautiful infographic. Our free text to infographic tool works in seconds with no design skills required.',
    url: 'https://texttoinfographic.online/processing',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creating Your Infographic | AI Text to Infographic Tool',
    description: 'Watch as our AI transforms your text into a beautiful infographic. Our free text to infographic tool works in seconds with no design skills required.',
  },
};

export default function ProcessingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
