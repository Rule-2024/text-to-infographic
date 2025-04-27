import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preview Your Infographic | AI Text to Infographic Tool',
  description: 'Preview and export your AI-generated infographic created from text. Download in multiple formats with our free text to infographic tool.',
  keywords: ['ai text to infographic', 'preview infographic', 'text to infographic ai free', 'export infographic', 'download infographic', 'infographic preview'],
  alternates: {
    canonical: 'https://texttoinfographic.online/preview',
  },
  openGraph: {
    title: 'Preview Your Infographic | AI Text to Infographic Tool',
    description: 'Preview and export your AI-generated infographic created from text. Download in multiple formats with our free text to infographic tool.',
    url: 'https://texttoinfographic.online/preview',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preview Your Infographic | AI Text to Infographic Tool',
    description: 'Preview and export your AI-generated infographic created from text. Download in multiple formats with our free text to infographic tool.',
  },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
