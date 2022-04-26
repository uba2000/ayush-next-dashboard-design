import React, { useState } from 'react'

import Box from '../../../components/layouts/Box'
import { DialogLayout } from '../../../components/layouts/Dialog'
import { Copy, Delete } from '../../../ui/icons'

const AFeatureListBox = ({ data, deleteAContent }) => {

  const { user, date, id, featureListContent } = data

  const [isDeleteDialog, setIsDeleteDialog] = useState(false)

  const openModal = () => {
    setIsDeleteDialog(true)
  }

  const closeModal = () => {
    setIsDeleteDialog(false)
  }

  const deleteContent = () => {
    deleteAContent()
    closeModal()
  }

  return (
    <>
      <Box className={'rounded-[4px]'}>
        <div className="py-6 px-[60px] space-y-4">
          <div className="flex justify-between">
            <div className='space-x-6 flex'>
              <span>
                <span className='font-bold'>User:{' '}</span>
                <span className='font-medium'>{user}</span>
              </span>
              <span>
                <span className='font-bold'>Date:{' '}</span>
                <span className='font-medium'>{date}</span>
              </span>
            </div>
            <div className='space-x-[10px] flex'>
              <Box className={'rounded-lg cursor-pointer'} type='black'>
                <div className="flex items-center space-x-[6px] py-1 px-[10px]">
                  <span className='text-sm font-medium'>Copy</span>
                  <span>
                    <Copy className="h-4 w-4" />
                  </span>
                </div>
              </Box>
              <Box className={'rounded-lg cursor-pointer'} type='black'>
                <div onClick={openModal} className="flex items-center space-x-[6px] text-red py-1 px-[10px]">
                  <span className='text-sm font-medium'>Delete</span>
                  <span>
                    <Delete className="h-4 w-4" />
                  </span>
                </div>
              </Box>
            </div>
          </div>
          <div className="">
            <span className='text-lg text-justify font-normal'>
              {featureListContent}
            </span>
          </div>
        </div>
      </Box>
      <DialogLayout isOpen={isDeleteDialog} closeModal={closeModal}>
        <div className="py-24 px-44">
          <div className="space-y-[13px]">
            <DialogLayout.Title
              as="h3"
              className="title"
            >
              Are you sure?
            </DialogLayout.Title>
            <DialogLayout.SubTitle>
              Deleting is final and cannot be reversed. are you sure you still want to proceed?
            </DialogLayout.SubTitle>
          </div>

          <div className="mt-[19px]">
            <button onClick={deleteContent} className="btn btn-primary bg-[#FF1212] border-[#FF1212] text-white" >
              Confirm
            </button>
            <button onClick={closeModal} className="ml-3 btn btn-reset dark:text-white text-black">
              Cancel
            </button>
          </div>
        </div>
      </DialogLayout>
    </>
  )
}

export default AFeatureListBox