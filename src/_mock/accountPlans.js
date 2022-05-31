import { faker } from '@faker-js/faker';

import { convertToSlug } from '../utils/sluggify';

// ----------------------------------------------------------------------

const plans = [
  {
    plan: 'Standard Plan'
  },
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