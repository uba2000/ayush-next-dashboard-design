import { faker } from '@faker-js/faker';

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
];

// ----------------------------------------------------------------------

const filters = FILTER_NAME.map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    rank: setIndex,
    slug: FILTER_NAME[index].toLowerCase(),
    name: FILTER_NAME[index],
    selected: setIndex == 1,
  };
});

export default filters;
