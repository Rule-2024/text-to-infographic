import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Infographic Design Styles | Text to Infographic Generator',
  description: 'Explore the professional design styles our AI text to infographic tool offers. Create beautiful infographics with automatic color schemes, layouts, and visual elements.',
  keywords: ['ai text to infographic', 'infographic design styles', 'text to infographic ai free', 'automatic infographic design', 'free infographic maker', 'infographic templates'],
  alternates: {
    canonical: 'https://texttoinfographic.online/features/design-styles',
  },
  openGraph: {
    title: 'AI Infographic Design Styles | Text to Infographic Generator',
    description: 'Explore the professional design styles our AI text to infographic tool offers. Create beautiful infographics with automatic color schemes, layouts, and visual elements.',
    url: 'https://texttoinfographic.online/features/design-styles',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Infographic Design Styles | Text to Infographic Generator',
    description: 'Explore the professional design styles our AI text to infographic tool offers. Create beautiful infographics with automatic color schemes, layouts, and visual elements.',
  },
};

export default function DesignStylesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
