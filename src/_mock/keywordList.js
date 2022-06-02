import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const KEYWORDSLIST_NAME = [
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
  'Keyword list title here ',
]

const keywordList = KEYWORDSLIST_NAME.map((keyword) => {
  return {
    id: faker.datatype.uuid(),
    title: keyword,
    tags: ['Graphic design', 'digital marketing'],
    date: '2020-12-24T23:00:00.000Z',
  }
})

const returnKeywordList = {
  keywordList,
  newKeywordList: ({ keyword }) => {
    return {
      id: faker.datatype.uuid(),
      title: keyword,
      tags: ['Graphic design', 'digital marketing'],
      date: '2 days ago',
      checked: false
    }
  }
}

export default returnKeywordList;