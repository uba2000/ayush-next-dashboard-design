import React from 'react';

import FormLayout from './FormLayout';
import FormGroup from '../../../components/FormGroup';
import DropdownLayout from '../../../components/layouts/Dropdown';
import { Input } from '../../../ui/input';
import { LabelLayout } from '../ExplorerLayout';

const MetaTitlesUrl = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={
        'Write engaging headlines for your Landing Page or any web page.'
      }
      generate={generate}
      data={{
        languages: explorerState.languages,
        websiteName: explorerState.websiteName,
        websiteUrl: explorerState.websiteUrl,
        targetedKeywords: explorerState.keywordInput,
      }}
    >
      <FormGroup
        label={<LabelLayout>Language:</LabelLayout>}
        labelFor={'languages'}
      >
        <DropdownLayout
          options={explorerState.languages}
          value={explorerState.language}
          onChange={(value) => dispatch({ value, type: 'setLanguage' })}
          id={'languages'}
        />
      </FormGroup>
      <FormGroup
        label={<LabelLayout>Website Name:</LabelLayout>}
        labelFor={'websiteName'}
      >
        <Input
          value={explorerState.websiteName}
          onChange={(e) => dispatch({ value: e, type: 'setWebsiteName' })}
          variant="dark"
          id={'websiteName'}
          placeholder="E.g Google"
          className="rounded"
        />
      </FormGroup>
      <FormGroup
        label={<LabelLayout>Website URL:</LabelLayout>}
        labelFor={'websiteUrl'}
      >
        <Input
          value={explorerState.websiteUrl}
          onChange={(e) => dispatch({ value: e, type: 'setWebsiteUrl' })}
          id={'websiteUrl'}
          variant="dark"
          placeholder="https://"
          className="rounded"
        />
      </FormGroup>
      <FormGroup
        label={<LabelLayout>Targeted keyword:</LabelLayout>}
        labelFor={'keywordInput'}
      >
        <Input
          value={explorerState.keywordInput}
          onChange={(e) => dispatch({ value: e, type: 'setKeywordInput' })}
          id={'keywordInput'}
          placeholder="E.g copywriting"
          variant="dark"
          className="rounded"
        />
      </FormGroup>
    </FormLayout>
  );
};

export { MetaTitlesUrl };
