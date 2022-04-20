import { faker } from '@faker-js/faker';

import { convertToSlug } from '../utils/sluggify'

// ----------------------------------------------------------------------

const FEATURE_NAME = [
  'Facebook Primary Text~ads',
  'Facebook Headlines',
  'Google Ads Headlines',
  'Google Ads Description',
  'Paragraph Rewriter',
  'Rewrite With Keyword',
  'Paragraph Writer',
  'Grammar Rewriter',
  'Essay Intros',
  'Essay Outlines',
  'Text Summarizer (TL;DR)',
  'Bulk Blog Writing',
  'Blog Titles',
  'Blog Titles (Listicles)',
  'Blog Intros',
  'Blog Ideas',
  'Blog Outlines',
  'Ecommerce Product Names',
  'Ecommerce Product Descriptions',
  'Ecommerce Category Descriptions',
  'Product Descriptions',
  'Follow-Up Email',
  'Welcome Email',
  'Cancellation Email',
  'Email Subject Lines',
  'Confirmation Email',
  'Google my Business data',
  'Value Proposition',
  'AIDA Formula',
  'QUEST Formula',
  'Pain-Agitate-Solution',
  'Feature To Benefit',
  'SERP Explorer',
  'Keywords Data',
  'On Page SEO',
  'Meta Descriptions',
  'Backlinks',
  'Dataforseo Labs',
  'Meta Titles (URL)',
  'Meta Descriptions (URL)',
  'Video Script Intros',
  'Video Script Outlines',
  'Video Script Section',
  'Video Titles',
  'Video Descriptions',
  'Website Headlines',
  'Website Subheaders',
  'About Us',
  'Call To Action',
  'FAQs',
  'FAQ Answers',
  'Testimonials / Reviews',
  'Quora Answers',
  'Startup Name Generator'
];

// ----------------------------------------------------------------------

const feature = FEATURE_NAME.map((_, index) => {
  let [featureName, type] = FEATURE_NAME[index].split('~')

  let slug = convertToSlug(featureName)

  return {
    id: faker.datatype.uuid(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa at nibh aliquam nec sapien.',
    slug: slug,
    name: FEATURE_NAME[index],
    favourite: false,
    type
  };
});

export default feature;
