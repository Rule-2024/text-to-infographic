import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'AI Infographic Design Styles | Text to Infographic Generator',
  description:
    'Explore the professional design styles our AI text to infographic tool offers. Create beautiful infographics with automatic color schemes, layouts, and visual elements.',
  keywords: [
    'ai text to infographic',
    'infographic design styles',
    'text to infographic ai free',
    'automatic infographic design',
    'free infographic maker',
    'infographic templates',
  ],
  alternates: {
    canonical: 'https://texttoinfographic.online/features/design-styles',
  },
  openGraph: {
    title: 'AI Infographic Design Styles | Text to Infographic Generator',
    description:
      'Explore the professional design styles our AI text to infographic tool offers. Create beautiful infographics with automatic color schemes, layouts, and visual elements.',
    url: 'https://texttoinfographic.online/features/design-styles',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Infographic Design Styles | Text to Infographic Generator',
    description:
      'Explore the professional design styles our AI text to infographic tool offers. Create beautiful infographics with automatic color schemes, layouts, and visual elements.',
  },
};

export default function DesignStylesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="structured-data-design-styles"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'AI Infographic Design Styles',
            description:
              'Explore the professional design styles our AI text to infographic tool offers. Create beautiful infographics with automatic color schemes, layouts, and visual elements.',
            url: 'https://texttoinfographic.online/features/design-styles',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Text to Infographic',
              url: 'https://texttoinfographic.online',
            },
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'Text to Infographic Design Feature',
              applicationCategory: 'DesignApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'Professional color schemes',
                'Automatic layout selection',
                'Visual elements and icons',
                'Modern design templates',
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}
