import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const article = {
  title: 'How to start agency',
  tags: ['Graphic design', 'digital marketing'],
  date: '2 days ago',
  checked: false
}

let articles = []

for (let i = 0; i < 40; i++) {
  articles.push({ id: faker.datatype.uuid(), ...article })
}

export default articles;
