import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Create Infographic from Text | AI Text to Infographic Generator',
  description: 'Convert your text into stunning infographics using our AI text to infographic tool. Transform articles, essays, and reports into visual content in seconds.',
  keywords: ['ai text to infographic', 'text to infographic generator', 'convert text to infographic', 'create infographic from text', 'ai infographic maker'],
  alternates: {
    canonical: 'https://texttoinfographic.online/create',
  },
  openGraph: {
    title: 'Create Infographic from Text | AI Text to Infographic Generator',
    description: 'Convert your text into stunning infographics using our AI text to infographic tool. Transform articles, essays, and reports into visual content in seconds.',
    url: 'https://texttoinfographic.online/create',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Infographic from Text | AI Text to Infographic Generator',
    description: 'Convert your text into stunning infographics using our AI text to infographic tool. Transform articles, essays, and reports into visual content in seconds.',
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="structured-data-create"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Create Infographic from Text',
            description: 'Convert your text into stunning infographics using our AI text to infographic tool. Transform articles, essays, and reports into visual content in seconds.',
            url: 'https://texttoinfographic.online/create',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Text to Infographic',
              url: 'https://texttoinfographic.online'
            },
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'Text to Infographic Generator',
              applicationCategory: 'DesignApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '156'
              }
            }
          })
        }}
      />
      {children}
    </>
  );
}
