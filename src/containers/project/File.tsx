import React, { FunctionComponent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import debounce from 'lodash.debounce';

import { trpc } from 'utils/trpc';
import Spinner from 'components/Spinner';
import dynamic from 'next/dynamic';
import LexicalEditor from 'components/Lexical';

const File: FunctionComponent = () => {
    return (
        <div className='flex flex-col items-center justify-center flex-1 bg-primary-light'>
            <LexicalEditor />
        </div>
    );
};

export default File;
