import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Infographic Export Options | AI Text to Infographic Tool',
  description: 'Export your AI-generated infographics in multiple formats (PNG, JPG, PDF) and sizes. Our free text to infographic tool offers flexible download options for any use case.',
  keywords: ['ai text to infographic', 'infographic export formats', 'text to infographic ai free', 'download infographics', 'infographic size options', 'share infographics online'],
  alternates: {
    canonical: 'https://texttoinfographic.online/features/export-options',
  },
  openGraph: {
    title: 'Infographic Export Options | AI Text to Infographic Tool',
    description: 'Export your AI-generated infographics in multiple formats (PNG, JPG, PDF) and sizes. Our free text to infographic tool offers flexible download options for any use case.',
    url: 'https://texttoinfographic.online/features/export-options',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infographic Export Options | AI Text to Infographic Tool',
    description: 'Export your AI-generated infographics in multiple formats (PNG, JPG, PDF) and sizes. Our free text to infographic tool offers flexible download options for any use case.',
  },
};

export default function ExportOptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="structured-data-export-options"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Infographic Export Options',
            description: 'Export your AI-generated infographics in multiple formats (PNG, JPG, PDF) and sizes. Our free text to infographic tool offers flexible download options for any use case.',
            url: 'https://texttoinfographic.online/features/export-options',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Text to Infographic',
              url: 'https://texttoinfographic.online'
            },
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'Text to Infographic Export Feature',
              applicationCategory: 'DesignApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              featureList: [
                'PNG export for web use',
                'JPG export for sharing',
                'PDF export for printing',
                'Multiple size options'
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}
