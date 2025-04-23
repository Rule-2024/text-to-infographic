import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Text Analysis for Infographics | Text to Infographic Tool',
  description: 'Learn how our AI text analysis transforms your content into stunning infographics by identifying key points, data, and relationships. Free text to infographic conversion.',
  keywords: ['ai text to infographic', 'text analysis for infographics', 'text to infographic ai free', 'convert text to visual content', 'infographic text analysis', 'key point extraction'],
  alternates: {
    canonical: 'https://texttoinfographic.online/features/text-analysis',
  },
  openGraph: {
    title: 'AI Text Analysis for Infographics | Text to Infographic Tool',
    description: 'Learn how our AI text analysis transforms your content into stunning infographics by identifying key points, data, and relationships. Free text to infographic conversion.',
    url: 'https://texttoinfographic.online/features/text-analysis',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Text Analysis for Infographics | Text to Infographic Tool',
    description: 'Learn how our AI text analysis transforms your content into stunning infographics by identifying key points, data, and relationships. Free text to infographic conversion.',
  },
};

export default function TextAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
