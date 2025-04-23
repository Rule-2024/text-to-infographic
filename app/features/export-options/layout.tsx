import type { Metadata } from 'next';

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
  return <>{children}</>;
}
