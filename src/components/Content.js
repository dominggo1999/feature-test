import { useEffect, useReducer, useState } from 'react';
import { isMobile } from 'react-device-detect';
import tw, { styled } from 'twin.macro';
import Desktop from './tabs/Desktop';
import Mobile from './tabs/Mobile';

const Content = () => {
  // Validate user-agent and change flex direction if needed
  const isFlexCol = isMobile ? 'flex-col-reverse' : null;
  return (
    <div className="relative min-h-screen h-screen flex flex-col">
      {/* Navbar Placeholder */}
      <div className="bg-purple-700 p-7 text-5xl "></div>
      <div className={`relative w-full h-full flex ${isFlexCol} overflow-y-hidden`}>
        <Mobile />
        <Desktop />
        {/* Faked Canvas */}
        <div className="flex items-center justify-center w-full h-full bg-red-500 overflow-auto">
          {/* This need min-height and min-width */}
          <div className="h-[400px] w-[300px] min-h-[400px] min-w-[300px] bg-green-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, adipisci est? Expedita architecto soluta, et magnam aperiam aspernatur eaque blanditiis eligendi quod voluptatibus excepturi doloribus in dolores cupiditate dicta a ut, sint rem quae! Est sed illum in eos ullam excepturi magnam praesentium eaque inventore, et quo necessitatibus nostrum facilis quia velit enim id pariatur earum laudantium expedita magni similique vero error. Nesciunt ab eveniet aspernatur dolorem odio distinctio, necessitatibus porro laudantium voluptates corrupti atque ea asperiores repudiandae eius vitae ducimus, possimus libero et illo nostrum? Autem voluptas itaque, magni cupiditate voluptates repellendus explicabo quae, incidunt numquam fuga dolore eaque.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
