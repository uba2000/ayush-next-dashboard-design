import React, { useState } from 'react'
import NewKeywordListDialog from '../project-categories/keywords/newKeywordListDialog'

const NewKeywordListButton = () => {

  const [newKeyworListDialog, setNewKeyworListDialog] = useState(false)

  const closeKeyworListDialog = () => {
    setNewKeyworListDialog(false)
  }

  const openKeyworListDialog = () => {
    setNewKeyworListDialog(true)
  }

  return (
    <>
      <NewKeywordListDialog isOpen={newKeyworListDialog} closeModal={closeKeyworListDialog} />
      <button onClick={openKeyworListDialog} className="block w-fit btn btn-primary bg-primary text-white font-poppins">
        New Keyword List
      </button>
    </>
  )
}

export default NewKeywordListButton