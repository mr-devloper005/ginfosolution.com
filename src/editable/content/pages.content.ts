import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Discover trusted businesses near you',
      description: 'Find, compare, and connect with trusted businesses through a clear, practical directory.',
      openGraphTitle: 'Discover trusted businesses near you',
      openGraphDescription: 'A focused business directory for confident local discovery.',
      keywords: ['business directory', 'local businesses', 'business listings', 'find services'],
    },
    hero: {
      badge: 'The smarter business directory',
      title: ['Find the right business.', 'Make the next move.'],
      description: 'Search trusted companies, compare services, and connect directly. Every listing is designed to give you the useful details first.',
      primaryCta: { label: 'Browse businesses', href: '/listing' },
      secondaryCta: { label: 'List your business', href: '/signup' },
      searchPlaceholder: 'Search businesses, services, or locations',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for reading, browsing, and connecting different kinds of content.',
      paragraphs: [
        'This site brings together article-style reading, visual browsing, and structured discovery so visitors can move naturally between different content types.',
        'Instead of separating stories, visuals, and supporting resources into disconnected surfaces, the platform keeps them connected in one place with consistent navigation and easier exploration.',
        'Whether someone starts with a story, an image-led post, a listing, or a resource page, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for articles, visuals, listings, and supporting resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore articles, visuals, and resources through one connected experience.',
      description: 'Move between articles, image-led posts, listings, and resources through one clearer and more connected visual system.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Sales', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'Business discovery should feel clear, useful, and human.',
    description: `${slot4BrandConfig.siteName} helps people find dependable businesses and gives companies a focused place to explain what they do best.`,
    paragraphs: [
      'We organize business information around the questions customers actually ask: what does this company do, where does it operate, and how can I get in touch?',
      'For business owners, we provide a direct, credible profile that makes services easier to discover and compare.',
    ],
    values: [
      {
        title: 'Useful details first',
        description: 'Every page prioritizes services, location, contact details, and the information customers need to decide.',
      },
      {
        title: 'Visibility for real businesses',
        description: 'Companies get a professional place to explain their value and connect with people already looking.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'Clean navigation and transparent listing details make business discovery faster and more confident.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Let’s help your business get discovered.',
    description: 'Ask about adding a company, updating a listing, partnership opportunities, or finding the right business category. Our team will point you in the right direction.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Search businesses, services, and locations.',
      description: 'Use a business name, service, category, or location to find the right listing quickly.',
      placeholder: 'Try “web design”, “accounting”, or a city',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create a business listing that earns attention.',
      description: 'Add clear details, services, imagery, and contact information so customers can understand and reach your business.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back. Your business presence is waiting.',
      description: 'Login to create listings, manage submissions, and keep your business information ready for customers.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create an account and put your business on the map.',
      description: 'Join the directory to create a polished business listing and make it easier for customers to find you.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
