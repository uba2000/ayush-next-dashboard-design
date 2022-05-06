import { faker } from '@faker-js/faker';

export function aQuestions(questions) {
  return questions.map((question) => {
    return {
      ...question,
      cpc: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
      volume: faker.datatype.number({ min: 100, max: 2000, precision: 1 }),
      traffic: faker.datatype.number({ min: 1000, max: 200000, precision: 1 }),
      difficulty: faker.datatype.number({ min: 0, max: 2, precision: 0.01 }),
      trending: faker.datatype.number({ min: 0, max: 100, precision: 1 }),
      ait: faker.datatype.number({ min: 0, max: 300, precision: 1 }),
      checked: false,
    }
  })
}