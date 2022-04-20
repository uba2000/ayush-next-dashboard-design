import { faker } from '@faker-js/faker';

import { convertToSlug } from '../utils/sluggify'

// ----------------------------------------------------------------------

const FILTER_NAME = [
  'All',
  'Ads',
  'Articles',
  'Blogging',
  'Sales',
  'SEO',
  'Web copy',
  'Ecommerce',
  'Email',
  'GMB',
  'Video',
  'Other',
];

// ----------------------------------------------------------------------

const filters = FILTER_NAME.map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    rank: setIndex,
    slug: convertToSlug(FILTER_NAME[index]),
    name: FILTER_NAME[index],
    selected: setIndex == 1,
  };
});

export default filters;
