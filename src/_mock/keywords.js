import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const KEYWORDS_NAME = [
  'What is the most important factor in an SEO campaign?',
  'What is SEO and how it works?',
  'What is SEO example?',
  'What are the 4 main components of an SEO?',
  'What are the 4 main components of an SEO? ',
  'What is a marketing SEO?',
  'What is SEO example?',
  'What are the 4 main components of an SEO?',
  'What is SEO and how it works?',
  'What is the most important factor in an SEO campaign?',
  'What is SEO and how it works?',
  'What is SEO example?',
  'What are the 4 main components of an SEO?',
]

const keywords = KEYWORDS_NAME.map((keyword) => {
  return {
    id: faker.datatype.uuid(),
    keyword
  }
})

export default keywords;