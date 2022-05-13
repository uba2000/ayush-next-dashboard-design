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
    question: keyword,
    cpc: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    volume: faker.datatype.number({ min: 100, max: 2000, precision: 1 }),
    traffic: faker.datatype.number({ min: 1000, max: 200000, precision: 1 }),
    difficulty: faker.datatype.number({ min: 0, max: 2, precision: 0.01 }),
    trending: faker.datatype.number({ min: 0, max: 100, precision: 1 }),
    ait: faker.datatype.number({ min: 0, max: 300, precision: 1 }),
    checked: false,
  }
})

const returnKeywords = {
  keywords,
  newKeyword: ({ keyword }) => {
    return {
      id: faker.datatype.uuid(),
      keyword,
      cpc: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
      volume: faker.datatype.number({ min: 100, max: 2000, precision: 1 }),
      traffic: faker.datatype.number({ min: 1000, max: 200000, precision: 1 }),
      difficulty: faker.datatype.number({ min: 0, max: 2, precision: 0.01 }),
      trending: faker.datatype.number({ min: 0, max: 100, precision: 1 }),
      ait: faker.datatype.number({ min: 0, max: 300, precision: 1 }),
      checked: false,
    }
  }
}

export default returnKeywords;