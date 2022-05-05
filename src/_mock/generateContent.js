import { faker } from '@faker-js/faker';
import { sample, orderBy } from 'lodash';


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

const contents = KEYWORDS_NAME.map((keyword) => {
  return {
    id: faker.datatype.number({ min: 1234567, max: 1234585, precision: 1 }),
    title: keyword,
    status: sample(['completed', 'processing', 'waiting']),
    words: faker.datatype.number({ min: 200, max: 1000, precision: 1 })
  }
})

export default orderBy(contents, ['status'], ['asc']);