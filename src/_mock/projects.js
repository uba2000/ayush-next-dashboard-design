import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const project = {
  title: 'Digtial Marketing Project',
  tags: ['Graphic design', 'digital marketing'],
  date: '2020-12-24T23:00:00.000Z',
  checked: false
}

let projects = []

for (let i = 0; i < 40; i++) {
  projects.push({ id: faker.datatype.uuid(), ...project, title: `Digtial Marketing Project ${i}`, })
}

export default projects;
