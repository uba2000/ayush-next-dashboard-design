import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const project = {
  title: 'Digtial Marketing Articles',
  tags: ['Graphic design', 'digital marketing'],
  date: '2 days ago',
  checked: false
}

let projects = []

for (let i = 0; i < 40; i++) {
  projects.push({ id: faker.datatype.uuid(), ...project })
}

export default projects;
