import React from 'react';

import FormLayout from './FormLayout';
import FormGroup from '../../../components/FormGroup';
import DropdownLayout from '../../../components/layouts/Dropdown';
import { Input } from '../../../ui/input';
import { ExplorerTwoInputLayout, LabelLayout } from '../ExplorerLayout';

const VideoScriptSection = ({ explorerState, dispatch, generate }) => {
  return (
    <FormLayout
      subText={
        'Generate content about a section of your video script based on the subtitle.'
      }
      generate={generate}
      data={{
        language: explorerState.language,
        creativity: explorerState.creativity,
        audience: explorerState.audience,
        voiceTone: explorerState.voiceTone,
        sectionTitle: explorerState.sectionTitle,
        textAreaContent: explorerState.textAreaContent,
      }}
    >
      <ExplorerTwoInputLayout>
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
      </ExplorerTwoInputLayout>
      <ExplorerTwoInputLayout>
        <FormGroup
          label={<LabelLayout>Tone of voice:</LabelLayout>}
          labelFor={'voiceTone'}
        >
          <DropdownLayout
            options={explorerState.voiceTones}
            value={explorerState.voiceTone}
            onChange={(value) => dispatch({ value, type: 'setVoiceTone' })}
            id={'voiceTone'}
          />
        </FormGroup>
        <FormGroup
          label={<LabelLayout>Audience</LabelLayout>}
          labelFor={'audience'}
        >
          <Input
            value={explorerState.audience}
            onChange={(e) => dispatch({ value: e, type: 'setAudience' })}
            variant="dark"
            id={'audience'}
            placeholder="Freelancers, kids"
            className="rounded"
          />
        </FormGroup>
      </ExplorerTwoInputLayout>
      <FormGroup
        label={<LabelLayout>Section Title:</LabelLayout>}
        labelFor={'sectionTitle'}
      >
        <Input
          value={explorerState.sectionTitle}
          onChange={(e) => dispatch({ value: e, type: 'setSectionTitle' })}
          id={'sectionTitle'}
          placeholder="Benefits of using seocontent.ai"
          variant="dark"
          className="rounded"
        />
      </FormGroup>
      <FormGroup
        label={<LabelLayout>What is your video about:</LabelLayout>}
        labelFor={'subHeading'}
        className="mb-4"
      >
        <textarea
          value={explorerState.textAreaContent}
          onChange={(e) =>
            dispatch({ value: e.target.value, type: 'setTextAreaContent' })
          }
          id={'subHeading'}
          placeholder="Briefly describe what your website or bussiness is about"
          className="rounded h-[139px] w-full flex-shrink  border  border-solid dark:focus:text-white focus:text-black dark:border-darkMode-border border-ash pl-3 pr-4 py-[10px] bg-white dark:bg-black "
        ></textarea>
      </FormGroup>
    </FormLayout>
  );
};

export { VideoScriptSection };
