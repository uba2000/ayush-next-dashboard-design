import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const FEATURE_NAME = [
  'Facebook Primary Text',
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
];

// ----------------------------------------------------------------------

const feature = FEATURE_NAME.map((_, index) => {
  let slug = FEATURE_NAME[index].toLowerCase().replaceAll(' ', '-')

  return {
    id: faker.datatype.uuid(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa at nibh aliquam nec sapien.',
    slug: slug,
    name: FEATURE_NAME[index],
  };
});

export default feature;
