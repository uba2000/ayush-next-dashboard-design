import { faker } from '@faker-js/faker';

import { post } from './http';

export async function aQuestions(questions, noArr = false) {
  const post_array = [];

  const aKeywords = noArr ? questions : questions.map((item) => item.question);

  post_array.push({
    location_name: 'United States',
    language_name: 'English',
    bid: 999.0,
    match: 'exact',
    keywords: aKeywords,
  });

  const { response, error } = await post({
    url: `https://api.dataforseo.com/v3/keywords_data/google_ads/ad_traffic_by_keywords/live`,
    auth: {
      username: 'christian@whitelabelresell.com',
      password: ',apNYFE__8PgYg.9',
    },
    data: post_array,
    headers: {
      'content-type': 'application/json',
    },
  });

  console.log(response);

  if (response) {
    var result = response['data']['tasks'];

    console.log(result);
  } else if (error) {
    console.log(error);
  }

  return questions.map((question) => {
    return {
      ...question,
      cpc: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
      volume: faker.datatype.number({ min: 100, max: 2000, precision: 1 }),
      traffic: faker.datatype.number({ min: 1000, max: 200000, precision: 1 }),
      difficulty: faker.datatype.number({ min: 0, max: 2, precision: 0.01 }),
      trending: faker.datatype.number({ min: 0, max: 100, precision: 1 }),
      ait: faker.datatype.number({ min: 0, max: 300, precision: 1 }),
    };
  });
}
