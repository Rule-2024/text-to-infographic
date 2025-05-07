import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Multilingual Infographic Creator | AI Text to Infographic Tool',
  description: 'Create infographics in multiple languages with our AI text to infographic tool. Automatic language detection and processing for global content creation.',
  keywords: ['ai text to infographic', 'multilingual infographic', 'text to infographic ai free', 'language support infographic', 'global infographic creator', 'international infographic tool'],
  alternates: {
    canonical: 'https://texttoinfographic.online/features/language-support',
  },
  openGraph: {
    title: 'Multilingual Infographic Creator | AI Text to Infographic Tool',
    description: 'Create infographics in multiple languages with our AI text to infographic tool. Automatic language detection and processing for global content creation.',
    url: 'https://texttoinfographic.online/features/language-support',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multilingual Infographic Creator | AI Text to Infographic Tool',
    description: 'Create infographics in multiple languages with our AI text to infographic tool. Automatic language detection and processing for global content creation.',
  },
};

export default function LanguageSupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="structured-data-language-support"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Multilingual Infographic Creator',
            description: 'Create infographics in multiple languages with our AI text to infographic tool. Automatic language detection and processing for global content creation.',
            url: 'https://texttoinfographic.online/features/language-support',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Text to Infographic',
              url: 'https://texttoinfographic.online'
            },
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'Text to Infographic Language Support Feature',
              applicationCategory: 'DesignApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              featureList: [
                'Automatic language detection',
                'Support for major global languages',
                'Proper text rendering in all languages',
                'Culturally appropriate design elements'
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}
