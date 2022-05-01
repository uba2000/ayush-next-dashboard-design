import { faker } from '@faker-js/faker';

import articleContent from './article-content';

// ----------------------------------------------------------------------

const article = {
  title: 'How to start agency',
  tags: ['Graphic design', 'digital marketing'],
  date: '2 days ago',
  checked: false,
  content: articleContent,
}

let articles = []

for (let i = 0; i < 40; i++) {
  articles.push({ id: faker.datatype.uuid(), ...article })
}

export default articles;
