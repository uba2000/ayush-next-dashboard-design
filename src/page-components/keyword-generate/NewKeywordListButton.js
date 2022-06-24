import React, { useState } from 'react';
import { Button } from '../../ui/button';
import NewKeywordListDialog from '../project-categories/keywords/newKeywordListDialog';

const NewKeywordListButton = () => {
  const [newKeyworListDialog, setNewKeyworListDialog] = useState(false);

  const closeKeyworListDialog = () => {
    setNewKeyworListDialog(false);
  };

  const openKeyworListDialog = () => {
    setNewKeyworListDialog(true);
  };

  return (
    <>
      <NewKeywordListDialog
        isOpen={newKeyworListDialog}
        closeModal={closeKeyworListDialog}
      />
      <Button onClick={openKeyworListDialog} className="block w-fit">
        New Keyword List
      </Button>
    </>
  );
};

export default NewKeywordListButton;
