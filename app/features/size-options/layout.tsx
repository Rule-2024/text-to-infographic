import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Infographic Size Options | AI Text to Infographic Tool',
  description: 'Choose from multiple size options for your AI-generated infographics. Create in 16:9 for presentations, A4 for printing, or mobile-friendly vertical formats.',
  keywords: ['ai text to infographic', 'infographic size options', 'text to infographic ai free', 'infographic dimensions', 'presentation infographics', 'mobile infographics'],
  alternates: {
    canonical: 'https://texttoinfographic.online/features/size-options',
  },
  openGraph: {
    title: 'Infographic Size Options | AI Text to Infographic Tool',
    description: 'Choose from multiple size options for your AI-generated infographics. Create in 16:9 for presentations, A4 for printing, or mobile-friendly vertical formats.',
    url: 'https://texttoinfographic.online/features/size-options',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infographic Size Options | AI Text to Infographic Tool',
    description: 'Choose from multiple size options for your AI-generated infographics. Create in 16:9 for presentations, A4 for printing, or mobile-friendly vertical formats.',
  },
};

export default function SizeOptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="structured-data-size-options"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Infographic Size Options',
            description: 'Choose from multiple size options for your AI-generated infographics. Create in 16:9 for presentations, A4 for printing, or mobile-friendly vertical formats.',
            url: 'https://texttoinfographic.online/features/size-options',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Text to Infographic',
              url: 'https://texttoinfographic.online'
            },
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'Text to Infographic Size Options Feature',
              applicationCategory: 'DesignApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              featureList: [
                '16:9 format for presentations',
                'A4 landscape for printing',
                'A4 portrait for documents',
                'Mobile-friendly vertical format'
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}
