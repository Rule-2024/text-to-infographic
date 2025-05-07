import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'No Login Required | Free AI Text to Infographic Tool',
  description: 'Create infographics instantly with our free AI tool - no login, no registration, no experience needed. Convert text to infographics without creating an account.',
  keywords: ['ai text to infographic', 'no login infographic maker', 'text to infographic ai free', 'infographic without registration', 'free infographic generator', 'no account infographic'],
  alternates: {
    canonical: 'https://texttoinfographic.online/features/no-login',
  },
  openGraph: {
    title: 'No Login Required | Free AI Text to Infographic Tool',
    description: 'Create infographics instantly with our free AI tool - no login, no registration, no experience needed. Convert text to infographics without creating an account.',
    url: 'https://texttoinfographic.online/features/no-login',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'No Login Required | Free AI Text to Infographic Tool',
    description: 'Create infographics instantly with our free AI tool - no login, no registration, no experience needed. Convert text to infographics without creating an account.',
  },
};

export default function NoLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="structured-data-no-login"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'No Login Required Infographic Tool',
            description: 'Create infographics instantly with our free AI tool - no login, no registration, no experience needed. Convert text to infographics without creating an account.',
            url: 'https://texttoinfographic.online/features/no-login',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Text to Infographic',
              url: 'https://texttoinfographic.online'
            },
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'Text to Infographic No Login Feature',
              applicationCategory: 'DesignApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              featureList: [
                'No registration required',
                'Instant access',
                'No personal data collection',
                'Free to use'
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}
