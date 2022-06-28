import React from 'react';

import FormLayout from './FormLayout';
import FormGroup from '../../../components/FormGroup';
import DropdownLayout from '../../../components/layouts/Dropdown';
import { LabelLayout } from '../ExplorerLayout';

const EssayIntros = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={'Give your readers a clear idea of what your essay will cover.'}
      generate={generate}
      data={{
        creativity: explorerState.creativity,
        rewrite: explorerState.textAreaContent,
      }}
    >
      <FormGroup
        label={<LabelLayout>Creativity:</LabelLayout>}
        labelFor={'creativity'}
      >
        <DropdownLayout
          options={explorerState.creativities}
          value={explorerState.creativity}
          onChange={(value) => dispatch({ value, type: 'setCreativity' })}
          id={'creativity'}
        />
      </FormGroup>
      <FormGroup
        label={<LabelLayout>What would you like to rewrite?</LabelLayout>}
        labelFor={'subHeading'}
        className="mb-4"
      >
        <textarea
          value={explorerState.textAreaContent}
          onChange={(e) =>
            dispatch({ value: e.target.value, type: 'setTextAreaContent' })
          }
          id={'keywords'}
          placeholder="start ping or paste content here"
          className="rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black "
        ></textarea>
      </FormGroup>
    </FormLayout>
  );
};

export { EssayIntros };
