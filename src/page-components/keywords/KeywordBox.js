import React from 'react';
import { useState } from 'react';
import Box from '../../components/layouts/Box';
import { XSolid } from '../../ui/icons';
import { Input } from '../../ui/input';

const KeywordBox = ({ k, setNewKeywordValue, removeQuestion }) => {
  const [inputValue, setInputValue] = useState(k.question);

  const [toEdit, setToEdit] = useState(false);

  const listenEnter = (e) => {
    const keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == '13') {
      setToEdit(false);
    }
  };

  return (
    <Box
      type={'black'}
      onClick={() => setToEdit(true)}
      className="p-2 cursor-text text-left w-fit min-w-fit mb-[11px] mr-2"
    >
      <div className="flex space-x-[6px] items-center">
        {!toEdit ? (
          <span className="font-medium text-sm line-clamp-2">{k.question}</span>
        ) : (
          <Input
            value={inputValue}
            onKeyDown={listenEnter}
            variant={'dark-nb'}
            onBlur={() => setToEdit(false)}
            className="p-0 h-full text-sm"
            autoFocus={true}
            onChange={(e) => {
              setInputValue(e);
              setNewKeywordValue(e, k.id);
            }}
          />
        )}
        <span
          onClick={() => removeQuestion(k.id)}
          className="cursor-pointer flex items-center"
        >
          <XSolid className="w-[14px] h-[14px]" />
        </span>
      </div>
    </Box>
  );
};

export default KeywordBox;
