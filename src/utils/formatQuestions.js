import { forEach } from 'lodash';
import { faker } from '@faker-js/faker';

export function fQue(questions) {
  let newArray = [];
  forEach(questions, (value) => {
    newArray.push({
      id: faker.datatype.uuid(),
      question: value.split('Search for:')[0],
      searchFor: value.split('Search for:')[1],
    });
  });

  return newArray;
}
