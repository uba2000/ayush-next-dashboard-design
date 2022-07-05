import { forEach } from 'lodash';
import { faker } from '@faker-js/faker';

export function fQue(questions) {
  let newArray = [];
  forEach(questions, (value) => {
    if (
      value.split('Search for:')[0] != 'undefined' &&
      value.split('Search for:')[1] != 'undefined'
    ) {
      newArray.push({
        id: faker.datatype.uuid(),
        question: value.split('Search for:')[0],
        searchFor: value.split('Search for:')[1],
      });
    }
  });

  return newArray;
}
