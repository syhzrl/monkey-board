import React, { FunctionComponent, useState, useEffect } from 'react';

import { Board } from 'assets/icons';
import boardPic from 'assets/images/ori-2.png';
import Image from 'next/image';

const Dashboard: FunctionComponent = () => {
    return (
        <div className='flex flex-col w-full h-full gap-6 p-6 text-secondary-grey'>
            <h1 className='text-2xl text-secondary-purple'>
                Project Title
            </h1>

            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>

            <div className='flex flex-col gap-2'>
                <h2 className='text-xl'>Boards</h2>

                <div className='w-full mb-2 border-b border-b-line' />

                <div className='flex flex-wrap gap-4 transition-colors duration-150 hover:text-white'>
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center justify-center p-4 border rounded-md border-line'>
                            <Board className='text-8xl text-inherit' />
                        </div>

                        <p>Board name</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
