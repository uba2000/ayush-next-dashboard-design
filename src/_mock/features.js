import { faker } from '@faker-js/faker';

import { convertToSlug } from '../utils/sluggify'

// ----------------------------------------------------------------------

const FEATURE_NAME = [
  'Facebook Primary Text~ads',
  'Facebook Headlines~ads',
  'Google Ads Headlines~ads',
  'Google Ads Description~ads',
  'Paragraph Rewriter~articles',
  'Rewrite With Keyword~articles',
  'Paragraph Writer~articles',
  'Grammar Rewriter~articles',
  'Essay Intros~articles',
  'Essay Outlines~articles',
  'Text Summarizer (TL;DR)~articles',
  'Bulk Blog Writing~blogging',
  'Blog Titles~blogging',
  'Blog Titles (Listicles)~blogging',
  'Blog Intros~blogging',
  'Blog Ideas~blogging',
  'Blog Outlines~blogging',
  'Ecommerce Product Names~ecommerce',
  'Ecommerce Product Descriptions~ecommerce',
  'Ecommerce Category Descriptions~ecommerce',
  'Product Descriptions~ecommerce',
  'Follow-Up Email~email',
  'Welcome Email~email',
  'Cancellation Email~email',
  'Email Subject Lines~email',
  'Confirmation Email~email',
  'Google my Business data~gmb',
  'Value Proposition~sales',
  'AIDA Formula~sales',
  'QUEST Formula~sales',
  'Pain-Agitate-Solution~sales',
  'Feature To Benefit~sales',
  'SERP Explorer~seo',
  'Keywords Data~seo',
  'On Page SEO~seo',
  'Meta Descriptions~seo',
  'Backlinks~seo',
  'Dataforseo Labs~seo',
  'Meta Titles (URL)~seo',
  'Meta Descriptions (URL)~seo',
  'Video Script Intros~video',
  'Video Script Outlines~video',
  'Video Script Section~video',
  'Video Titles~video',
  'Video Descriptions~video',
  'Website Headlines~web-copy',
  'Website Subheaders~web-copy',
  'About Us~web-copy',
  'Call To Action~web-copy',
  'FAQs~web-copy',
  'FAQ Answers~web-copy',
  'Testimonials / Reviews~web-copy',
  'Quora Answers~other',
  'Startup Name Generator~other'
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
