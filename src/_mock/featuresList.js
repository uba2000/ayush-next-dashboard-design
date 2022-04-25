import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const FEATURESLIST_NAME = [
  'Paragraph Writer',
  'Article Rewriter',
  'Blog Titles',
  'Blog Ideas',
  'Blog Titles (Listicles)',
  'Blog Intros',
  'Blog Outlines'
]

const featureList = FEATURESLIST_NAME.map((feature) => {
  return {
    id: faker.datatype.uuid(),
    user: faker.name.findName(),
    feature,
    date: '2 days ago',
  }
})

export default featureList;