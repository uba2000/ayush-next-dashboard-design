import React, { useState } from 'react';
import Box from '../../components/layouts/Box';

const GenerateBoxLayout = ({ index, content, addToFavourite }) => {
  const [isFav, setIsFav] = useState(false);

  const toggleToFav = () => {
    setIsFav(!isFav);
    addToFavourite({ index, content, type: `${!isFav ? 'add' : 'remove'}` });
  };

  return (
    <Box className="p-4">
      <div className="flex space-x-4">
        <div className="">
          <div className="h-6 w-6 rounded-full border dark:border-darkMode-border border-ash flex justify-center items-center">
            <span className="text-xs leading-[18px]">0{index}</span>
          </div>
        </div>
        <div className="flex-grow">
          <span className="text-lg text-justify">{content}</span>
        </div>
        <div className="">
          <div onClick={toggleToFav} className={`cursor-pointer`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${
                isFav ? 'text-primary' : 'dark:text-[#292929]'
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </Box>
  );
};

export { GenerateBoxLayout };
