import { faker } from '@faker-js/faker';
import filters from './filters';
import { sample } from 'lodash';
import features from './features';

// ----------------------------------------------------------------------

const FEATURESLIST_NAME = [
  { featureName: 'Paragraph Writer', },
  { featureName: 'Article Rewriter', },
  { featureName: 'Blog Titles', },
  { featureName: 'Blog Ideas', },
  { featureName: 'Blog Titles (Listicles)', },
  { featureName: 'Blog Intros', },
  { featureName: 'Blog Outlines', },
]

const featureListContent = `
  Content marketing is about creating valuable content for your audience to consume.
  Sometimes, it can be difficult knowing how to start or what types of content to publish.
  To help make content marketing easier, use these steps: - Determine your target market -
  Create a plan - Post regularly and consistently - Stay consistent with the brand's voice
  Content marketing is about creating valuable content for your audience to consume.
  Sometimes, it can be difficu voice
  Content marketing is about creating valuable content for your audience to consume.
  Sometimes, it can be difficu
`

const featureList = features.map((feature) => {
  return {
    id: faker.datatype.uuid(),
    user: faker.name.findName(),
    feature: feature.name,
    featureContent: [
      {
        id: faker.datatype.uuid(),
        featureListContent,
        date: '22/03/2022, 5:51 AM',
        user: faker.name.findName(),
      },
      {
        id: faker.datatype.uuid(),
        featureListContent,
        date: '22/03/2022, 5:51 AM',
        user: faker.name.findName(),
      },
    ],
    type: feature.type,
    slug: feature.slug,
    date: '2 days ago',
  }
})

export default featureList;