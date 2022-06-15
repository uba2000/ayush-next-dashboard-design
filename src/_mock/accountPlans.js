import { faker } from '@faker-js/faker';

import { convertToSlug } from '../utils/sluggify';

// ----------------------------------------------------------------------

const plans = [
  {
    id: 'dbdc4630-2e72-4f32-9735-8d5df5f96d4f',
    plan: 'Starter Plan',
    monthLimit: 50000,
    totalProjects: 10,
    keywordListLimit: 10,
    price: 24,
  },
  {
    id: '55ec84f4-55cc-419b-b3e4-930b2c57882c',
    plan: 'Standard Plan',
    monthLimit: 100000,
    totalProjects: 20,
    keywordListLimit: 20,
    price: 74,
  },
  {
    id: '11eb405d-e6a6-42f3-a48b-208bafeaf137',
    plan: 'Premium Plan',
    monthLimit: 200000,
    totalProjects: 40,
    keywordListLimit: 40,
    price: 149,
  },
];

let accountPlans = [];

for (let i = 0; i < plans.length; i++) {
  accountPlans.push({
    ...plans[i],
    slug: convertToSlug(plans[i].plan),
  });
}

export default accountPlans;
