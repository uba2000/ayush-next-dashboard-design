import { faker } from '@faker-js/faker';

import { convertToSlug } from '../utils/sluggify';

// ----------------------------------------------------------------------

const plans = [
  {
    plan: 'Starter Plan',
    monthLimit: 50000,
    totalProjects: 10,
    keywordListLimit: 10,
    price: 24
  },
  {
    plan: 'Standard Plan',
    monthLimit: 100000,
    totalProjects: 20,
    keywordListLimit: 20,
    price: 74
  },
  {
    plan: 'Premium Plan',
    monthLimit: 200000,
    totalProjects: 40,
    keywordListLimit: 40,
    price: 149
  }
]

let accountPlans = []

for (let i = 0; i < plans.length; i++) {
  accountPlans.push({
    id: `${faker.datatype.uuid()}`,
    slug: convertToSlug(plans[i].plan),
    ...plans[i]
  })
}

export default accountPlans;