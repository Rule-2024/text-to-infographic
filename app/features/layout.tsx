import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'AI Text to Infographic Features | Free Infographic Generator',
  description:
    'Explore the powerful features of our AI text to infographic tool. Convert text to stunning infographics with our free, no-login required infographic maker.',
  keywords: [
    'ai text to infographic',
    'text to infographic generator',
    'text to infographic ai free',
    'free infographic maker',
    'convert text to infographic',
    'infographic generator online',
  ],
  alternates: {
    canonical: 'https://texttoinfographic.online/features',
  },
  openGraph: {
    title: 'AI Text to Infographic Features | Free Infographic Generator',
    description:
      'Explore the powerful features of our AI text to infographic tool. Convert text to stunning infographics with our free, no-login required infographic maker.',
    url: 'https://texttoinfographic.online/features',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Text to Infographic Features | Free Infographic Generator',
    description:
      'Explore the powerful features of our AI text to infographic tool. Convert text to stunning infographics with our free, no-login required infographic maker.',
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="structured-data-features"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'AI Text to Infographic Features',
            description:
              'Explore the powerful features of our AI text to infographic tool. Convert text to stunning infographics with our free, no-login required infographic maker.',
            url: 'https://texttoinfographic.online/features',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Text to Infographic',
              url: 'https://texttoinfographic.online',
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Text Analysis',
                  url: 'https://texttoinfographic.online/features/text-analysis',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Design Styles',
                  url: 'https://texttoinfographic.online/features/design-styles',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Export Options',
                  url: 'https://texttoinfographic.online/features/export-options',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Size Options',
                  url: 'https://texttoinfographic.online/features/size-options',
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Language Support',
                  url: 'https://texttoinfographic.online/features/language-support',
                },
                {
                  '@type': 'ListItem',
                  position: 6,
                  name: 'No Login Required',
                  url: 'https://texttoinfographic.online/features/no-login',
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}
