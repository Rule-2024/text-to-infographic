import Script from 'next/script'

export default function Schema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Text to Infographic',
    url: 'https://texttoinfographic.online',
    description: 'Transform your text into stunning infographics using AI technology. No design skills required.',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'Convert text to infographics',
      'AI-powered design',
      'No design skills required',
      'Free to use',
      'No login required'
    ],
    screenshot: 'https://texttoinfographic.online/images/screenshot.png',
    creator: {
      '@type': 'Organization',
      name: 'Text to Infographic'
    }
  }

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
