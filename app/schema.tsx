import Script from 'next/script'

export default function Schema() {
  // WebApplication schema
  const webAppSchema = {
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

  // Organization schema with logo
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Text to Infographic',
    url: 'https://texttoinfographic.online',
    logo: 'https://texttoinfographic.online/images/android-chrome-512x512.png',
    description: 'AI-powered tool to transform text into professional infographics with one click. No design experience needed, 100% free.'
  }

  return (
    <>
      <Script
        id="schema-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
